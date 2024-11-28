import { StyleSheet, Dimensions } from 'react-native';
import colors from '../Custom/Color';
const { width ,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: width,
    height: height,
    padding:0,
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
    padding:width * 0.01,
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
    height:height*0.08,
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

  // Body
  ListTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: width * 0.02,
    height:"69%",
  },


  filterTextButton: {
    padding: 5,
  },
 
  imageList: {
    flex: 1,
    padding:0,
    
  },
  imageStyle: {
    borderRadius: 10, // Bo góc ảnh
   
  },
  // filterContainer: {
  //   flexDirection: "row",
  //   padding: 10,
  //   justifyContent: "space-around",
    
  // },
 
 
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    padding: 20,
  },


  // Modal create 
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

export default styles;
