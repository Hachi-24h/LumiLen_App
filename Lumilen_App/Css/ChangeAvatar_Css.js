import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#000',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: '#DDD',
    padding: 5,
    borderRadius: 100,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  instructionSection: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  buttonSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  changeAvatarButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    width: '70%',
    alignItems: 'center',
  },
  downloadButton: {
    marginTop:10,
    backgroundColor: '#FF0000',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
