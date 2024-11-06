import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../Css/SignUp_01234_css";

const SignUp_02_Screen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false); // State để theo dõi việc hiển thị mật khẩu

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SignUp1")}
        >
          <Image
            source={require("../../Icon/back.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.textSignUp}>Sign up</Text>
      </View>

      <View style={styles.section}>
        <View>
          <Text style={styles.title}>Create a password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#b0b0b0"
            secureTextEntry={!showPassword}  // Điều chỉnh thuộc tính secureTextEntry
          />
          
        <View style={styles.showPasswordContainer}>
          {/* Nút tick */}
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}  // Cập nhật trạng thái show/hide password
            style={styles.checkbox}
            activeOpacity={1} 
          >
            {showPassword ? (
              <Image
                source={require("../../Icon/check.png")}  // Icon được tick
                style={styles.checkboxImage}
              />
            ) : (
              <Image
                source={require("../../Icon/uncheck.png")}  // Icon chưa tick
                style={styles.checkboxImage}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.showPasswordText}>Show password</Text>
        </View>
        </View>


        <View style={styles.progressContainer}>
          <View style={styles.progress}>
            <View style={styles.progressBar1} />
          </View>
          <Text style={styles.progressText}>2 of 3</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton}
            onPress={() => navigation.navigate("SignUp3")}  
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp_02_Screen;
