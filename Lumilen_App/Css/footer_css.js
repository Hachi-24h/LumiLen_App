import { StyleSheet, Dimensions } from "react-native";
import colors from "../Custom/Color"
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  createModalContent: {
    backgroundColor:colors.white,
    borderTopLeftRadius: height * 0.05,
    borderTopRightRadius: height * 0.05,
    padding: height * 0.02,
    alignItems: "center",
  },
  buttoncancel :{
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width * 0.9,
    height: height * 0.06,
  },
  closeButton: {
    alignItems: "center",
   
  },
  createModalTitle: {
    fontSize: height * 0.025,
    fontWeight: "bold",
    height: height * 0.06,
    width: width * 0.9,
    alignItems: "center",
    textAlign: "center",
    paddingRight: width * 0.1,
  },
  createOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.5,
  },
  optionButton: {
    alignItems: "center",
    backgroundColor: "#ddd",
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: width * 0.05,
    justifyContent: "center",
  },
  optionIcon: {
    width: height * 0.04,
    height: height * 0.04,
  },
  optionText: {
    fontSize: height * 0.02,
    color: colors.black,
    fontWeight: "bold",
    marginVertical: height * 0.015,
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDotText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
export default styles;
