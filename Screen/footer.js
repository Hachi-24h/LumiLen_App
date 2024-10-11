import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import styles from "../Css/footer_css";
const Footer = ({ navigation }) => {
  const [selectedIcon, setSelectedIcon] = useState("home");

  // Hàm đổi icon
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName); 
  };

  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
        <Image
          source={
            selectedIcon === "home"
              ? require("../Icon/home_check.png")
              : require("../Icon/home_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity  onPress={()=> navigation.navigate('Search')}>
        <Image
          source={
            selectedIcon === "search"
              ? require("../Icon/search_check.png")
              : require("../Icon/search_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Plus Icon */}
      <TouchableOpacity onPress={()=> navigation.navigate('SignUp2')}>
        <Image
          source={
            selectedIcon === "plus"
              ? require("../Icon/plus_check.png")
              : require("../Icon/plus_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Message Icon */}
      <TouchableOpacity onPress={()=> navigation.navigate('SignUp2')}>
        <Image
          source={
            selectedIcon === "mess"
              ? require("../Icon/mess.png")
              : require("../Icon/mess.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Account Icon */}
      <TouchableOpacity onPress={()=> navigation.navigate('Info')}>
        <Image
          source={
            selectedIcon === "account"
              ? require("../Icon/acount_check.png")
              : require("../Icon/acount_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>
    </View>
  );
};



export default Footer;
