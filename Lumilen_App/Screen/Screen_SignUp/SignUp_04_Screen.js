import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../Css/SignUp_01234_css";

const SignUp_04_Screen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SignUp3")}
        >
          <Image
            source={require("../../Icon/back.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.textSignUp}>Sign up</Text>
      </View>

      <View
        style={[styles.section, { justifyContent: "", alignItems: "center" }]}
      >
        <View>
          <Text style={styles.title}>What's your gender ?</Text>
          <Text style={{ color: "gray", opacity: 0.8 }}>
            This helps us find you more relevant content. We won’t show it on
            your profile.
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Female" && styles.selectedButton,
          ]}
          onPress={() => handlePress("Female")}
        >
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Male" && styles.selectedButton,
          ]}
          onPress={() => handlePress("Male")}
        >
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Specify another" && styles.selectedButton,
          ]}
          onPress={() => handlePress("Specify another")}
        >
          <Text style={styles.optionText}>Specify another</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("SignUp4")}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp_04_Screen;
