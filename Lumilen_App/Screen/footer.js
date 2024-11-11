import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "../Css/footer_css";

const Footer = ({ navigation, avatar, initialSelectedIcon, namePage }) => {
  const [selectedIcon, setSelectedIcon] = useState(initialSelectedIcon || "HomeTabs"); 
  const [styleName, setStyleName] = useState(styles.Touch_unselected);

  const handleIconPress = (iconName) => {
    if (iconName === "account") {
      if (selectedIcon === "account") {
        // Nếu đang ở trang "account", dùng `replace` để tải lại trang
        navigation.replace("Info_Bang", { selectedIcon: iconName });
      } else {
        setSelectedIcon("account");
        navigation.navigate("Info_Bang", { selectedIcon: iconName });
      }
    } else {
      setSelectedIcon(iconName);
      navigation.navigate(iconName === "account" ? "Info_Bang" : iconName, { selectedIcon: iconName });
    }
  };

  useEffect(() => {
    if (selectedIcon === "account") {
      setStyleName(styles.Touch_selected);
    } else {
      setStyleName(styles.Touch_unselected);
    }
  }, [selectedIcon]);

  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <TouchableOpacity onPress={() => handleIconPress("HomeTabs")}>
        <Image
          source={
            selectedIcon === "HomeTabs"
              ? require("../Icon/home_check.png")
              : require("../Icon/home_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
        <Image
          source={
            selectedIcon === "Search"
              ? require("../Icon/search_check.png")
              : require("../Icon/search_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Plus Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
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
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
        <Image
          source={
            selectedIcon === "mess"
              ? require("../Icon/mess_check.png")
              : require("../Icon/mess_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Account Icon */}
      <TouchableOpacity onPress={() => handleIconPress("account")} style={styleName}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : selectedIcon === "account"
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
