import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import styles from "../Css/footer_css";
const Footer = () => {
  const [selectedIcon, setSelectedIcon] = useState("home");

  // Hàm đổi icon
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName); // Đặt icon được chọn
  };

  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <TouchableOpacity onPress={() => handleIconPress("home")}>
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
      <TouchableOpacity onPress={() => handleIconPress("search")}>
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
      <TouchableOpacity onPress={() => handleIconPress("plus")}>
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
      <TouchableOpacity onPress={() => handleIconPress("mess")}>
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
      <TouchableOpacity onPress={() => handleIconPress("account")}>
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
