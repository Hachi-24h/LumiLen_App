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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Nền trắng mờ cho khung form
    borderRadius: 15,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: '6%',
  },

  socialLoginContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4,
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    width: '90%',
    justifyContent: 'center',
    marginVertical: 4,
  },
  socialButtonGoogle: {
    backgroundColor: '#f1f1f1',
  },
  socialButtonFacebook: {
    backgroundColor: '#1877F2',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleText: {
    color: '#000',
  },
  facebookText: {
    color: '#fff',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  
  
  backButton: {
    padding: 8,
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
    width: '90%',
    height: 50,
    backgroundColor: '#E60019',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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
