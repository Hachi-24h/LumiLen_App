import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import styles from "../../Css/SignUp_Screen_01_css";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    const dob = new Date(new Date().getFullYear() - age, 0, 1); // Tính ngày sinh từ tuổi
    const userData = {
      email,
      password,
      dob,
      firstName,
      lastName,
      idUser: `${firstName}_${lastName}`, // Ví dụ, bạn có thể sử dụng định dạng này cho idUser
    };

    try {
      // Gửi yêu cầu POST đến endpoint /addUser
      const response = await axios.post("http://192.168.114.1:5000/user/addUser", userData);

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("SignIn"); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      }
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo cho người dùng
      Alert.alert("Error", error.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <ImageBackground source={require("../../Picture/background.png")} style={styles.backgroundImage}>
      <StatusBar hidden={false} />
      <View style={styles.overlay} />
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.textSignUp}>Sign up</Text>
        {/* Email Input */}
        <View style={styles.section}>
          <Text style={styles.title}>What's your email?</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#b0b0b0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.section}>
          <Text style={styles.title}>Create a password</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#b0b0b0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name Input */}
        <View style={styles.section}>
          <Text style={styles.title}>What's your name?</Text>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.nameInput}
              placeholder="First name"
              placeholderTextColor="#b0b0b0"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.nameInput}
              placeholder="Last name"
              placeholderTextColor="#b0b0b0"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        {/* Age Input */}
        <View style={styles.section}>
          <Text style={styles.title}>How old are you?</Text>
          <TextInput
            style={styles.ageInput}
            placeholder="Age"
            placeholderTextColor="#b0b0b0"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.title}>What's your gender?</Text>
          <View style={styles.optionRadioContainer}>
            <TouchableOpacity
              style={styles.optionRadioButton}
              onPress={() => setGender("Female")}
            >
              <View
                style={[
                  styles.radioCircle,
                  gender === "Female" && styles.radioCircleSelected,
                ]}
              >
                {gender === "Female" && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionTextRadio}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionRadioButton}
              onPress={() => setGender("Male")}
            >
              <View
                style={[
                  styles.radioCircle,
                  gender === "Male" && styles.radioCircleSelected,
                ]}
              >
                {gender === "Male" && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionTextRadio}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionRadioButton}
              onPress={() => setGender("Other")}
            >
              <View
                style={[
                  styles.radioCircle,
                  gender === "Other" && styles.radioCircleSelected,
                ]}
              >
                {gender === "Other" && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionTextRadio}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleSignUp}>
            <Text style={styles.nextButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
