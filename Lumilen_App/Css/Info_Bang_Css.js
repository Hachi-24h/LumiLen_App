import { StyleSheet, Dimensions } from "react-native";
import colors from "../Custom/Color";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: width,
    height: height,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: width * 0.04,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    height: height * 0.1,
  },
  headerLeft: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: height * 0.022,
    color: colors.black,
    marginHorizontal: height * 0.015,
    fontWeight: "bold",
  },
  headerTitle2: {
    fontSize: height * 0.022,
    color: colors.black,
    marginHorizontal: height * 0.015,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  headerRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    padding: width * 0.01,
  },
  TouchableOpacitystyle: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
  },

  // search
  searchBarContainer: {
    padding: width * 0.02,
    backgroundColor: colors.white,
    alignItems: "center",
    height: height * 0.08,
  },
  searchBar: {
    width: width * 0.9,
    height: height * 0.06,
    backgroundColor: colors.gray,
    borderRadius: height * 0.03,
    paddingLeft: width * 0.05,
  },

  // filter
  filterContainer: {
    flexDirection: "row",
    height:height*0.05,
    width:width,
    padding: width * 0.015,
    justifyContent: "flex-start",
    alignItems: "center",
  
  },
  navtouch :{
    height: height * 0.04,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.005,
    marginRight: width * 0.05,
  
  },
  imgHeader3: {
    height: height * 0.04,
    resizeMode: "contain",
  },
  filterButton: {
    width: width * 0.25,
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: width * 0.05,
    borderColor:colors.black,
    marginRight: width * 0.05,
  },
  filterText: {
    color: colors.black,
  },

  // Board List
  ListTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: width * 0.02,
    height: "69%",
  },

  boardItem: {
    width: width * 0.48,
    marginBottom: height * 0.02,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  boardImage: {
    width: width * 0.45,
    height: height * 0.17,
    borderRadius: 10,
    resizeMode: "cover",
    overflow: "hidden",
    flexDirection: "row",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    margin: 0,
    padding: 0,
  },
  null: {},
  lock:{
    position: "absolute",
    top: "5%",
    left: "8%",
    width: height * 0.04,
    height: height * 0.04,
    resizeMode: "contain",
    backgroundColor:colors.white,
    borderRadius: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    width: height * 0.03,
    height: height * 0.03,
    resizeMode: "contain",
  },

  boardTitle: {
    fontSize: height * 0.017,
    color: colors.black,
    fontWeight: "bold",
   
  },
  boardDetails: {
    fontSize: height * 0.015,
    color: colors.darkgray,
    
  },

  modalContent: {
    backgroundColor: "white",
    padding: height * 0.02,
    borderTopLeftRadius: height * 0.05,
    borderTopRightRadius: height * 0.05,
    paddingTop: height * 0.05,
    paddingLeft: width * 0.05,
  },
  buttonsort:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    height: height * 0.06,
    alignItems: "center",
   
  },
  null:{},
  modalOption: {
    fontSize: height * 0.024,
    paddingVertical: height * 0.015,
  },
  modalTitle: {
    fontSize: height * 0.03,
    fontWeight: "bold",
    marginBottom: height * 0.015,
  },
 
  modalCloseButton: {
    fontSize: height * 0.02,
    color: colors.black,
    textAlign: "center",
    paddingVertical: height * 0.015,
    marginTop: height * 0.05,
    backgroundColor: colors.gray,
    width: width * 0.3,
    borderRadius: height * 0.1,
    marginLeft: "40%",
  },

 
  // Create Modal
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
});

export default styles;
