import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: height * 0.1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  backButton: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: "60%",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    height: height * 0.8,
    paddingHorizontal: 10,
  },
  footer: {
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  historyItem: {
    flexDirection: "row",
    // backgroundColor: "#f5f5f5",
    // height: 50,
    alignItems: "center",
    flex: 1,
  },
  historyText: {
    fontSize: 20,
    color: "#333",
    marginLeft: 15,
    flex: 1,
    fontWeight: "bold",
  },
  deleteIcon: {
    marginLeft: 10,
  },
  iconSearch: {
    width: 20,
    height: 20,
    tintColor: "#333",
  },
  // Phần CSS bổ sung cho ảnh kết quả
  imageList: {
    flex: 1,
    marginTop: 10,
  },
  imageContainer: {
    flex: 1 / 3, // Hiển thị 3 ảnh trên một dòng
    aspectRatio: 1, // Giữ tỷ lệ vuông
    padding: 5,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginTop: 20,
  },

  // trang 3 
  imageList: {
    flex: 1,
  },
  imageStyle: {
    borderRadius: 10, // Bo góc ảnh
   
  },
});

export default styles;
