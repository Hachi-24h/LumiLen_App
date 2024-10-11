import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5', // Màu nền nhẹ
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Tạo khoảng cách giữa hai cột
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
    marginRight: 5, // Khoảng cách giữa cột trái và phải
  },
  rightColumn: {
    flex: 1,
    marginLeft: 5,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 15, // Khoảng cách giữa các ảnh
    borderRadius: 15, // Bo góc đẹp hơn
    overflow: 'hidden',
    backgroundColor: '#ffffff', // Màu nền trắng cho cảm giác nổi bật
    shadowColor: '#000', // Đổ bóng cho các ảnh
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Đổ bóng cho Android
  },
  imageLarge: {
    position:'relative',
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  imageSmall: {
    position:'relative',
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  likeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Nền đen mờ cho like và bình luận
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  likeText: {
    color: 'white',
    marginRight: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  moreOptionsButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)', // Nền đen mờ cho nút
    height: 25, // Chiều cao cố định nhỏ hơn
    paddingHorizontal: 10,
    paddingVertical: 1, // Giảm padding dọc để nút thấp hơn
    borderRadius: 13, // Bo góc cho nút
    justifyContent: 'center', // Đảm bảo nội dung căn giữa theo chiều dọc
    alignItems: 'center', // Đảm bảo nội dung căn giữa theo chiều ngang
  },
  
  moreOptionsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    transform: [{ translateY: -5 }],
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2, // Bo viền cho avatar
    borderColor: '#eeeeee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Màu chữ tối cho sự rõ ràng
  },
  likes: {
    fontSize: 16,
    marginLeft: 5,
    color: '#888888', // Màu chữ nhẹ hơn
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Hiện modal từ dưới lên
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ cho modal
    zIndex: 1000, // Đảm bảo modal hiển thị trên các thành phần khác
},
optionsContainer: {
    position: 'absolute',
    top: 1,
    width: '80%',
    padding: 7,
    alignItems: 'center', // Căn giữa các tùy chọn
    marginBottom: 200, // Khoảng cách giữa modal và đáy màn hình
    flexDirection: 'row', // Sắp xếp các nút theo hàng
    justifyContent: 'space-around', // Tạo khoảng cách đều giữa các nút
    zIndex: 1001, // Đảm bảo nút hiển thị trên modal
},

  option: {
    justifyContent: 'center', // Căn giữa nội dung
    alignItems: 'center', // Căn giữa nội dung
    width: 50, // Chiều rộng cho nút
    height: 50, // Chiều cao cho nút
    borderRadius: 30, // Bo góc tròn
    backgroundColor: '#f0f0f0', // Nền cho nút
    flexDirection: 'column', // Sắp xếp theo chiều dọc
    transform: [{ translateY: 90 }], // Di chuyển nút lên phía trên để tạo hiệu ứng vòng cung
    marginBottom: 10, // Khoảng cách giữa các nút
  },

  optionIcon: {
    marginBottom: 5, // Khoảng cách giữa biểu tượng và văn bản
  },
  optionText: {
    fontSize: 12,
    color: '#000', // Màu chữ cho rõ ràng
    textAlign: 'center', // Căn giữa văn bản
  },
});

export default styles;
