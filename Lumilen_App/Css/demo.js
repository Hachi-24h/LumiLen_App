import { StyleSheet, Dimensions } from "react-native";

const { width,height } = Dimensions.get("window");

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
    height:height*0.1,
  },
  body:{
    height:height*0.8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    marginLeft: 10,
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginBottom: 15, // Khoảng cách giữa các ảnh
    alignItems: "center", // Canh giữa nội dung
  },
  footerContainer: {
    flexDirection: "row", // Đặt icon và chữ nằm ngang nhau
    alignItems: "center", // Căn giữa theo trục dọc
    justifyContent: "flex-start", // Đặt icon và chữ về bên trái
    paddingHorizontal: 10, // Thêm padding ngang
    marginTop: 5, // Khoảng cách với ảnh
    backgroundColor: "#f2f2f2", // Màu nền của footer
    height: 66, // Đặt chiều cao cố định
    width: "100%",
    borderRadius: 5, // Tạo bo góc
  },
  footerIcon: {
    width: 20,
    height: 20,
    marginRight: 5, // Khoảng cách giữa icon và chữ
  },
  footerText: {
    fontSize: 14,
    color: "#333",
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
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    padding: 20,
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
    flexDirection: "row",
  },
  closeButtonText: {
    fontSize: 24,
    color: "black",
  },
  createModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 80,
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
    color: "black",
    fontWeight: "bold",
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  filterButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "7%",
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
  imageStyle: {
    borderRadius: 10, // Bo góc ảnh
  },
});

export default styles;
