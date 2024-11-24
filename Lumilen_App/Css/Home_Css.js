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
    marginBottom: 15, // Khoảng cách giữa các ảnh
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
});


export default styles;
