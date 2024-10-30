import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../Css/SignIn_css";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State để lưu trữ email
  const [password, setPassword] = useState(""); // State để lưu trữ mật khẩu
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState("black"); // State để quản lý màu viền của ô email
  const [passwordBorderColor, setPasswordBorderColor] = useState("black"); // State để quản lý màu viền của ô password

  // Hàm kiểm tra khi nhấn "Login"
  const handleLogin = () => {
    if (email === "a") {
      // Nếu email đúng
      setEmailBorderColor("black"); // Giữ màu đen cho email
      if (password === "a") {
        // Nếu mật khẩu đúng, điều hướng tới trang Home
        setPasswordBorderColor("black"); // Giữ màu đen cho password
        navigation.navigate("Info");
      } else {
        // Nếu mật khẩu sai, đổi màu viền của ô password thành đỏ
        setPasswordBorderColor("red");
      }
    } else {
      // Nếu email sai, đổi màu viền của email thành đỏ và không kiểm tra password
      setEmailBorderColor("red");
      setPasswordBorderColor("black"); // Không đổi màu viền của password
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

        <View style={[styles.inputBox, { borderColor: emailBorderColor }]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

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

        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Remember-me</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin }>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp1")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ImageBackground>
  );
};

export default LoginScreen;
