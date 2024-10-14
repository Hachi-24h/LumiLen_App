import React from 'react';
import { View, Text, Image, TouchableOpacity ,StatusBar} from 'react-native';
import styles from '../../../../../Css/ChangeAvatar_Css';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const ChangeAvatarScreen = () => {
  return (
    <View style={styles.container}>
        <StatusBar hidden={false} />
      {/* Nút đóng */}
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Phần avatar */}
      <View style={styles.avatarSection}>
        <Text style={styles.title}>Xem ý tưởng từ</Text>
        <Text style={styles.username}>Hachi</Text>
        <View style={styles.avatarWrapper}>
          <Image source={require('../../../../../Picture/image_1.png')} style={styles.avatar} />
        </View>
      </View>

      {/* Phần hướng dẫn */}
      <View style={styles.instructionSection}>
        <Text style={styles.instructionText}>1. Mở ứng dụng  <Image source={require('../../../../../Icon/logo.png')} style={styles.icon} /></Text>
        <Text style={styles.instructionText}>2. Chuyển đến thanh  <Ionicons name="search-circle-sharp" size={26} /> </Text>
        <Text style={styles.instructionText}>3. Quét bằng biểu tượng  <Ionicons name="camera-sharp" size={26} /> </Text>
      </View>

      {/* Các nút */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.changeAvatarButton}>
          <Text style={styles.buttonText}>Thay đổi hình ảnh hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Tải Mã ghim xuống</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeAvatarScreen;
