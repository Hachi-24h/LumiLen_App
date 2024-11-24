import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from "react-native";
import styles from "../../Css/AddGhim_css";

const PinCreationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState("");
  const boards = [
    { id: "1", name: "Hachi" },
    { id: "2", name: "Hachi sama" },
    { id: "3", name: "Nam" },
    { id: "4", name: "Gấu măm măm" },
  ];

  const handleBoardSelection = (boardName) => {
    setSelectedBoard(boardName);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tạo Ghim</Text>

      {/* Section hiển thị ảnh */}
      <View style={styles.imageSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Dùng ảnh tạm thời
          style={styles.imagePreview}
        />
      </View>

      {/* Tiêu đề */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput
          style={styles.input}
          placeholder="Cho mọi người biết Ghim của bạn giới thiệu điều gì"
          placeholderTextColor="#999"
        />
      </View>

      {/* Mô tả */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.input}
          placeholder="Thêm mô tả, đề cập hoặc hashtag vào Ghim của bạn."
          placeholderTextColor="#999"
        />
      </View>

      {/* Chọn bảng */}
      <TouchableOpacity
        style={styles.selectionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectionButtonText}>
          {selectedBoard || "Chọn một bảng"}
        </Text>
        <Text style={styles.rightArrow}>›</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lưu vào bảng</Text>
            <Text style={styles.modalSubtitle}>Các lựa chọn hàng đầu</Text>
            <FlatList
              data={boards}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.boardItemContainer}>
                  <TouchableOpacity
                    style={styles.boardItem}
                    onPress={() => handleBoardSelection(item.name)}
                  >
                    {/* Ảnh đại diện của bảng */}
                    <Image
                      source={{
                        uri: "https://via.placeholder.com/50", // Dùng ảnh placeholder hoặc thay thế bằng ảnh thật
                      }}
                      style={styles.boardImage}
                    />
                    <Text style={styles.boardName}>{item.name}</Text>
                  </TouchableOpacity>
                  {/* Icon khóa */}
                  <Image
                    source={{
                      uri: "https://via.placeholder.com/16", // Biểu tượng khóa (placeholder)
                    }}
                    style={styles.lockIcon}
                  />
                </View>
              )}
            />
            {/* Tạo bảng mới */}
            <TouchableOpacity style={styles.createNewBoardButton}>
              <Text style={styles.createNewBoardText}>+ Tạo bảng</Text>
            </TouchableOpacity>
            {/* Đóng modal */}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Button tạo */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Tạo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinCreationScreen;
