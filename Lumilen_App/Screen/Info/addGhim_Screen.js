import React, { useState, useEffect , useContext} from "react";
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
import BASE_URL from "../../config/IpAdress";
import { showNotification } from "../../Custom/notification";
import LoadingModal from "../../Custom/Loading";
import { UserContext } from "../../Hook/UserContext";
import colors from "../../Custom/Color";
const PinCreationScreen = ({navigation, route}) => {
  const userId = route.params.userId;
  
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
  const [title, setTitle] = useState(""); // Tiêu đề Ghim
  const [description, setDescription] = useState(""); // Mô tả Ghim
  const { userdata } = useContext(UserContext);

  
  // console.log("Id người dùng:", userId);
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

  const FuntsetSelectedBoard = () => {
    if (selectedBoard === "Chọn một bảng") {
      setSelectedBoard(boards[0].name);
    }
  };
  FuntsetSelectedBoard();

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

  const handleCreateBoard = async () => {
    const trimmedBoardName = newBoardName.trim().toLowerCase();

    if (!trimmedBoardName) {
      showNotification("Tên bảng không được để trống !", "error");
      return;
    }

    // Kiểm tra trùng lặp với các bảng hiện có
    const isDuplicate = boards.some(
      (board) => board.name.trim().toLowerCase() === trimmedBoardName
    );

    if (isDuplicate) {
      showNotification("Tên bảng đã được sử dụng !", "error");
      return; // Ngừng tạo bảng nếu bị trùng
    }

    try {
      const statusTab = isPrivate ? "block" : "unblock";

      const response = await axios.post(
        `${BASE_URL}:5000/tableUser/addTableUser`,
        {
          userId,
          name: newBoardName.trim(), // Tên bảng đã loại bỏ khoảng trắng
          statusTab,
        }
      );

      if (response.status === 200) {
        const newBoard = response.data.tableUser;

        // Thêm bảng mới vào danh sách và đặt làm bảng đã chọn
        setBoards((prevBoards) => [...prevBoards, newBoard]);
        setSelectedBoard(newBoard.name); // Đặt tên bảng mới được tạo
        showNotification(`Tạo ${newBoardName}`, "success");
      } else {
        showNotification("Có lỗi xảy ra !", "error");
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra !", "error");
    } finally {
      setCreateBoardModalVisible(false);
      setModalVisible(false);
    }
  };

  // Xử lý khi nhấn nút "Tạo"
  const handleUpload = async () => {
    if (!imageUri) {
      showNotification("Bạn cần chọn ảnh trước khi upload", "error");
      return;
    }

    if (!selectedBoard) {
      showNotification("Hãy chọn một bảng để thêm ảnh", "error");
      return;
    }

    if (!title.trim()) {
      showNotification("Tiêu đề không được để trống!", "error");
      return;
    }

    setLoading(true); // Hiển thị loading

    try {
      // 1. Upload ảnh và lấy link
      const formData = new FormData();
      formData.append("img", {
        uri: imageUri,
        type: "image/jpeg",
        name: "picture.jpg",
      });

      const uploadResponse = await axios.post(
        `${BASE_URL}:5000/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImageUri = uploadResponse.data.path;
      // console.error("Đường dẫn ảnh trên Cloudinary:", uploadedImageUri);
      if (!uploadedImageUri) {
        throw new Error("Upload ảnh thất bại");
      }

      // 2. Tạo dữ liệu ảnh mới
      const newPictureData = {
        uri: uploadedImageUri,
        title: title.trim(),
        userId: userId,
        typePicture: description.trim(),
      };
      console.log("Dữ liệu ảnh mới:", newPictureData);

      const createPictureResponse = await axios.post(
        `${BASE_URL}:5000/picture/addPicture`,
        newPictureData
      );

      const newPicture = createPictureResponse.data.picture;
      console.log("Dữ liệu ảnh đã tạo:", newPicture);

      if (!newPicture || !newPicture._id) {
        throw new Error("Tạo dữ liệu ảnh thất bại");
      }
      console.log("Id ảnh mới:", newPicture._id);

      // 3. Thêm ảnh vào bảng được chọn
      const selectedBoardData = boards.find(
        (board) => board.name === selectedBoard
      );

      if (!selectedBoardData || !selectedBoardData._id) {
        throw new Error("Không tìm thấy bảng được chọn");
      }

      cons
      console.log("Id bảng được chọn:", selectedBoardData._id);
      const addPictureToTableResponse = await axios.post(
        `${BASE_URL}:5000/picture/addPictureToTableUser`,
        {
          userId,
          tableUserId: selectedBoardData._id,
          pictureId: newPicture._id,
        }
      );
      console.log("Kết quả thêm ảnh vào bảng:", addPictureToTableResponse.data);

      if (addPictureToTableResponse.status === 200) {
        showNotification("Tạo ghim thành công!", "success");
      } else {
        throw new Error("Thêm ảnh vào bảng thất bại");
      }
    } catch (error) {
      showNotification(error.message || "Có lỗi xảy ra!", "error");
    } finally {
      setLoading(false); // Tắt loading
    }
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
      <View style={styles.ImageChoose}>
      <TouchableOpacity style={styles.imageSection} onPress={chooseImage}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: imageDimensions.width / 4,
              height: imageDimensions.height / 4,
              borderRadius: 15,
            
              
            }}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.placeholder]}>
           <Image source={require("../../Picture/defaulttableuser.jpg")} style={styles.placeholder} />  
           
          </View>
        )}
        <Text style={styles.statusText}>{statusText}</Text>
      </TouchableOpacity>
      </View>
    
      <View style={styles.inputSection}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput
          style={[
            styles.input,
            title.trim() ? { borderColor: colors.black } : { borderColor: colors.red },
          ]}
          placeholder="Tiêu đề của bạn là gì nhỉ ?"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Mô tả */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
       style={[
        styles.input,
        description.trim() ? { borderColor: colors.black } : { borderColor: colors.red },
      ]}
          placeholder="  Nhập mô tả cho ghim của bạn"
          placeholderTextColor="#999"
          value={description} 
          onChangeText={setDescription}
        />
     <Text style={styles.label}>Chọn Bảng </Text>
      <TouchableOpacity
        style={styles.selectionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectionButtonText}>
          {selectedBoard || "Chọn một bảng"}
        </Text>
       <Image source={require("./../../Icon/right.png")} style={styles.rightArrow} />
      </TouchableOpacity>
 </View>
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
              <Text style={styles.createNewBoardText}>Tạo bảng</Text>
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
              placeholder="Tên bảng mới ..."
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
            <View style={styles.Buttonhander}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateBoard}
            >
              <Text style={styles.createButtonText}>Tạo</Text>
            </TouchableOpacity>
          </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.Buttonhander}>
      <TouchableOpacity style={styles.createButton} onPress={handleUpload}>
        <Text style={styles.createButtonText}>Tạo</Text>
      </TouchableOpacity>
      {loading && <LoadingModal loading={loading} text="Đang tạo Ghim" />}
      </View>
    </View>
  );
};

export default PinCreationScreen;
