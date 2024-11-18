import sys
import os
import requests
import socket
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src')))

from flask import Flask, request, jsonify
from image_search.clip_search import find_best_matches  # Điều chỉnh tên hàm import
def get_local_ipv4():
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print(f"Local IPv4 Address: {local_ip}")  # In địa chỉ IP ra màn hình
    return local_ip
app = Flask(__name__)


@app.route('/api/search_image', methods=['POST'])
def search_image():
    data = request.json
    keyword = data.get("keyword")

    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400

    # Lấy danh sách ảnh chi tiết từ API /getAllPictures
    try:
        local_ip = get_local_ipv4()
        response = requests.get(f'http://{local_ip}:5000/picture/getAllPictures')
        if response.status_code != 200:
            return jsonify({"error": "Failed to retrieve images"}), 500
        image_data = response.json()  # List chứa các đối tượng ảnh chi tiết
    except requests.RequestException as e:
        return jsonify({"error": f"Error fetching images: {str(e)}"}), 500

    # Lấy URI từ image_data để dùng cho quá trình tìm kiếm
    image_urls = [img['uri'] for img in image_data]

    # Tìm kiếm các ảnh phù hợp nhất
    best_image_urls = find_best_matches(image_data, image_urls, keyword, top_k=3)

    # Trả về danh sách ảnh phù hợp và thông tin chi tiết
    result = [img for img in best_image_urls]
    return jsonify({"best_image_urls": result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
