import { StyleSheet, Dimensions } from "react-native";
const {height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',      // Giữ footer cố định ở vị trí dưới cùng
    bottom: 0,                 // Đặt footer ở cuối màn hình
    width: "100%",             // Chiều rộng 100% để phủ toàn bộ dưới cùng của màn hình
    height: height * 0.07,      // Chiều cao 10% m
    paddingHorizontal: 25,
    backgroundColor: "#D3D3D3",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  imgIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  Touch_selected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  Touch_unselected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
