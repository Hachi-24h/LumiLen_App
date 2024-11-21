import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import MasonryList from "react-native-masonry-list";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../Css/Home_Css';
import Footer from '../footer';
import { convertDataWithSize } from '../../Hook/imageUtils';
import BASE_URL from '../../IpAdress';
import { UserContext } from "../../Hook/UserContext";
import * as FileSystem from 'expo-file-system';

const HomeScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { userData } = useContext(UserContext);
  const userId = userData ? userData._id : null;
  const avatar = userData ? userData.avatar : null;

  // Fetch images from API
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(`${BASE_URL}/picture/getUserImages?userId=${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      const data = await fetchDataFromAPI();
      const imagesWithSize = await convertDataWithSize(data);
      setImages(imagesWithSize);
      setFilteredImages(imagesWithSize);
    };

    fetchAndConvertImages();
  }, [userId]);

  const handlePin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/addPictureToListAnhGhim/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pictureId: selectedImageId }),
      });
      const data = await response.json();
      if (data.message === "Thêm ảnh vào ListAnhGhim thành công.") {
        Alert.alert("Thành công", "Ảnh đã được ghim!");
      } else {
        Alert.alert("Thất bại", data.message);
      }
    } catch (error) {
      console.error("Error pinning image:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi ghim ảnh!");
    } finally {
      setModalVisible(false);
    }
  };

  const handleDownload = async () => {
    try {
      const filename = selectedImageUri.split('/').pop();
      const filepath = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.downloadAsync(selectedImageUri, filepath);
      Alert.alert("Thành công", `Ảnh đã được tải về: ${filepath}`);
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tải ảnh!");
    } finally {
      setModalVisible(false);
    }
  };

  const openOptions = (id, uri) => {
    setSelectedImageId(id);
    setSelectedImageUri(uri);
    setModalVisible(true); // Hiển thị modal
  };

  return (
    <View style={styles.container}>
      <MasonryList
        images={filteredImages.map((item) => ({
          source: { uri: item.uri },
          width: item.width,
          height: item.height,
          id: item.id,
        }))}
        columns={2}
        spacing={2}
        imageContainerStyle={styles.imageStyle}
        renderIndividualHeader={(item) => (
          <TouchableOpacity
            style={styles.threeDotsButton}
            onPress={() => openOptions(item.id, item.source.uri)}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        )}
      />

      {/* Modal hiển thị 2 nút */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Đóng modal khi bấm nút back trên Android
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1} // Đảm bảo không gây hiệu ứng mờ khi chạm
          onPress={() => setModalVisible(false)} // Đóng modal khi chạm ra ngoài
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption} onPress={handlePin}>
              <Text style={styles.optionText}>Ghim ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleDownload}>
              <Text style={styles.optionText}>Tải ảnh xuống</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text>Đóng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>


      <View style={styles.fixedFooter}>
        <Footer
          navigation={navigation}
          avatar={avatar}
          initialSelectedIcon={"account"}
          namePage={"Trang Home"}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
