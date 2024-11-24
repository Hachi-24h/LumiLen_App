import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from "../../Css/AddGhim_css";
import BASE_URL from "../../IpAdress";
const PinCreationScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [statusText, setStatusText] = useState("Chọn ảnh để tải lên");
  const [modalVisible, setModalVisible] = useState(false); // Modal chọn bảng
  const [createBoardModalVisible, setCreateBoardModalVisible] = useState(false); // Modal tạo bảng
  const [selectedBoard, setSelectedBoard] = useState("");
  const [newBoardName, setNewBoardName] = useState(""); // Tên bảng mới
  const [isPrivate, setIsPrivate] = useState(false); // Chế độ hiển thị của bảng
  const [boards, setBoards] = useState([]); // Danh sách bảng
  const [loading, setLoading] = useState(true); // Trạng thái tải API

  const userId = "672cd1f6ea6637803a6b8424"; // ID của user hiện tại
  // Gọi API lấy danh sách bảng
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}:5000/tableUser/getTableUsers/${userId}`
        );
        setBoards(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bảng:", error);
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const chooseImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Quyền bị từ chối",
          "Ứng dụng cần quyền truy cập thư viện ảnh."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;

        // Lấy kích thước thực tế của ảnh
        Image.getSize(selectedImageUri, (width, height) => {
          setImageDimensions({ width, height });
        });

        setImageUri(selectedImageUri);
        setStatusText("Ảnh của bạn đây");
      }
    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);
    }
  };

  const handleBoardSelection = (boardName) => {
    setSelectedBoard(boardName);
    setModalVisible(false);
  };

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      Alert.alert("Lỗi", "Tên bảng không được để trống!");
      return;
    }
    Alert.alert("Thành công", `Bảng "${newBoardName}" đã được tạo!`);
    setCreateBoardModalVisible(false);
    setModalVisible(false);
  };

  const handleUpload = () => {
    if (!imageUri) {
      Alert.alert("Lỗi", "Bạn cần chọn ảnh trước khi tạo!");
      return;
    }
    Alert.alert("Thành công", "Ghim của bạn đã được tạo!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("./../../Icon/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tạo Ghim</Text>
      </View>
      {/* Phần ảnh */}
      <TouchableOpacity style={styles.imageSection} onPress={chooseImage}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: imageDimensions.width / 4,
              height: imageDimensions.height / 4,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "red",
            }}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>150 x 150</Text>
          </View>
        )}
        <Text style={styles.statusText}>{statusText}</Text>
      </TouchableOpacity>

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

      {/* Modal chọn bảng */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lưu vào bảng</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <FlatList
                data={boards}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.boardItem}
                    onPress={() => handleBoardSelection(item.name)}
                  >
                    <Image
                      source={
                        item.uri
                          ? { uri: item.uri }
                          : require("./../../Picture/defaulttableuser.jpg")
                      }
                      style={styles.boardImage}
                    />
                    <Text style={styles.boardName}>{item.name}</Text>
                    {item.statusTab === "block" && (
                      <Image
                        source={require("./../../Icon/lock.png")}
                        style={styles.lockIcon}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              style={styles.createNewBoardButton}
              onPress={() => {
                setCreateBoardModalVisible(true);
                setModalVisible(false);
              }}
            >
              <Text style={styles.createNewBoardText}>+ Tạo bảng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal tạo bảng */}
      <Modal
        visible={createBoardModalVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setCreateBoardModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tạo bảng</Text>
            <TextInput
              style={styles.input}
              placeholder="Thêm tiêu đề như 'Tự làm' hoặc 'Công thức nấu ăn'"
              value={newBoardName}
              onChangeText={setNewBoardName}
            />
            <View style={styles.privateMode}>
              <Text style={styles.privateModeText}>Giữ bí mật bảng này</Text>
              <Switch
                value={isPrivate}
                onValueChange={(value) => setIsPrivate(value)}
              />
            </View>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateBoard}
            >
              <Text style={styles.createButtonText}>Tạo</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Button tạo */}
      <TouchableOpacity style={styles.createButton} onPress={handleUpload}>
        <Text style={styles.createButtonText}>Tạo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinCreationScreen;
