import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import MasonryList from "react-native-masonry-list";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../Css/Home_Css';
import Footer from '../..//Screen/footer';
import { convertDataWithSize } from '../../Hook/imageUtils';
import BASE_URL from '../../IpAdress';
import { UserContext } from "../../Hook/UserContext";

const options = [
  { icon: 'bookmark-outline', action: () => console.log('Lưu') },
  { icon: 'share-social-outline', action: () => console.log('Chia sẻ') },
  { icon: 'chatbubble-outline', action: () => console.log('Bình luận') },
  { icon: 'eye-off-outline', action: () => console.log('Ẩn ghim') },
];

const HomeScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 100, left: 100 });
  const [selectItem, setSelectItem] = useState("Tất cả");
  const { userData } = useContext(UserContext);
  const userId = userData ? userData._id : null;

  // Hàm lấy dữ liệu từ API
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

      const filteredImages =
        selectItem === "Tất cả"
          ? imagesWithSize
          : imagesWithSize.filter((img) => img.userId === userId);

      setImages(filteredImages);
      setFilteredImages(filteredImages);
    };

    fetchAndConvertImages();
  }, [selectItem, userId]);

  const handleImagePress = (image) => {
    navigation.navigate('ImageDetailScreen', { image });
  };

  const handleImageLongPress = (event, item) => {
    // Kiểm tra nếu pageX và pageY tồn tại, nếu không sử dụng vị trí mặc định
    const { pageX, pageY } = event?.nativeEvent || {};
    setSelectedImageId(item.id);
    setModalPosition({
      top: pageY ??150,  // Sử dụng 150 nếu pageY không tồn tại
      left: pageX ?? 150, // Sử dụng 150 nếu pageX không tồn tại
    });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedImageId(null);
  };

  const handleOptionPress = (option) => {
    option.action();
    handleModalClose();
  };

  const handleThreeDotsPress = (id) => {
    setSelectedImageId(id);
    setBottomSheetVisible(true);
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
        onPressImage={(image) => handleImagePress(image)}
        onLongPressImage={(e, item) => handleImageLongPress(e, item)}
      />

      {/* Modal hiển thị 4 nút */}
      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={handleModalClose}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={handleModalClose}>
            <View style={[styles.optionsContainer, { top: modalPosition.top, left: modalPosition.left }]}>
              {options.map((option, index) => {
                const angle = (index / (options.length-1)) * Math.PI;
                const radius = 55;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, { position: 'absolute', left: x, top: y }]}
                    onPress={() => handleOptionPress(option)}
                  >
                    <Ionicons name={option.icon} size={24} color="#000" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Bottom sheet khi nhấn nút ba chấm */}
      <Modal
        visible={bottomSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <TouchableOpacity onPress={() => setBottomSheetVisible(false)}>
              <Ionicons name="close" size={24} color="#000" style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Chia sẻ với</Text>
            <View style={styles.shareRow}>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="paper-plane-outline" size={24} color="red" />
                <Text>Gửi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="logo-facebook" size={24} color="blue" />
                <Text>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="chatbox" size={24} color="blue" />
                <Text>Messenger</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="chatbox-outline" size={24} color="blue" />
                <Text>Tin nhắn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="mail-outline" size={24} color="red" />
                <Text>Gmail</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <Text style={styles.optionText}>Tải ảnh xuống</Text>
            <Text style={styles.optionText}>Ẩn ghim</Text>
            <Text style={styles.optionText}>Báo cáo Ghimm</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.fixedFooter}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
