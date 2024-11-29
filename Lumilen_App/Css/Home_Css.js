import { StyleSheet, Dimensions } from "react-native";
import colors from "./../Other/Color";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    height: height * 0.9,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  imageContainer: {
    marginBottom: 5, // Khoảng cách giữa các ảnh
    alignItems: "center", // Canh giữa nội dung
  },
  footerContainer: {
    flexDirection: "row", // Đặt icon và chữ nằm ngang nhau
    alignItems: "center", // Căn giữa theo trục dọc
    justifyContent: "flex-start", // Đặt icon và chữ về bên trái
    paddingHorizontal: 2, // Thêm padding ngang
    marginTop: 2, // Khoảng cách với ảnh
    height: 50, // Đặt chiều cao cố định
    width: "100%",
    borderRadius: 5, // Tạo bo góc
  },
  footerIcon: {
    width: 40,
    height: 40,
    marginRight: 10, // Khoảng cách giữa icon và chữ
    borderRadius: 20, // Bo góc icon
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  moreButton: {
    position: "absolute",
    right: 10,
    top: 5,
    padding: 5,
  },
  // Container toàn màn hình với nền tối
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền
    justifyContent: "flex-end", // Hiển thị Modal từ dưới lên
  },
  // Nội dung modal
  modalContent: {
    width: "100%",
    backgroundColor: "#ffffff", // Màu nền trắng
    borderTopLeftRadius: 20, // Bo góc trên trái
    borderTopRightRadius: 20, // Bo góc trên phải
    padding: 20, // Khoảng cách nội dung bên trong
    alignItems: "center",
    shadowColor: "#000", // Hiệu ứng bóng
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // Hiệu ứng bóng trên Android
  },
  // Avatar
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  // Nút chính
  actionButton: {
    backgroundColor: "#E60023", // Màu đỏ nổi bật
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    width: "90%", // Độ rộng nút
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonTxt: {
    backgroundColor: "#808080", // Màu đỏ nổi bật
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    width: "90%", // Độ rộng nút
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Nút đóng
  closeButton: {
    position: "absolute",
    left: "5%",
    top: "2%",
  },
  // Thêm style cho Modal Ghim ảnh
  pinModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Nền tối cho Modal
  },
  pinModalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  pinModalTitle: {
    position: "absolute",
    top: "2%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  inputTitle: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "#ddd", // Thêm màu cho border
    fontSize: 16,
  },
  tableTitle: {
    position: "absolute",
    top: "10%",
    left:"5%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Màu đường viền dưới mỗi dòng
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  closeButton: {
    padding: width * 0.02,
  },
  closeButtonText: {
    fontSize: width * 0.045,
    color: "#000",
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.02,
  },
  boardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: width * 0.04,
  },
  boardImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    backgroundColor: "#ccc",
    resizeMode: "cover",
  },
  boardName: {
    fontSize: width * 0.045,
    color: colors.black,
    marginLeft: width * 0.01,

  },
  lockIcon: {
    width: width * 0.04,
    height: width * 0.04,
    tintColor: "gray",
    marginLeft: "auto",
  },
  createNewBoardButton: {
    marginTop: height * 0.02,
    padding: width * 0.04,
    backgroundColor: colors.gray,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  createNewBoardText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: width * 0.045,

  },
  privateMode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  privateModeText: {
    fontSize: width * 0.045,
    color: "#333",
  },
  createBoardButton: {
    backgroundColor: "#28a745",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  createBoardButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  activityIndicator: {
    marginVertical: height * 0.03,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: width * 0.02,
    padding: width * 0.03,
    fontSize: width * 0.045,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: height * 0.02,
  },
});

export default styles;
