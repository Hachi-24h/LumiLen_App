// ImageDetailScreenStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Màu nền đen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Giữ các nút ở cuối nội dung
  },
  image: {
    width: '100%',
    height: '90%', // Chiều cao lớn để gần full màn hình
    resizeMode: 'cover',  // Để hình ảnh bao phủ toàn bộ vùng
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Hiển thị trên cùng
  },
  threeDotsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1, // Hiển thị trên cùng
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor:'#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30, // Thêm khoảng trống ở dưới cùng
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#ccc',
    paddingVertical: 25,
    paddingHorizontal: 28,
    height: 80,
    width: 100,
    borderRadius: 37,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: 'red',
    paddingVertical: 25,
    paddingHorizontal: 25,
    height: 80,
    width: 90,
    borderRadius: 37,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextSave: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Styles for the Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mờ nền phía sau
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Để icon đóng và tiêu đề nằm hai phía
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Styles for the Share Modal
  shareModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  shareOption: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.2, // Kích thước cho biểu tượng
  },
});

export default styles;

