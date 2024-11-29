import { StyleSheet, Dimensions } from "react-native";
import colors from "../Custom/Color"; // Đảm bảo bạn có file colors.js cho các giá trị màu sắc

const { height, width } = Dimensions.get("window"); // Lấy chiều cao và chiều rộng của màn hình

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Canh giữa các phần tử theo chiều ngang
    justifyContent: "flex-start", // Canh giữa các phần tử theo chiều dọc
    alignContent: "flex-end", // Canh giữa các phần tử theo chiều ngang
    paddingHorizontal: width * 0.05, // Padding ngang cho container
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.03, // Khoảng cách dưới header
    height: height * 0.1, // Chiều cao của header
    width:width*0.9,
    marginRight: width * 0.1, 

  },
  backButton: {
    width: width * 0.1, 
    height: width * 0.1, 
    alignItems: "center", 
    justifyContent: "center", 
    marginLeft: width * 0.02,
  },
  title:{
        fontSize: width * 0.04,
        fontWeight: "bold", 
        color: colors.black,
        width: width * 0.7,
        textAlign: "center",
  },
  label: {
    fontSize: width * 0.05, // Font size tương ứng với 5% chiều rộng màn hình
    marginBottom: height * 0.02, // Khoảng cách dưới label 2% chiều cao màn hình
    color: colors.black, // Màu chữ mặc định
    fontWeight: "bold",
  },
  body:{
    width: width * 0.9,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: width * 0.04, // Padding trong input 4% chiều rộng màn hình
    borderRadius: width * 0.04, // Border radius tương ứng với 4% chiều rộng màn hình
    marginBottom: height * 0.03, // Khoảng cách dưới input 3% chiều cao màn hình
    fontSize: width * 0.04, // Font size cho input 4% chiều rộng màn hình
    color: colors.black, // Màu chữ mặc định
    borderColor: colors.black, // Màu border mặc định
    width: width * 0.9, // Chiều rộng input
  },
  button: {
    padding: width * 0.05, // Padding trong button 5% chiều rộng màn hình
    borderRadius: width * 0.05, // Border radius 5% chiều rộng màn hình
    alignItems: "center",
    backgroundColor: colors.red, // Màu nền button
    width : width * 0.9,
  },
  buttonText: {
    color: colors.white, // Màu chữ trắng
    fontSize: width * 0.04, // Font size cho button text 4% chiều rộng màn hình
  },
  error: {
    color: colors.red, // Màu chữ đỏ
    marginBottom: height * 0.02, // Khoảng cách dưới error message 2% chiều cao màn hình
    fontSize: width * 0.035, // Font size cho error message 3.5% chiều rộng màn hình
  },
  // Định dạng thêm cho trạng thái lỗi (như border input màu đỏ khi không hợp lệ)
  inputError: {
    borderColor: colors.red, // Nếu có lỗi thì border sẽ chuyển sang màu đỏ
  },
  // Các style cho các trạng thái của button (disabled, default)
  buttonDisabled: {
    backgroundColor: colors.darkgray, // Màu xám cho nút khi bị vô hiệu hóa
  },
  buttonEnabled: {
    backgroundColor: colors.red, // Màu xanh cho nút khi có thể nhấn
  },
  inputWrapper: {
    marginBottom: height * 0.03, // Đảm bảo có khoảng cách dưới mỗi input
  },
});

export default styles;
