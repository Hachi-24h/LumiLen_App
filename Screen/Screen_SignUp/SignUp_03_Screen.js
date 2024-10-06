import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../Css/SignUp_01234_css";

const SignUp_03_Screen = ({ navigation }) => {
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
          <Text style={styles.title}>How old are you ?</Text>
          <Text style={{ color: 'gray', opacity: 0.8 }}>This helps us find you more relevant content. We won’t show it on  your profile.</Text>
          <TextInput
            style={[styles.input,{fontSize:28,  marginTop: 10,}]}
            placeholder="Age"
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
        <TouchableOpacity style={styles.nextButton}  onPress={() => navigation.navigate("SignUp4")} >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp_03_Screen;
