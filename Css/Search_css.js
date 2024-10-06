import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop:30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 70,
    backgroundColor : "#fff",
     },
  section: {
    flex: 1, // Đảm bảo rằng phần nội dung sẽ lấp đầy không gian còn lại
    width: "100%",
    backgroundColor: "#fff",
  },

  footerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchBar: {
    width: "90%",
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
  },
  ideaSection: {
    paddingVertical: 15,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 20,
    color: "#030D0C",
  },
  ideaItem: {
    backgroundColor: "#ECECEC",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ideaText: {
    fontSize: 14,
  },
  inspirationSection: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  inspirationImage: {
    width: width * 0.8, // Đảm bảo chiều rộng ảnh bằng 80% chiều rộng màn hình
    height: 200,
    borderRadius: 15,
    marginHorizontal: 10, // Khoảng cách giữa các ảnh
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  inspirationText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  spotlightSection: {
    paddingVertical: 40,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  spotlightImage: {
    width: width * 0.8,
    height: 200,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  spotlightText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBarContainer: {

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  
   
  },

  searchBarActive: {
   
    width: "80%", // Kéo ngắn thanh nhập khi đang focus
  },

  cancelButton: {
    padding: 10,
    
  },

  cancelText: {
    color: "black", 
    fontWeight: "bold",
  },
});

export default styles;
