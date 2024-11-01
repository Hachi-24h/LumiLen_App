import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "../Css/footer_css";

const Footer = ({ navigation,  avatar, initialSelectedIcon , namePage }) => {
  const [selectedIcon, setSelectedIcon] = useState(initialSelectedIcon || "HomeTabs"); 
  const [styleName, setStyleName] = useState(styles.Touch_unselected);
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName); 

    navigation.navigate(iconName === "account" ? "Info_Bang" : iconName, {  selectedIcon: iconName });
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
              ? require("../Icon/home_check.png") // Icon màu đen khi được chọn
              : require("../Icon/home_uncheck.png") // Icon màu xám khi không được chọn
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
        <Image
          source={
            selectedIcon === "Search"
              ? require("../Icon/search_check.png") // Icon màu đen khi được chọn
              : require("../Icon/search_uncheck.png") // Icon màu xám khi không được chọn
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Plus Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
        <Image
          source={
            selectedIcon === "plus"
              ? require("../Icon/plus_check.png") // Icon màu đen khi được chọn
              : require("../Icon/plus_uncheck.png") // Icon màu xám khi không được chọn
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Message Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
        <Image
          source={
            selectedIcon === "mess"
              ? require("../Icon/mess_check.png") // Icon màu đen khi được chọn
              : require("../Icon/mess_uncheck.png") // Icon màu xám khi không được chọn
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Account Icon */}
      <TouchableOpacity onPress={() => handleIconPress("account")} style={styleName}>
        <Image
          source={
            avatar
              ? { uri: avatar } // Dùng avatar từ link nếu có
              : selectedIcon === "account"
              ? require("../Icon/acount_check.png") // Icon màu đen khi được chọn
              : require("../Icon/acount_uncheck.png") // Icon màu xám khi không được chọn
          }
          style={[
            styles.imgIcon,
         
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
