// ImageDetailScreenStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

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
  shareIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
});

export default styles;
