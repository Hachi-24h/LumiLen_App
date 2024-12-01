import clip
import torch
from PIL import Image
import requests
from io import BytesIO
import asyncio
import aiohttp
from googletrans import Translator

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

if device == "cuda":
    model = model.half() 

SIMILARITY_THRESHOLD = 0.6

def translate_keyword(keyword, src='vi', dest='en'):
    translator = Translator()
    translated = translator.translate(keyword, src=src, dest=dest)
    return translated.text

async def load_image_from_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url, ssl=False) as response:
            if response.status == 200:
                image_data = await response.read()
                return Image.open(BytesIO(image_data))
            else:
                print(f"Failed to load image from {url} with status {response.status}")
                return None

async def load_images_async(image_urls):
    tasks = [load_image_from_url(url) for url in image_urls]
    images = await asyncio.gather(*tasks)
    return [img for img in images if img is not None]

def find_best_matches(image_data, image_urls, keyword, top_k=6):
    translated_keyword = translate_keyword(keyword)
    images = asyncio.run(load_images_async(image_urls))
    image_tensors = torch.cat([preprocess(img).unsqueeze(0).to(device) for img in images])

    with torch.no_grad():
        text_tokens = clip.tokenize([translated_keyword]).to(device)
        text_features = model.encode_text(text_tokens)
        image_features = model.encode_image(image_tensors)
        similarity_scores = (text_features @ image_features.T).squeeze().cpu().numpy()

    matching_indices = [i for i, score in enumerate(similarity_scores) if score >= SIMILARITY_THRESHOLD]

    if not matching_indices:
        return []

    top_indices = sorted(matching_indices, key=lambda i: similarity_scores[i], reverse=True)[:top_k]
    best_matches = [{**image_data[i], "similarity_score": float(similarity_scores[i])} for i in top_indices]

    return best_matches
