import { StyleSheet, Dimensions } from "react-native";
import colors from "../Custom/Color";
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
    // paddingHorizontal: 10,
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

  // phần default
  // Banner container
  bannerContainer: {
    height: height * 0.4,
    marginBottom: 20,
  },
  bannerImage: {
    width: width,
    height: width * 0.7,
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  // Danh sách ảnh
  listContainer: {
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  seeMore: {
    fontSize: 14,
    color: "#007AFF",
  },
  listImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },

  // danh sách user
  userItem: {
      width: width * 0.9,
      height:height * 0.1,
      flexDirection: "row",
  },
  imageContainer :{
    width: width * 0.1,
    height: width * 0.1,    
    justifyContent: "center",
    alignItems: "center",
    margin:width * 0.05,
  },
  imageStyle: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
  },
  userInfo:{
    width: width * 0.6,
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop:height * 0.005,
  },
  userName:{
    fontSize:height*0.02,
    fontWeight: "bold",
    color: colors.black,
  },
  userID:{
    fontSize:height*0.015,
    color: colors.darkgray,
  },

  // danh sách ảnh 
  imageListsearchpicture: {
    flex: 1,
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.015,
  },
});

export default styles;
