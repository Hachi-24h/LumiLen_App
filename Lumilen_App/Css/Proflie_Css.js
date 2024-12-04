import { StyleSheet ,Dimensions} from 'react-native';
import colors from '../Custom/Color';
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    
  },
  backButton: {
    paddingVertical: 10,
  },
  backText: {
    fontSize: 24,
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLock: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  iconShare: {
    width: 24,
    height: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    
  },
  username: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userID: {
    fontSize: 20,
    color: '#888',
    marginBottom: 5,
  },
  followInfo: {
    fontSize: 14,
    color: 'black',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  editProfileButton: {
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,

  },
  editProfileText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },

  pinsContainer: {
    paddingHorizontal: 15,
  },
  pinsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pinItem: {
    marginRight: 10,
  },
  pinImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },

  // Board List
  ListTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: width * 0.02,
    height: height * 0.5,
    marginBottom: height * 0.02,
  },

  boardItem: {
    width: width * 0.48,
    marginBottom: height * 0.02,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  boardImage: {
    width: width * 0.45,
    height: height * 0.17,
    borderRadius: 10,
    resizeMode: "cover",
    overflow: "hidden",
    flexDirection: "row",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    margin: 0,
    padding: 0,
  },
  null: {},
  lock:{
    position: "absolute",
    top: "5%",
    left: "8%",
    width: height * 0.04,
    height: height * 0.04,
    resizeMode: "contain",
    backgroundColor:colors.white,
    borderRadius: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    width: height * 0.03,
    height: height * 0.03,
    resizeMode: "contain",
  },

  boardTitle: {
    fontSize: height * 0.017,
    color: colors.black,
    fontWeight: "bold",
   
  },
  boardDetails: {
    fontSize: height * 0.015,
    color: colors.darkgray,
    
  },

  // 1 moal - 1 board
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: height * 0.02,
    padding: height * 0.02,
    width: width ,
  },
  modalTitle: {
    fontSize: height * 0.025,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  modalOption: {
    paddingVertical: height * 0.015,
    textAlign: "left",
    alignItems : "flex-start",
  },
  modalOptionText: {
    fontSize: height * 0.02,
    color: "black",
    textAlign: "left",
  },
  modalCloseButton: {
    marginTop: height * 0.02,
    paddingVertical: height * 0.015,
    backgroundColor: "gray",
    borderRadius: height * 0.1,
    width: width * 0.3,
    alignSelf: "center",
  
  },
  modalCloseText: {
    fontSize: height * 0.02,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: height * 0.05,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
    paddingLeft: width * 0.05,
  },
  titlecss:{
    fontSize: height * 0.02,
    color: colors.black,
    fontWeight: "bold",
    marginVertical  : height * 0.015,
  },
  modalOption :{
    textAlign: "left",
    width: width * 0.9,
    height: height * 0.05,
    borderRadius: height * 0.02,
    
    alignItems : "flex-start",
    alignContent : "center",
    

  },
  modalOption1 :{
    textAlign: "center",
    width: width * 0.2,
    height: height * 0.05,
    borderRadius: height * 0.02,
    backgroundColor: colors.red,
    alignItems : "center",
    alignContent : "center",
    

  },
  modalOptionText1: {
    fontSize: height * 0.02,
    marginTop: height * 0.01,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  
});
