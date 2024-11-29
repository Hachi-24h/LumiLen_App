import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Footer from "../footer";
import styles from "../../Css/Home_Css";
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";


const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2; // Số cột
const SPACING = 15; // Khoảng cách giữa các cột
const columnWidth = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

const HomeTabs = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;
  const [images, setImages] = useState([]); // Danh sách ảnh đầy đủ
  const [filteredImages, setFilteredImages] = useState([]); // Danh sách ảnh được lọc
  const [selectedItem, setSelectedItem] = useState(null); // Lưu ảnh được chọn
  const [isModalGhim, setModalGhim] = useState(false); // Trạng thái của Modal
  const [isPinModalVisible, setPinModalVisible] = useState(false); // Trạng thái của modal ghim ảnh
  const [pinTitle, setPinTitle] = useState(""); // Khai báo pinTitle để lưu giá trị tiêu đề ghim
  const [isModalBang, setModalBang] = useState(false); // Modal chọn bảng
  const [boards, setBoards] = useState([]); // Danh sách bảng
  const [loading, setLoading] = useState(true); // Trạng thái tải API

  const userId = userData ? userData._id : null; // Lấy userId từ dữ liệu người dùng
  // Hàm lấy dữ liệu từ API
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(`${BASE_URL}:5000/picture/getAllPictures`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  // Hàm lấy thông tin user dựa trên userID
  const fetchUser = async (userID) => {
    try {
      const response = await fetch(
        `${BASE_URL}:5000/user/findUserById/${userID}`
      );
      if (response.ok) {
        const userData = await response.json();
        return userData.avatar || "https://via.placeholder.com/150";
      } else if (response.status === 404) {
        return "https://via.placeholder.com/150"; // Avatar mặc định nếu user không tồn tại
      } else {
        return "https://via.placeholder.com/150"; // Avatar mặc định khi có lỗi khác
      }
    } catch (error) {
      return "https://via.placeholder.com/150"; // Avatar mặc định khi có lỗi khác
    }
  };

  // Lấy danh sách ảnh và thêm avatar của user
  useEffect(() => {
    const fetchAndConvertImages = async () => {
      const data = await fetchDataFromAPI();
      const imagesWithSize = await convertDataWithSize(data);

      // Lấy avatar cho từng ảnh
      const imagesWithAvatars = await Promise.all(
        imagesWithSize.map(async (image) => {
          const avatar = await fetchUser(image.userId); // Lấy avatar dựa trên userId
          return { ...image, avatar }; // Gắn avatar vào dữ liệu ảnh
        })
      );

      setImages(imagesWithAvatars);
      setFilteredImages(imagesWithAvatars); // Khởi tạo `filteredImages` với toàn bộ ảnh ban đầu
    };

    fetchAndConvertImages();
  }, []);

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
  // Tạo dữ liệu từng cột để tạo hiệu ứng masonry
  const generateColumns = (data) => {
    const columns = Array.from({ length: COLUMN_COUNT }, () => []); // Tạo mảng số cột
    data.forEach((item, index) => {
      const columnIndex = index % COLUMN_COUNT; // Xác định ảnh thuộc cột nào
      columns[columnIndex].push(item);
    });
    return columns;
  };

  const handleDownloadImage = async (uri) => {
    try {
      // Yêu cầu quyền truy cập MediaLibrary
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Cấp quyền",
          "Bạn cần cấp quyền truy cập để tải ảnh xuống."
        );
        return;
      }

      // Đường dẫn tạm thời để lưu file
      const fileUri = FileSystem.cacheDirectory + uri.split("/").pop();

      // Tải ảnh từ URI và lưu vào file tạm
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        fileUri
      );
      const { uri: tempUri } = await downloadResumable.downloadAsync();

      // Lưu file từ thư mục tạm vào thư mục `Download`
      const asset = await MediaLibrary.createAssetAsync(tempUri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album === null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Thành công", "Ảnh đã được tải xuống thư mục Download!");
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      Alert.alert("Lỗi", "Không thể tải xuống ảnh.");
    }
  };

// Hàm xử lý khi bấm vào ba chấm
const handleMoreOptions = (item) => {
  setSelectedItem(item); // Gán giá trị selectedItem khi bấm vào ảnh
  setModalGhim(true); // Mở modal
};

  const handleBoardSelection = () => {
    setModalBang(true);
    setModalGhim(false);
  };
 // Hàm xử lý lưu ảnh vào bảng và Ghim
const handleBoard = async (selectedBoard) => {
  try {
    // Kiểm tra xem đã chọn ảnh và bảng chưa
    if (!selectedItem || !selectedItem._id) {
      Alert.alert("Lỗi", "Vui lòng chọn ảnh trước khi ghim.");
      return;
    }

    if (!selectedBoard || !selectedBoard._id) {
      Alert.alert("Lỗi", "Vui lòng chọn một bảng.");
      return;
    }

    setModalBang(false);
    setPinModalVisible(true);

    console.log("Selected Item ID: ", selectedItem._id); // Kiểm tra ID ảnh
    console.log("Selected Board ID: ", selectedBoard._id); // Kiểm tra ID bảng
    console.log("User ID: ", userId);

    // Gửi yêu cầu lưu ảnh vào bảng
    const response = await axios.post(
      `${BASE_URL}:5000/picture/addPictureToTableUser`,
      {
        tableUserId: selectedBoard._id, // Chắc chắn bảng đã chọn có ID hợp lệ
        pictureId: selectedItem._id,    // Chắc chắn ảnh đã chọn có ID hợp lệ
        userId: userId,
      }
    );

    if (response.status === 200) {
      Alert.alert("Thành công", "Ảnh đã được lưu vào bảng!");
    } else {
      Alert.alert("Lỗi", "Không thể lưu ảnh vào bảng.");
    }

    // Lưu ảnh vào Ghim
    const pinResponse = await axios.post(
      `${BASE_URL}:5000/picture/addPicture`,
      {
        uri: selectedItem.uri,
        title: selectedItem.title,
        userId: userId,
      }
    );

    if (pinResponse.status === 200) {
      Alert.alert("Thành công", "Ảnh đã được lưu vào Ghim!");
    }
  } catch (error) {
    console.error("Lỗi khi lưu ảnh vào bảng hoặc Ghim:", error.response || error);
    Alert.alert("Lỗi", "Có lỗi xảy ra khi lưu ảnh vào bảng hoặc Ghim.");
  }
};
  
  const renderColumn = (columnData, columnIndex) => {
    return (
      <View
        key={`column-${columnIndex}`}
        style={{ flex: 1, marginHorizontal: SPACING / 2 }}
      >
        {columnData.map((item, index) => {
          const imageHeight = (item.height / item.width) * columnWidth;

          return (
            <View
              key={item._id || `${columnIndex}-${index}`} // Đảm bảo key là duy nhất
              style={styles.imageContainer}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ImageDetailScreen", { dataAnh: item })
                }
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: columnWidth,
                    height: imageHeight,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                />
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Image
                  source={{
                    uri: item.avatar || "https://via.placeholder.com/150",
                  }}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText} numberOfLines={1}>
                  {item.title || "Không có tiêu đề"}
                </Text>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => handleMoreOptions(item)}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.body}>
        <FlatList
          data={generateColumns(filteredImages)} // Danh sách cột
          renderItem={({ item, index }) => renderColumn(item, index)} // Render từng cột
          keyExtractor={(item, index) => `column-${index}`} // Key của mỗi cột
          horizontal={false} // Cuộn dọc
          numColumns={COLUMN_COUNT} // Đặt số cột
          contentContainerStyle={{
            padding: SPACING,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
        />
      </View>
      {/* Footer */}
      <Footer
        navigation={navigation}
        avatar={avatar}
        initialSelectedIcon={"HomeTabs"}
        namePage={"Trang Home"}
      />

      {/* Modal khi bấm vào ba chấm */}
      {selectedItem && (
        <Modal
          visible={isModalGhim}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalGhim(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedItem.avatar }}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleBoardSelection}
              >
                <Text style={styles.actionText}>Ghim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDownloadImage(selectedItem.uri)}
              >
                <Text style={styles.actionText}>Tải xuống</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButtonTxt}
                onPress={() => setModalGhim(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal chọn bảng */}
      <Modal visible={isModalBang} animationType="slide" transparent={true}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalBang(false)}
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
                    onPress={() => handleBoard(item.name)}
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
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeTabs;
