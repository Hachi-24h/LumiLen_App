// ImageDetailScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../Css/ImageDetail_Css'; 

const ImageDetailScreen = ({ route, navigation }) => {
  const { image } = route.params; // Nhận dữ liệu ảnh được truyền qua navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={45} color="#fff" />
      </TouchableOpacity>

      {/* Nút 3 chấm góc phải */}
      <TouchableOpacity onPress={() => { /* Xử lý khi nhấn vào nút ba chấm */ }} style={styles.threeDotsButton}>
        <Ionicons name="ellipsis-horizontal" size={45} color="#fff" />
      </TouchableOpacity>

      {/* Nội dung chính, có thể cuộn */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hình ảnh chính */}
        <Image source={image.src} style={styles.image} />

        {/* Các nút bên dưới hình ảnh */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Text style={styles.iconText}>365</Text>
          </TouchableOpacity>

          {/* Nút "Xem" và "Lưu" nằm giữa */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.buttonText}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.buttonTextSave}>Lưu</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-social" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageDetailScreen;
