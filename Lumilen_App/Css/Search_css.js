import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // header
  header: {
    paddingTop: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: height * 0.1,
    backgroundColor: "#fff",
  },

  // body 
 
  section: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
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
    width: width * 0.8,
    height: 200,
    borderRadius: 15,
    marginHorizontal: 10,
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
    width: "80%",
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: "black",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  resultImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  searchResultsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },

  // loading
  loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ đen
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  // render image item
  imageList: {
    flex: 1, // Để MasonryList chiếm hết không gian còn lại và có thể cuộn
  },
  
  imageStyle: {
    borderRadius: 10, // Bo góc ảnh
   
  },
});

export default styles;
