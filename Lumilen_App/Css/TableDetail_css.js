import { StyleSheet, Dimensions } from "react-native";
import colors from "../Custom/Color";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: colors.white,
  },
  header: {
    height: height * 0.07,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.04,
  },
  imgHeader: {
    height: height * 0.09,
    width: width * 0.09,
    resizeMode: "contain",
  },
  imgHeader2: {
    height: height * 0.05,
    width: width * 0.05,
    resizeMode: "contain",
   
  },
  imgHeader3: {
    height: height * 0.04,
    resizeMode: "contain",
    
  },
  txtheader: {
    fontSize: height * 0.02,
    fontWeight: "bold",
    color: colors.black,
  },
  Nav: {
    height: height * 0.08,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    backgroundColor: colors.lightGrey,
 
  },
  NavText: {
    fontSize: height * 0.018,
   
    color: colors.black,
  },
  navtouch :{
    height: height * 0.04,
    width: width * 0.1,
    resizeMode: "contain",
    marginRight: width * 0.03,
  },
  viewModeButton: {
    backgroundColor: colors.gray,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius:height * 0.1,
  },
  viewModeText: {
    color: colors.white,
    fontSize: height * 0.018,
  },
  imageContainer: {
    marginBottom: height * 0.02,
    borderRadius: height * 0.01,
    overflow: "hidden",
    backgroundColor: colors.lightGrey,
  },
  imageTitle: {
    textAlign: "center",
    paddingVertical: height * 0.01,
    fontSize: height * 0.018,
    color: colors.darkgray,
  },

  // CSS cho Modal
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",


  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: height * 0.05,
    borderTopRightRadius: height * 0.05,
    padding: height * 0.02,
    height: height * 0.4,
  
  },
  modalChoose: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: height * 0.05,
  },

  modalTitle: {
    marginTop: height * 0.02,
    fontSize: height * 0.022,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.015,
    color: colors.black,
  },
  modalOption: {
    paddingVertical: height * 0.015,
  },
  modalOptionText: {
    fontSize: height * 0.02,
    color: colors.black,
    fontWeight: "bold",
  },
  modalOptionActive: {
    fontSize: height * 0.02,
    color: colors.red,
    fontWeight: "bold",
  },
  modalCloseButton: {
    alignItems: "center",
    paddingVertical: height * 0.015,
    backgroundColor: colors.gray  ,
    borderRadius: height * 0.1,
    width: width * 0.3,
    marginLeft: width * 0.32,
  },
  modalCloseText: {
    fontSize: height * 0.02,
    color: colors.black,
    fontWeight: "bold",
  },
});
