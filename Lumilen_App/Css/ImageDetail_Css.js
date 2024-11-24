import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    zIndex: 10,
  },
  threeDotsButton: {
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  userInfo: {
    position: "absolute",
    top: 200,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followButton: {
    marginTop: 5,
    backgroundColor: "#E60023",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 100,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    zIndex: 5, // Đảm bảo nằm trên các thành phần khác
  },

  saveButton: {
    backgroundColor: "#E60023",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },

  buttonTextSave: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  viewButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },

  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
  },

  description: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  relatedImagesContainer: {
    marginHorizontal: 0, // Loại bỏ khoảng cách ngang thừa
    marginTop: 20,
  },
  
  columnWrapper: {
    justifyContent: "flex-start",
  },
  imageWrapper: {
    marginBottom: 10, // Giảm khoảng cách dưới ảnh
  },
  
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2, // Giảm khoảng cách với ảnh
    paddingHorizontal: 5, // Thêm padding ngang
  },
  
  
  footerIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },

});

export default styles;
