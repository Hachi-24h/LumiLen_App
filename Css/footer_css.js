import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    footer: {
        width: "100%",
        height: "8%",
        paddingHorizontal: 25,
      
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    
      },
    imgIcon: {
        width: 30, // Điều chỉnh chiều rộng của icon
        height: 30, // Điều chỉnh chiều cao của icon
        resizeMode: 'contain',
      },
});
export default styles;