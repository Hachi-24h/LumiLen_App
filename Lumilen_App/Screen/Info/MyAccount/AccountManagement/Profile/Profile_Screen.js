import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from "../../../../../Css/Proflie_Css";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from '../../../../../config/IpAdress';
import axios from "axios"; // Import axios để gọi API

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null); // State lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // State hiển thị trạng thái tải dữ liệu
  const userId = route.params?.userId || "672ce50c61839139af3b06ac"; // Lấy userId từ route params (hoặc mặc định)

  // Hàm lấy thông tin người dùng từ API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}:5000/user/findUserById/${userId}`);
      setUserData(response.data); // Lưu thông tin người dùng vào state
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false); // Tắt trạng thái tải dữ liệu
    }
  };

  useEffect(() => {
    fetchUserData(); // Gọi API khi component được mount
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="share-social" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ChangeAvatar")}>
          {/* Hiển thị avatar mới nếu có, nếu không hiển thị ảnh mặc định */}
          <Image
            source={userData?.avatar ? { uri: userData.avatar } : require('../../../../../Picture/image_1.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>
          {userData?.firstName} {userData?.lastName || "Chưa cập nhật"}
        </Text>
        <Text style={styles.userID}>@{userData?.idUser || "Unknown"}</Text>
        <Text style={styles.followInfo}>
          {userData?.followers?.length || 0} người theo dõi · {userData?.following?.length || 0} đang theo dõi
        </Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("UpdateInfo")}>
          <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      </View>

      {/* Pins Section */}
      <View style={styles.pinsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.pinItem}>
            <Image source={require('../../../../../Icon/plus_check.png')} style={styles.pinImage} />
          </View>
          <View style={styles.pinItem}>
            <Image source={require('../../../../../Icon/plus_check.png')} style={styles.pinImage} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
