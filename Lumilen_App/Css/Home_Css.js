import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ECEFF1', // Màu nền xám nhạt, tạo cảm giác tinh tế
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Nền mờ đậm hơn để nổi bật modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8, // Chiều rộng 80% màn hình
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // Màu trắng tinh khiết
    borderRadius: 20, // Bo tròn góc lớn hơn
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, // Đổ bóng hiện đại
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  modalOption: {
    width: '90%', // Chiều rộng 90% của modal
    paddingVertical: 15,
    marginBottom: 12,
    borderRadius: 25, // Bo tròn hơn cho nút
    backgroundColor: '#2196F3', // Xanh dương tươi sáng
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  modalClose: {
    width: '90%',
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: '#FF5252', // Đỏ nổi bật
    alignItems: 'center',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff', // Chữ trắng sáng
    textTransform: 'uppercase', // In hoa hiện đại
    letterSpacing: 1, // Khoảng cách chữ rộng hơn
  },
  threeDotsButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#E0E0E0', // Nút ba chấm sáng hơn nền
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 15,
    borderRadius: 20, // Bo góc lớn
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '8%',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default styles;
