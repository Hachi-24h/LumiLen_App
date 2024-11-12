import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src')))

from flask import Flask, request, jsonify
from image_search.clip_search import find_best_matches  # Chỉnh lại tên hàm import

app = Flask(__name__)

@app.route('/api/search_image', methods=['POST'])
def search_image():
    data = request.json
    keyword = data.get("keyword")
    image_urls = data.get("image_urls", [])

    if not keyword or not image_urls:
        return jsonify({"error": "Keyword and image URLs are required"}), 400

    # Gọi hàm tìm kiếm ảnh với top_k ảnh phù hợp nhất (có thể điều chỉnh top_k theo nhu cầu)
    best_image_urls = find_best_matches(image_urls, keyword, top_k=3)

    # Nếu không có ảnh phù hợp
    if not best_image_urls:
        return jsonify({"best_image_urls": []})

    # Trả về danh sách ảnh phù hợp và điểm độ tương tự
    result = [{"url": url, "similarity_score": float(score)} for url, score in best_image_urls]
    return jsonify({"best_image_urls": result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
