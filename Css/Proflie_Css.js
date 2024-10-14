import { StyleSheet } from 'react-native';

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
  tabContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
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
 
});
