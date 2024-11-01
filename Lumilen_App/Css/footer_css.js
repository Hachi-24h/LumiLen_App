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
        borderRadius:15,
        
      },
      Touch_selected: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor : "black",
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