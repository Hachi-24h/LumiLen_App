import { showMessage } from "react-native-flash-message";

export const showNotification = (message, type = "success") => {
  showMessage({
    message: message,
    type: type === "success" ? "success" : "danger",
    duration: 2000,
    position: "top",
    animated: true,
    animationDuration: 500,
    icon: type === "success" ? "success" : "danger",
    backgroundColor: type === "success" ? "#4CAF50" : "#F44336", // Xanh lá cho thành công, đỏ cho lỗi
    color: "#fff",
    style: {
      borderRadius: 10,
      margin: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    titleStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};
