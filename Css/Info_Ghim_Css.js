import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  imageList: {
    flex: 1,
    
  },
  imageStyle: {
    borderRadius: 10, // Bo góc ảnh
   
  },
});

export default styles;
