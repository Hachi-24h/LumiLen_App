// utils/notification.js
import { showMessage } from "react-native-flash-message";

export const showSuccessMessage = (message) => {
  showMessage({
    message: message,
    type: "success",
    duration: 1000,
    position: "top",
    animated: true,
    animationDuration: 500,
    icon: "success",
    backgroundColor: "#BE2026",
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
