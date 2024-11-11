import { StyleSheet, Dimensions } from "react-native";

const { width ,height} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:0,
    width:"100%",
    height:"100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: "10%",
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  headerCenter: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#333",
    marginHorizontal: 15,
  },
  activeTab: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  headerRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#000",
  },
  searchBarContainer: {
    padding: 10,
    height:"7%",
    backgroundColor: "#fff",
  },
  searchBar: {
    width: "100%",
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 10,
    height:"7%",
    justifyContent: "space-around",
    
  },
  ListTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    height:"69%",
  },
 
  filterButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth:1,
    borderColor:"black"
  },
  filterIcon: {
    width: 20,
    height: 20,
  },

  filterText: {
    fontSize: 16,
    color: "#333",
  },
  boardList: {
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
  },


  boardItem: {
    width: width * 0.48,    
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
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
  null: {
   
  },
  lockIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    width: width * 0.05,
    height: height * 0.02,
    resizeMode: "contain",
    
  },
 
  boardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  boardDetails: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
   
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    fontSize: 20,
    paddingVertical: 10,
  },
  modalCloseButton: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "gray",
    width:90,
    borderRadius:20,
    marginLeft:"40%"
  },
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
  emptyMessageContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
  
});

export default styles;

