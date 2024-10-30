import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../../../../../Css/ChangeAvatar_Css';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { showSuccessMessage } from '../../../../Other/notification';


const ChangeAvatarScreen = ({navigation}) => {
  const [avatarUri, setAvatarUri] = useState(null);

  // Hàm để yêu cầu quyền và mở thư viện ảnh
  const chooseImage = async () => {
    try {
      // Yêu cầu quyền truy cập thư viện ảnh
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền bị từ chối', 'Ứng dụng cần quyền truy cập thư viện ảnh để tiếp tục.');
        return;
      }

      // Mở thư viện ảnh và cho phép người dùng chọn, cắt ảnh
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Cho phép cắt ảnh
        aspect: [1, 1], // Tỷ lệ cắt ảnh vuông
        quality: 1,
      });

      console.log('Full Result:', result);

      // Kiểm tra nếu có kết quả và không bị hủy
      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Lấy URI từ assets
        const uri = result.assets[0].uri;
        console.log('Image URI:', uri);

        // Cập nhật URI của avatar sau khi người dùng cắt ảnh
        setAvatarUri(uri);

        // Thông báo cập nhật thành công
        showSuccessMessage('Cập nhật avatar thành công.');
      } else {
        // Thông báo lỗi nếu người dùng hủy chọn ảnh
        showSuccessMessage('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      // Thông báo lỗi nếu xảy ra lỗi trong quá trình chọn ảnh
      showSuccessMessage('Có lỗi xảy ra.');
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
            source={avatarUri ? { uri: avatarUri + '?' + new Date().getTime() } : require('../../../../../Picture/image_1.png')}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Phần hướng dẫn */}
      <View style={styles.instructionSection}>
        <Text style={styles.instructionText}>
          1. Mở ứng dụng <Image source={require('../../../../../Icon/logo.png')} style={styles.icon} />
        </Text>
        <Text style={styles.instructionText}>
          2. Chuyển đến thanh <Ionicons name="search-circle-sharp" size={26} />
        </Text>
        <Text style={styles.instructionText}>
          3. Quét bằng biểu tượng <Ionicons name="camera-sharp" size={26} />
        </Text>
      </View>

      {/* Các nút */}
      <View style={styles.buttonSection}>
        {/* Nút chọn ảnh */}
        <TouchableOpacity style={styles.changeAvatarButton} onPress={chooseImage}>
          <Text style={styles.buttonText}>Thay đổi hình ảnh hồ sơ</Text>
        </TouchableOpacity>

        {/* Nút tải mã ghim */}
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Tải Mã ghim xuống</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeAvatarScreen;
