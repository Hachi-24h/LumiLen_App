import React, { useState, useEffect , useContext} from "react";
import { View, TouchableOpacity, Image ,Modal ,Text, TouchableWithoutFeedback} from "react-native";
import styles from "../../Css/footer_css";
import { UserContext } from "../../Hook/UserContext";
import { useNavigationState } from "@react-navigation/native"; 
const Footer = ({ navigation, avatar, initialSelectedIcon, namePage, }) => {
  const [selectedIcon, setSelectedIcon] = useState(
    initialSelectedIcon || "HomeTabs"
  );
  const { userData } = useContext(UserContext);
  const userId = userData ? userData._id : null;
  const [styleName, setStyleName] = useState(styles.Touch_unselected);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const navigationState = useNavigationState((state) => state);  // Lấy trạng thái navigation

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
      navigation.navigate(iconName === "account" ? "Info_Bang" : iconName, {
        selectedIcon: iconName,
      });
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
              ? require("../../Icon/home_check.png")
              : require("../../Icon/home_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Search")}>
        <Image
          source={
            selectedIcon === "Search"
              ? require("../../Icon/search_check.png")
              : require("../../Icon/search_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Plus Icon */}
      <TouchableOpacity onPress={() => {setCreateModalVisible(true)}}>
        <Image
          source={
            selectedIcon === "plus"
              ? require("../../Icon/plus_check.png")
              : require("../../Icon/plus_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Message Icon */}
      <TouchableOpacity onPress={() => handleIconPress("Notification")}>
        <Image
          source={
            selectedIcon === "Notification"
              ? require("../../Icon/mess_check.png")
              : require("../../Icon/mess_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>

      {/* Account Icon */}
      <TouchableOpacity
        onPress={() => handleIconPress("account")}
        style={styleName}

      >
        <Image
          source={
            avatar
              ? { uri: avatar }
              : selectedIcon === "account"
              ? require("../../Icon/acount_check.png")
              : require("../../Icon/acount_uncheck.png")
          }
          style={styles.imgIcon}
        />
      </TouchableOpacity>
      <Modal
          visible={isCreateModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCreateModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setCreateModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.createModalContent}>
                <View style={styles.buttoncancel}>
                  <TouchableOpacity
                    onPress={() => setCreateModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Image
                      source={require("../../Icon/cancel.png")}
                      style={styles.optionIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.createModalTitle}>Bắt đầu tạo ngay</Text>
                </View>
                <View style={styles.createOptions}>
                  <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() =>
                        navigation.navigate(
                          "AddGhim",
                          { userId },
                          setCreateModalVisible(false)
                        )
                      }
                    >
                      <Image
                        source={require("../../Icon/upload.png")}
                        style={styles.optionIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Ghim</Text>
                  </View>

                  <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <TouchableOpacity style={styles.optionButton}>
                      <Image
                        source={require("../../Icon/abum.png")}
                        style={styles.optionIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Bảng</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    </View>
  );
};

export default Footer;
