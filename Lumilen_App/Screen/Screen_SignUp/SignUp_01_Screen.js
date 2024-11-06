import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../Css/SignUp_01234_css";

const SignUp_01_Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SignUp")}
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
          <Text style={styles.title}>What's your email?</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#b0b0b0"
          />

        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progress}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.progressText}>1 of 3</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={()=> navigation.navigate('SignUp2')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp_01_Screen;
