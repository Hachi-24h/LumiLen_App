import { StyleSheet, Dimensions } from "react-native";
import colors from "../Other/Color"
const {height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',      // Giữ footer cố định ở vị trí dưới cùng
    bottom: 0,                 // Đặt footer ở cuối màn hình
    width: "100%",             // Chiều rộng 100% để phủ toàn bộ dưới cùng của màn hình
    height: height * 0.07,      // Chiều cao 10% m
    paddingHorizontal: width * 0.1, // Khoảng cách giữa các icon
    backgroundColor: colors.lightgray, // Màu nền
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
   
  },
  imgIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
    borderRadius: width * 0.03,
    padding: width * 0.01,
  },
  Touch_selected: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.black,
  },
  Touch_unselected: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
