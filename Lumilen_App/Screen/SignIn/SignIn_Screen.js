import React, { useState, useContext } from "react";
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
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("nam@gmail.com");
  const [password, setPassword] = useState("Hachi@123");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState("black");
  const [passwordBorderColor, setPasswordBorderColor] = useState("black");

  // Lấy các hàm từ UserContext
  const { fetchUserData, clearUserData } = useContext(UserContext);

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      // Gửi yêu cầu POST tới backend để kiểm tra tài khoản
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });

      // Xử lý phản hồi từ backend
      if (response.data.success) {
        setEmailBorderColor("black");
        setPasswordBorderColor("black");

        // Gọi hàm fetchUserData với email để lưu dữ liệu người dùng vào Context
        await fetchUserData(email);

      
        navigation.navigate("Info_Ghim");
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
