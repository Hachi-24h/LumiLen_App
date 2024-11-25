import { StyleSheet, Dimensions } from "react-native";
import colors from "../Other/Color";
const { width, height } = Dimensions.get("window"); // Lấy kích thước màn hình thiết bị

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: width * 0.05, // Phần padding chiếm 5% chiều rộng màn hình
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent : "flex-start",  
    // marginBottom: height * 0.03,
    height : height * 0.07,
  },
  backIcon: {
    width: width * 0.1, // Chiều rộng icon 6% chiều rộ
    height: width * 0.1, // Chiều cao icon bằng chiều rộng
    tintColor: "#333",
  },
  headerText: {
    fontSize: width * 0.05, 
    fontWeight: "bold",
    marginLeft: width * 0.3, // Margin left
    textAlign: "center",
    color: "#333",
  },
  ImageChoose :{
    height : height * 0.35,
    width : width * 0.9,
  },
  imageSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.03, // Margin bottom 3% chiều cao màn hình
  },
  placeholderText: {
    fontSize: width * 0.04, // Font size 4% chiều rộng màn hình
    color: "#999",
  },
  statusText: {
    fontSize: width * 0.04,
    color: "#999",
    marginTop: height * 0.01,
    textAlign: "center",
  },
  inputSection: {
    marginBottom: height * 0.02,

  },
  label: {
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    fontSize: width * 0.045,
    height: height * 0.06,
    color: "#333",
    backgroundColor: "#fff",
    paddingLeft: width * 0.04,
  },
  Buttonhander:{
    width : width * 0.9,
    alignItems: "flex-end",
    
  },
  createButton :{
    backgroundColor: colors.red,
    justifyContent: "center",
    borderRadius: width * 0.07,
    alignItems: "center",
    width : width * 0.25,
    height : height * 0.07,
  },
  createButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
    textAlign: "center",
  },
  placeholder :{
    width : width * 0.3,
    height : "80%",
    backgroundColor : "#f8f8f8",
    borderRadius : width * 0.02,
    justifyContent : "center",
    alignItems : "center",
  },
  selectionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: width * 0.04 ,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    backgroundColor: "#f8f8f8",
  },
  selectionButtonText: {
    fontSize: width * 0.045,
    color:colors.black,
    
  },
  rightArrow: {
    height : height * 0.03,
    width : width * 0.05,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  closeButton: {
    padding: width * 0.02,
  },
  closeButtonText: {
    fontSize: width * 0.045,
    color: "#000",
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.02,
  },
  boardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: width * 0.04,
  },
  boardImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    backgroundColor: "#ccc",
    resizeMode: "cover",
  },
  boardName: {
    fontSize: width * 0.045,
    color: colors.black,
    marginLeft: width * 0.01,

  },
  lockIcon: {
    width: width * 0.04,
    height: width * 0.04,
    tintColor: "gray",
    marginLeft: "auto",
  },
  createNewBoardButton: {
    marginTop: height * 0.02,
    padding: width * 0.04,
    backgroundColor: colors.gray,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  createNewBoardText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: width * 0.045,

  },
  privateMode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  privateModeText: {
    fontSize: width * 0.045,
    color: "#333",
  },
  createBoardButton: {
    backgroundColor: "#28a745",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  createBoardButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  activityIndicator: {
    marginVertical: height * 0.03,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: width * 0.02,
    padding: width * 0.03,
    fontSize: width * 0.045,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: height * 0.02,
  },

  // loading
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    width: 150,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    fontSize: 32,
    color: '#ff4500',
    marginHorizontal: 2,
    animation: 'fade 1.5s infinite',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default styles;
