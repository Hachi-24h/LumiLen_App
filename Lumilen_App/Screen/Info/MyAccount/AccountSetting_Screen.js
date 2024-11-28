import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
 
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../../../Css/AccountSetting_Css"; // Import CSS
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../Other/footer";
import { UserContext } from "../../../Hook/UserContext";

const AccountScreen = ({ navigation, route }) => {
  const DefaultAvatar = require("../../../Icon/acount_check.png");
  const { userData,clearUserData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : DefaultAvatar;
  const name = userData ? userData.lastName + " "+ userData.firstName : "Chưa cập nhật";
 
  const handleLogout = () => {
    // Hiển thị cảnh báo xác nhận khi bấm nút đăng xuất
    Alert.alert(
      "Đăng xuất",
      "Bạn chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đăng xuất",
          onPress: async () => {
            try {
              // Điều hướng đến màn hình SignUp và không cho phép quay lại
              navigation.reset({
                index: 0, // Đặt lại index của stack navigation
                routes: [{ name: "SignUp" }], // Chỉ định màn hình mới là SignUp
              });
            } catch (error) {
              console.error("Lỗi khi đăng xuất:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản của bạn</Text>
      </View>

      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: avatar }} style={styles.profileImage} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileLink}>Xem hồ sơ</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate("AccountManagement")}
          >
            <Text style={styles.settingText}>Quản lý tài khoản</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Chế độ hiển thị hồ sơ</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Bộ điều chỉnh bảng tin nhà</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Tài khoản được xác nhận</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Quyền mạng xã hội</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Thông báo</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Quyền riêng tư và dữ liệu</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>
              Cổng thông tin báo cáo vi phạm
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Đăng nhập</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Bảo mật</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <Text style={styles.settingText}>Đăng xuất</Text> 
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Hỗ trợ</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate("ChatBoxAI")}
          >
            <Text style={styles.settingText}>Trung tâm Trợ giúp</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>



          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Điều khoản dịch vụ</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Chính sách quyền riêng tư</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Giới thiệu</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer
        navigation={navigation}
        avatar={avatar}
        initialSelectedIcon={"account"}
        namePage={"Trang Thông Tin Cá Nhân"}
      />
    </View>
  );
};

export default AccountScreen;
