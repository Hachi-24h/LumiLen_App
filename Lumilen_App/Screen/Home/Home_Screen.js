import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../Css/Home_Css';  // Import styles từ file Home_Css.js
import Footer from '../..//Screen/footer';
const imageData = [
  { id: 1, src: require('../../Picture/image_1.png') },
  { id: 2, src: require('../../Picture/image_1.png') },
  { id: 3, src: require('../../Picture/image_1.png') },
  { id: 4, src: require('../../Picture/image_1.png') },
  { id: 5, src: require('../../Picture/image_1.png') },
  { id: 6, src: require('../../Picture/image_1.png') },
];

const options = [
  { icon: 'bookmark-outline', action: () => console.log('Lưu') },  // Lưu
  { icon: 'share-social-outline', action: () => console.log('Chia sẻ') },  // Chia sẻ
  { icon: 'chatbubble-outline', action: () => console.log('Bình luận') },  // Bình luận
  { icon: 'eye-off-outline', action: () => console.log('Ẩn ghim') },  // Ẩn ghim
];

const HomeScreen = ({navigation}) => {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);  // Modal cho sự kiện đè vào màn hình
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);  // Modal từ dưới lên
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [screenLocked, setScreenLocked] = useState(false);

  const handleBottomSheetClose = () => {
    setBottomSheetVisible(false);
    setSelectedImageId(null);
  };

  const handleImageLongPress = (event, id) => {
    const { pageY, pageX } = event.nativeEvent;
    setSelectedImageId(id);
    setModalPosition({
      top: pageY - 50,
      left: pageX - 50,
    });
    setModalVisible(true);
    setScreenLocked(true); // Vô hiệu hóa cuộn màn hình khi modal mở
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedImageId(null);
    setScreenLocked(false);
  };

  const handleOptionPress = (option) => {
    option.action();
    handleModalClose();
  };

  const handleThreeDotsPress = (id) => {
    setSelectedImageId(id);
    setBottomSheetVisible(true);  // Hiển thị giao diện từ dưới lên
  };

  const handleImagePress = (image) => {
    // Chuyển hướng tới trang chi tiết hình ảnh
    navigation.navigate('ImageDetailScreen', { image });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.imageGrid}>
          <View style={styles.leftColumn}>
            {imageData.slice(0, 3).map((image) => (
              <View key={image.id} style={styles.imageWrapper}>
                <TouchableOpacity
                  onPress={() => handleImagePress(image)}  // Bấm vào hình để chuyển đến chi tiết hình ảnh
                  onLongPress={(e) => handleImageLongPress(e, image.id)}
                  activeOpacity={1}
                >
                  <Image style={styles.imageLarge} source={image.src} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.threeDots}
                  onPress={() => handleThreeDotsPress(image.id)}
                >
                  <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.rightColumn}>
            {imageData.slice(3).map((image) => (
              <View key={image.id} style={styles.imageWrapper}>
                <TouchableOpacity
                  onPress={() => handleImagePress(image)}  // Bấm vào hình để chuyển đến chi tiết hình ảnh
                  onLongPress={(e) => handleImageLongPress(e, image.id)}
                  activeOpacity={1}
                >
                  <Image style={styles.imageSmall} source={image.src} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.threeDots}
                  onPress={() => handleThreeDotsPress(image.id)}
                >
                  <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Modal hiển thị 4 nút */}
        {modalVisible && (
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={handleModalClose}
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={handleModalClose}>
              <View style={styles.optionsContainer}>
                {options.map((option, index) => {
                  const angle = (index / (options.length - 1)) * Math.PI;
                  const radius = 70;
                  const x = modalPosition.left + radius * Math.cos(angle);
                  const y = modalPosition.top - radius * Math.sin(angle);

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        {
                          position: 'absolute',
                          left: x,
                          top: y,
                        },
                      ]}
                      onPress={() => handleOptionPress(option)}
                    >
                      <Ionicons name={option.icon} size={24} color="#000" />
                      <Text>{option.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Bottom sheet hiển thị khi nhấn vào nút ba chấm */}
        <Modal
          visible={bottomSheetVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleBottomSheetClose}
        >
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheet}>
              <TouchableOpacity onPress={handleBottomSheetClose}>
                <Ionicons name="close" size={24} color="#000" style={styles.closeIcon} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Chia sẻ với</Text>
              {/* Đây là các tùy chọn chia sẻ */}
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
              {/* Các tùy chọn khác */}
              <Text style={styles.optionText}>Tải ảnh xuống</Text>
              <Text style={styles.optionText}>Ẩn ghim</Text>
              <Text style={styles.optionText}>Báo cáo Ghimm</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Footer cố định ở cuối */}
      <View style={styles.fixedFooter}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
