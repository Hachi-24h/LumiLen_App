import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    fontWeight: "bold",
  },
  activeTab: {
    
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
    backgroundColor: "#fff",
    alignItems: "center",
    height:"7%",
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
    justifyContent: "space-around",
    height:"7%",
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

  filterTextButton: {
    padding: 5,
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  imageList: {
    flex: 1,
    
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

});

export default styles;
