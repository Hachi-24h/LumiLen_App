import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TouchableOpacitystyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
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
    justifyContent: "space-around",
  },
  filterButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  filterTextButton: {
    padding: 5,
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
    width: width * 0.45,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  boardImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 10,
  },
  lockIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 20,
    height: 20,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  boardDetails: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});

export default styles;
