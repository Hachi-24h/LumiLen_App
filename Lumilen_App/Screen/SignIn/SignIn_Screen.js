import React, { useState, useContext, useEffect } from "react";
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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("nam@gmail.com");
  const [password, setPassword] = useState("thanhnam");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState("black");
  const [passwordBorderColor, setPasswordBorderColor] = useState("black");

  const { fetchUserData } = useContext(UserContext); 

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setEmailBorderColor("black");
        setPasswordBorderColor("black");
        await fetchUserData(email);
        navigation.navigate("Info_Bang");
      } else {
        setEmailBorderColor("red");
        setPasswordBorderColor("red");
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setEmailBorderColor("red");
      setPasswordBorderColor("red");
      Alert.alert("An error occurred. Please try again.");
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

          <TouchableOpacity style={[styles.socialButton, styles.socialButtonGoogle]}>
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
