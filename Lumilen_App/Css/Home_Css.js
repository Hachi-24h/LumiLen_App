import { StyleSheet, Dimensions } from "react-native";

const { width,height } = Dimensions.get("window");

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
    // backgroundColor: "#f2f2f2", // Màu nền của footer
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
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});


export default styles;
