import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Alert, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from '../../../../../Css/ChangeAvatar_Css';
import { UserContext } from '../../../../../Hook/UserContext';
import BASE_URL from '../../../../../IpAdress';

const ChangeAvatarScreen = ({ navigation }) => {
  const DefaultAvatar = require('../../../../../Picture/defaultavatar.jpg');
  const { userData, fetchUserData } = useContext(UserContext);
  const userId = userData ? userData._id : null;
  const [avatarUri, setAvatarUri] = useState(userData ? userData.avatar : DefaultAvatar);
  const [isLoading, setIsLoading] = useState(false); // Thêm state để quản lý trạng thái loading

  // Hàm để yêu cầu quyền và mở thư viện ảnh
  const chooseImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Quyền bị từ chối", "Ứng dụng cần quyền truy cập thư viện ảnh.");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
  
        // Hiển thị loading trong khi upload ảnh
        setIsLoading(true);
        const uploadedAvatar = await handleImageUpload(imageUri);
        if (uploadedAvatar) {
          setAvatarUri(uploadedAvatar); // Lưu link URI avatar sau khi upload thành công
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);
      setIsLoading(false);
      Alert.alert("Lỗi", "Không thể chọn ảnh, vui lòng thử lại.");
    }
  };
  

  // Hàm upload ảnh và cập nhật avatar
  const handleImageUpload = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('img', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });

      // Gọi API upload ảnh
      const uploadResponse = await axios.post(`${BASE_URL}:5000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Lấy link từ `path` trong phản hồi
      const cloudinaryLink = uploadResponse.data.path;
      console.error("Đường dẫn ảnh trên Cloudinary:", cloudinaryLink);

      // Cập nhật avatar với link mới
      const response = await axios.put(`${BASE_URL}/user/updateUser/${userId}`, {
        avatar: cloudinaryLink,
      });


      if (response.status === 200) {
        console.log("Avatar cập nhật thành công");
        await fetchUserData(userData.email); // Lấy lại dữ liệu người dùng sau khi cập nhật
        navigation.replace("Info_Bang"); // Làm mới trang
      } else {
        console.error("Cập nhật avatar thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      
      {/* Nút đóng */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="close" size={30} color="black" />
      </TouchableOpacity>

      {/* Phần avatar */}
      <View style={styles.avatarSection}>
        <Text style={styles.title}>Xem ý tưởng từ</Text>
        <Text style={styles.username}>Hachi</Text>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Các nút */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.changeAvatarButton} onPress={chooseImage}>
          <Text style={styles.buttonText}>Thay đổi hình ảnh hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Tải Mã ghim xuống</Text>
        </TouchableOpacity>
      </View>

      {/* Modal hiển thị khi đang tải */}
      {isLoading && (
        <Modal transparent={true} animationType="fade" visible={isLoading}>
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Đang cập nhật, vui lòng chờ...</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ChangeAvatarScreen;
