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
import { Ionicons } from "@expo/vector-icons";
import styles from "../../Css/SignIn_css";
import axios from "axios";
import { UserContext } from "../../Hook/UserContext"



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("nam@gmail.com");
  const [password, setPassword] = useState("thanhnam");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState("black");
  const [passwordBorderColor, setPasswordBorderColor] = useState("black");

  const { fetchUserData } = useContext(UserContext); 
 


 
  
  const handleLogin = async () => {
    try {
      // Gửi yêu cầu POST tới backend để kiểm tra tài khoản
      const response = await axios.post("http://192.168.1.2:5000/user/login", {
        email,
        password,
      });

      // Xử lý phản hồi từ backend
      if (response.data.success) {
        setEmailBorderColor("black");
        setPasswordBorderColor("black");

        // Gọi hàm fetchUserData với email để lưu dữ liệu người dùng vào Context
        await fetchUserData(email);

        // Điều hướng đến màn hình khác sau khi đăng nhập thành công
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
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
