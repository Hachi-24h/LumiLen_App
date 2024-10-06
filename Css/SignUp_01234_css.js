import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // Giúp phân bố header, section, footer
    paddingHorizontal: 20,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height:"10%",
   
  },
  backButton: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  textSignUp: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  section: {
    flex: 1,
    justifyContent: "space-between", 
    
    height:"70%",
    alignItems:""

  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {

    borderBottomWidth: 1,
    borderBottomColor: "#b0b0b0",
    fontSize: 18,
    paddingBottom: 15,
    marginBottom: 30,
  },
    progressContainer: {
        flexDirection: "column",
    },
  progress: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#000",
    width: "33%", // Tiến trình 1/3
    borderRadius: 5,
  },
  progressBar1: {
    height: 10,
    backgroundColor: "#000",
    width: "66%", // Tiến trình 2/3
    borderRadius: 5,
  },
  progressBar2: {
    height: 10,
    backgroundColor: "#000",
    width: "100%", // Tiến trình 3/3
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: "#000",
    textAlign: "right",
  },
  footer: {
    paddingBottom: 30, 
    height:"20%",
   
    justifyContent: "center", // Canh giữa phần footer
  },
  nextButton: {
   
    backgroundColor: "#ff0000",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },showPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10, 
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
   
  },
  checkboxImage: {
    width: 20,
    height: 20,
    resizeMode: "contain", 
  },
  showPasswordText: {
    fontSize: 16,
    color: "#000",
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Bo góc tròn
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: 'red', // Màu đỏ khi được chọn
  },
});

export default styles;
