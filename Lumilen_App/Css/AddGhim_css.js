import { StyleSheet, Dimensions } from "react-native";

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
    marginBottom: height * 0.03, // Margin bottom 3% chiều cao
  },
  backIcon: {
    width: width * 0.06, // Chiều rộng icon 6% chiều rộ
    height: width * 0.06, // Chiều cao icon bằng chiều rộng
    tintColor: "#333",
  },
  headerText: {
    fontSize: width * 0.06, // Font size tương ứng 6% chiều rộng màn hình
    fontWeight: "bold",
    marginBottom: height * 0.02, // Margin bottom 2% chiều cao màn hình
    textAlign: "center",
    color: "#333",
  },
  imageSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.03, // Margin bottom 3% chiều cao màn hình
  },
  placeholder: {
    width: width * 0.4, // Chiều rộng placeholder 40% màn hình
    height: width * 0.4, // Chiều cao bằng chiều rộng
    borderRadius: width * 0.04, // Border radius 4% chiều rộng màn hình
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: width * 0.02,
    padding: width * 0.03,
    fontSize: width * 0.045,
    color: "#333",
    backgroundColor: "#fff",
  },
  selectionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    backgroundColor: "#f8f8f8",
  },
  selectionButtonText: {
    fontSize: width * 0.045,
    color: "#333",
  },
  rightArrow: {
    fontSize: width * 0.045,
    color: "#999",
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
    borderColor: "#eee",
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
    color: "#333",
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
    backgroundColor: "#f8f8f8",
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  createNewBoardText: {
    color: "#333",
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
});

export default styles;
