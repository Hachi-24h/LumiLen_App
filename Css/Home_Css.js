import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1, // Đảm bảo ScrollView không chiếm toàn bộ chiều cao
    width: '100%',
    backgroundColor: '#fff',
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
    marginRight: 5,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 5,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageLarge: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  imageSmall: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đảm bảo nền mờ che phủ toàn bộ màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    width: 50, // Kích thước nút lớn hơn
    height: 50,
    borderRadius: 30, // Dạng tròn hoàn chỉnh
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2', // Màu xanh cho nút
    marginBottom: 15,
    shadowColor: '#000', // Hiệu ứng đổ bóng
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  threeDots: {
    position: 'absolute',
    bottom: 10, // Di chuyển nút xuống dưới
    right: 10, // Đặt nút về phía bên phải
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Màu nền cho nút ba chấm
    padding: 5,
    borderRadius: 15,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  shareOption: {
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 20,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'left',
    width: '100%',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '8%', // Chiều cao cố định của footer
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Hiệu ứng đổ bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Bóng cho thiết bị Android
  },
  viewfooter:{
    flex: 1,
    backgroundColor: "#444444",
    height: 30,
    marginBottom:30,
  }
});

export default styles;
