import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import { showNotification } from "../../../../../../Custom/notification";
import styles from "../../../../../../Css/PersonalInfo_Css";
import { UserContext } from "../../../../../../Hook/UserContext";

const PersonalInfoScreen = ({ navigation, route }) => {
  const { userData } = useContext(UserContext);
  const dob = userData ? userData.dob : null;
  const date = new Date(dob);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const gender = userData.gender === "Male" ? "Nam" : userData.gender === "Female"  ? "Nữ" : "Khác";
  
  useEffect(() => {
    if (route.params?.showNotification) {
      showNotification(route.params.showNotification,route.params.type);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("AccountManagement")}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
      </View>

      <Text style={styles.introText}>
        Chỉnh sửa thông tin cá nhân cơ bản của bạn để cải thiện đề xuất. Thông
        tin này là riêng tư và sẽ không hiển thị trong hồ sơ công khai của bạn.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân của bạn</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("DOBInfo")}
        >
          <Text style={styles.settingText}>Ngày sinh</Text>
          <Text style={styles.settingDetail}>{formattedDate}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("GenderInfo", { gender })}
        >
          <Text style={styles.settingText}>Giới tính</Text>
          <Text style={styles.settingDetail}>{gender}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("CountrySelector")}
        >
          <Text style={styles.settingText}>Quốc gia/khu vực</Text>
          <Text style={styles.settingDetail}>Việt Nam (Việt Nam)</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Ngôn ngữ</Text>
          <Text style={styles.settingDetail}>Tiếng Việt</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông báo */}
      <FlashMessage position="top" />
    </View>
  );
};

export default PersonalInfoScreen;
