import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    resizeMode: 'cover',  // Đảm bảo ảnh vừa với màn hình
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Màu đen mờ phủ lên ảnh nền
  },
  container: {
    width: 350,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Nền trắng mờ cho khung form
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E60019',
    marginBottom: 20,
  },
  inputBox: {
    width: '100%',
    height: 50,
    borderWidth: 2,  // Đảm bảo khung có viền
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  rememberMeText: {
    color: 'black',
  },
  forgotPassword: {
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E60019',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  registerText: {
    color: 'black',
  },
  registerLink: {
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});

export default styles;
