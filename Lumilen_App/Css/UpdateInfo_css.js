import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../Other/Color";

const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  doneButton: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.05,
    width: width * 0.2,
  },
  doneButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gray,
  },

  // Sub-header
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: colors.gray,
    marginBottom: 20,
  },

  // Profile Image Section
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,

  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    height: 30,
    width: 90,
  },
  editButtonText: {
    color: colors.black,
    fontWeight: "bold",
  
  },

  // Input Fields
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16, // Cỡ chữ trong input
    textAlignVertical: "center", // Văn bản căn giữa theo chiều dọc
  },
  inputDes: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100, // Độ cao vùng nhập
    textAlignVertical: "top", // Văn bản bắt đầu từ trên cùng
    fontSize: 16,
  },
  descriptionButton: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.gray,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.gray,
    borderRadius: 10,
  },
  modalCancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  modalSaveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 10,
  },
  modalSaveButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  // Loading Overlay
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm mờ giao diện
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100, // Đặt trên các thành phần khác
  },
});

export default styles;
