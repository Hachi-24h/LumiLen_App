import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import { showSuccessMessage } from "../../../../../Other/notification"; // Sử dụng hàm thông báo dùng chung
import styles from "../../../../../../Css/PersonalInfo_Css";

const PersonalInfoScreen = ({ navigation, route }) => {
  const [birthDate, setBirthDate] = useState("12 thg 3, 2004");
  const [gender, setGender] = useState("Nam"); // Thêm biến lưu giới tính

  // Cập nhật ngày sinh hoặc giới tính khi quay về từ các màn hình khác
  useEffect(() => {
    if (route.params?.selectedDate) {
      setBirthDate(route.params.selectedDate);
    }

    if (route.params?.selectedGender) {
      setGender(route.params.selectedGender); // Cập nhật giới tính từ GenderScreen
    }

    // Hiển thị thông báo nếu có message từ route
    if (route.params?.showSuccessMessage) {
      showSuccessMessage(route.params.showSuccessMessage);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
          <Text style={styles.settingDetail}>{birthDate}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("GenderInfo", { gender })} // Truyền giá trị giới tính hiện tại sang màn GenderInfo
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
