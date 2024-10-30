// ImageDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../Css/ImageDetail_Css'; 

const ImageDetailScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [isModalVisible, setModalVisible] = useState(false); // Trạng thái cho modal tùy chọn
  const [isShareModalVisible, setShareModalVisible] = useState(false); // Trạng thái cho modal chia sẻ

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleShareModal = () => {
    setShareModalVisible(!isShareModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={45} color="#fff" />
      </TouchableOpacity>

      {/* Nút 3 chấm góc phải */}
      <TouchableOpacity onPress={toggleModal} style={styles.threeDotsButton}>
        <Ionicons name="ellipsis-horizontal" size={45} color="#fff" />
      </TouchableOpacity>

      {/* Nội dung chính */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={image.src} style={styles.image} />

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Text style={styles.iconText}>365</Text>
          </TouchableOpacity>

          {/* Nút "Xem" và "Lưu" */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.buttonText}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.buttonTextSave}>Lưu</Text>
            </TouchableOpacity>
          </View>

          {/* Nút "Chia sẻ" */}
          <TouchableOpacity style={styles.iconButton} onPress={toggleShareModal}>
            <Ionicons name="share-social" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Tùy chọn */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="close-outline" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Tùy chọn</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.modalOption}>Theo dõi melitarai</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalOption}>Chia sẻ Ghim này</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalOption}>Sao chép liên kết</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalOption}>Tải ảnh xuống</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalOption}>Báo cáo Ghim</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalOption}>Ẩn Ghim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Chia sẻ */}
      <Modal
        transparent={true}
        visible={isShareModalVisible}
        animationType="slide"
        onRequestClose={toggleShareModal}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={toggleShareModal}>
          <View style={styles.shareModalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleShareModal}>
                <Ionicons name="close-outline" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Chia sẻ</Text>
            </View>

            {/* Biểu tượng chia sẻ */}
            <View style={styles.shareRow}>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="logo-facebook" size={40} color="#4267B2" />
                <Text>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="chatbox-ellipses" size={40} color="#0084FF" />
                <Text>Messenger</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="chatbox-ellipses-outline" size={40} color="#000" />
                <Text>Tin nhắn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="mail-outline" size={40} color="#DB4437" />
                <Text>Gmail</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.shareRow}>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="paper-plane-outline" size={40} color="#0088CC" />
                <Text>Telegram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="link-outline" size={40} color="#000" />
                <Text>Sao chép liên kết</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="logo-pinterest" size={40} color="#E60023" />
                <Text>Pinterest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Ionicons name="ellipsis-horizontal" size={40} color="#000" />
                <Text>Khác</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ImageDetailScreen;
