import { StyleSheet, Dimensions } from 'react-native';
import colors from '../Other/Color';
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
    borderBottomColor: "#eee",
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
    height:height*0.07,
    width:width,
    paddingHorizontal: width * 0.01,
    justifyContent: "flex-start",
  },
  navtouch :{
    height: height * 0.04,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.005,
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
    backgroundColor: "white",
    borderRadius: width * 0.05,
    borderWidth:1,
    borderColor:"black",
   
  },
  ListTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    height:"69%",
  },


  filterTextButton: {
    padding: 5,
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  imageList: {
    flex: 1,
    padding:0,
    
  },
  imageStyle: {
    borderRadius: 10, // Bo góc ảnh
   
  },
  filterContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    
  },
  TouchableOpacitystyle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding:1,
  
  },
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
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-start",
    
    flexDirection : "row",
  },
  closeButtonText: {
    fontSize: 24,
    color: "black",
  },
  createModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft:80,
    height: 70,
  },
  createOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  optionButton: {
    alignItems: "center",
    backgroundColor: "#ddd",
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
  },
  optionIcon: {
    width: 30,
    height: 30,
    
  },
  optionText: {
    fontSize: 14,
    color: "Black",
    fontWeight: "bold",
    marginVertical: 10,
  },
  optionText2:{
    fontSize: 14,
    color: "Black",
   
    marginVertical: 10,
  },
  imageContainer: {
    marginBottom: height * 0.006,
    borderRadius: height * 0.01,
    overflow: "hidden",
    backgroundColor: colors.lightGrey,
    padding:0,
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
