import clip
import torch
from PIL import Image
import requests
from io import BytesIO
import asyncio
import aiohttp

# Tải mô hình CLIP và tokenizer
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Chuyển mô hình sang chế độ tính toán nhanh nếu có GPU
if device == "cuda":
    model = model.half()  # Sử dụng half-precision để tăng tốc trên GPU

# Ngưỡng để xác định ảnh có phù hợp hay không
SIMILARITY_THRESHOLD = 0.6

# Hàm tải ảnh từ URL (dùng asyncio)
async def load_image_from_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                image_data = await response.read()
                return Image.open(BytesIO(image_data))
            else:
                return None

# Hàm xử lý tải ảnh đồng thời
async def load_images_async(image_urls):
    tasks = [load_image_from_url(url) for url in image_urls]
    images = await asyncio.gather(*tasks)
    return [img for img in images if img is not None]

# Hàm tìm kiếm các ảnh phù hợp nhất
def find_best_matches(image_urls, keyword, top_k=3):
    # Sử dụng asyncio để tải ảnh đồng thời
    images = asyncio.run(load_images_async(image_urls))

    # Tiền xử lý ảnh và chuyển sang batch tensor
    image_tensors = torch.cat([preprocess(img).unsqueeze(0).to(device) for img in images])

    with torch.no_grad():
        # Nhúng từ khóa
        text_tokens = clip.tokenize([keyword]).to(device)
        text_features = model.encode_text(text_tokens)

        # Nhúng các ảnh
        image_features = model.encode_image(image_tensors)

        # Tính độ tương tự giữa từ khóa và các ảnh
        similarity_scores = (text_features @ image_features.T).squeeze().cpu().numpy()

    # Lọc ra các ảnh có độ tương tự cao hơn ngưỡng
    matching_indices = [i for i, score in enumerate(similarity_scores) if score >= SIMILARITY_THRESHOLD]

    # Nếu không có ảnh nào phù hợp với ngưỡng, trả về rỗng
    if not matching_indices:
        return []

    # Sắp xếp các ảnh theo độ tương tự từ cao đến thấp và lấy top_k ảnh
    top_indices = sorted(matching_indices, key=lambda i: similarity_scores[i], reverse=True)[:top_k]
    best_matches = [(image_urls[i], float(similarity_scores[i])) for i in top_indices]

    return best_matches
