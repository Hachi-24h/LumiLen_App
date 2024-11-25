import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  Platform
} from "react-native";
import Footer from "../footer";
import styles from "../../Css/Home_Css";
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2; // Số cột
const SPACING = 15; // Khoảng cách giữa các cột
const columnWidth = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

const HomeTabs = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;
  const [images, setImages] = useState([]); // Danh sách ảnh đầy đủ
  const [filteredImages, setFilteredImages] = useState([]); // Danh sách ảnh được lọc

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

  // Tạo dữ liệu từng cột để tạo hiệu ứng masonry
  const generateColumns = (data) => {
    const columns = Array.from({ length: COLUMN_COUNT }, () => []); // Tạo mảng số cột
    data.forEach((item, index) => {
      const columnIndex = index % COLUMN_COUNT; // Xác định ảnh thuộc cột nào
      columns[columnIndex].push(item);
    });
    return columns;
  };

  const handleMoreOptions = (item) => {
    Alert.alert(
      "Chọn hành động",
      null,
      [
        { text: "Tải xuống", onPress: () => handleDownload(item) },
        { text: "Ghim", onPress: () => handlePin(item) },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleDownload = async (item) => {
    try {
      // Kiểm tra quyền truy cập MediaLibrary
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Lỗi!", "Bạn cần cấp quyền truy cập thư viện để tải ảnh.");
        return;
      }
  
      // Tải ảnh về thư mục tạm
      const fileUri =
        FileSystem.cacheDirectory + `${item.title.replace(/\s+/g, "_")}.jpg`;
  
      const downloadResumable = FileSystem.createDownloadResumable(
        item.uri,
        fileUri
      );
      const { uri } = await downloadResumable.downloadAsync();
  
      // Lưu ảnh vào thư mục `Download`
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
  
      Alert.alert("Tải xuống thành công!", `Ảnh đã lưu vào thư mục Download.`);
    } catch (error) {
      Alert.alert("Tải xuống thất bại!", error.message);
      console.error(error);
    }
  };
  

  const handlePin = async (item) => {
    try {
      const response = await fetch(`${BASE_URL}:5000/user/addPictureToListAnhGhim/${userData._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pictureId: item._id }),
      });
  
      if (response.ok) {
        Alert.alert("Thành công!", "Ảnh đã được ghim.");
      } else {
        const errorData = await response.json();
        Alert.alert("Lỗi!", errorData.message || "Không thể ghim ảnh.");
      }
    } catch (error) {
      Alert.alert("Lỗi!", error.message);
    }
  };  

  // Hàm render từng cột
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
              key={`${item._id || "undefined"}-${index}`}
              style={styles.imageContainer}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ImageDetailScreen", {
                    dataAnh: item,
                  })
                }
              >
                {/* Ảnh */}
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

              {/* Footer bên dưới ảnh */}
              <View style={styles.footerContainer}>
                {/* Avatar */}
                <Image
                  source={{
                    uri: item.avatar || "https://via.placeholder.com/150", // Avatar của người đăng ảnh
                  }}
                  style={styles.footerIcon}
                />
                {/* Tiêu đề */}
                <Text style={styles.footerText} numberOfLines={1}>
                  {item.title || "Không có tiêu đề"}
                </Text>
                {/* Nút 3 chấm */}
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
    </View>
  );
};

export default HomeTabs;
