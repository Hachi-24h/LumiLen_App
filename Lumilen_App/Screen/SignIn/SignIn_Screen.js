import React, { useState,useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "../../Css/SignIn_css";
import axios from "axios";
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("nam@gmail.com");
  const [password, setPassword] = useState("Thanhnam2303@");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState("black");
  const [passwordBorderColor, setPasswordBorderColor] = useState("black");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { fetchUserData } = useContext(UserContext); 

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '95750573814-jg9rmpt0o95g346dddopbjo96h3imjc8.apps.googleusercontent.com',
    webClientId: '95750573814-k1r8m542rp7rgvnj08rogn9e0ceo88lg.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri: 'https://auth.expo.io/@phongnet321/Lumilen_App',
  });
  
  // 
  // Cập nhật useEffect để kiểm tra lỗi trong response
  useEffect(() => {
    console.log("Response changed:", response);
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleLogin(authentication.accessToken);
    } else if (response?.type === "error") {
      console.log("Error during Google Sign-In:", response.error);
      Alert.alert("Google Sign-In Error", response.error);
      setIsAuthenticating(false);
    }
  }, [response]);
  

  const handleGoogleLogin = async (accessToken) => {
    console.log("handleGoogleLogin called with accessToken:", accessToken);
    try {
      const response = await axios.post(`${BASE_URL}:5000/auth/google`, { accessToken });
      if (response.data.success) {
        await fetchUserData(response.data.user.email);
        navigation.navigate("Info_Bang");
      } else {
        Alert.alert("Google Login Failed", response.data.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("An error occurred with Google login. Please try again.");
    }
    // } finally {
    //   setIsAuthenticating(false); // Đặt lại isAuthenticating khi kết thúc xác thực
    // }
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}:5000/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setEmailBorderColor("black");
        setPasswordBorderColor("black");
        await fetchUserData(email);
        navigation.navigate("HomeTabs");
      } else {
        setEmailBorderColor("red");
        setPasswordBorderColor("red");
       
      }
    } catch (error) {
      // console.error("Login error:", error);
      setEmailBorderColor("red");
      setPasswordBorderColor("red");
      
    }
  };

  return (
    <ImageBackground
      source={require("../../Picture/background.png")}
      style={styles.backgroundImage}
    >
      <StatusBar hidden={false} />
      <View style={styles.overlay} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <View style={[styles.inputBox, { borderColor: emailBorderColor }]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password Input */}
        <View style={[styles.inputBox, { borderColor: passwordBorderColor }]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Google and Facebook Login Buttons */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.socialButtonFacebook]}>
            <View style={styles.iconContainer}>
              <FontAwesome name="facebook" size={20} color="#1877F2" />
            </View>
            <Text style={[styles.socialButtonText, styles.facebookText]}>Tiếp tục bằng Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.socialButtonGoogle]}
            onPress={() => {
              if (!isAuthenticating) {
                setIsAuthenticating(true);
                console.log("Calling promptAsync");
                promptAsync().then((result) => {
                  console.log("Prompt result:", result);
                });
              }
            }}
            // disabled={isAuthenticating} 
          >


            <View style={styles.iconContainer}>
              <FontAwesome name="google" size={20} color="#DB4437" />
            </View>
            <Text style={[styles.socialButtonText, styles.googleText]}>Tiếp tục bằng Google</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
