import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../Css/SignUp_01_css";

const SignUp_02_Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SignUp2")}
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
            secureTextEntry={true}  
          />
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progress}>
            <View style={styles.progressBar2} />
          </View>
          <Text style={styles.progressText}>3 of 3</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp_02_Screen;
