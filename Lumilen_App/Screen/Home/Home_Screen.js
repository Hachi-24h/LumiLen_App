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
} from "react-native";
import Footer from "../footer";
import styles from "../../Css/Home_Css";
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";

const { width, height } = Dimensions.get("window");
const COLUMN_COUNT = 2; // Số cột
const SPACING = 10; // Khoảng cách giữa các cột
const columnWidth = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

const HomeTabs = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null); // Avatar của user
  
  const [images, setImages] = useState([]); // Danh sách ảnh đầy đủ
  const [filteredImages, setFilteredImages] = useState([]); // Danh sách ảnh được lọc
  const [searchQuery, setSearchQuery] = useState(""); // Query tìm kiếm

  const userId = userData ? userData._id : null;

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

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      const data = await fetchDataFromAPI();
      const imagesWithSize = await convertDataWithSize(data);
      console.log("Images with size:", imagesWithSize[0]);
      setImages(imagesWithSize);
      setFilteredImages(imagesWithSize); // Khởi tạo `filteredImages` với toàn bộ ảnh ban đầu
    };

    fetchAndConvertImages();
  }, [userId]);

  // Hàm lấy thông tin user dựa trên userID
  const fetchUser = async (userID) => {
    try {
      const response = await fetch(`${BASE_URL}:5000/user/findUserById/${userID}`);
      if (response.ok) {
        const userData = await response.json();
        return userData.avatar; // Lấy avatar từ thông tin user
      } else {
        console.error("Error fetching user:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId).then((avatar) => setAvatar(avatar));
    }
  }, [userId]);

  // Tạo dữ liệu từng cột để tạo hiệu ứng masonry
  const generateColumns = (data) => {
    const columns = Array.from({ length: COLUMN_COUNT }, () => []); // Tạo mảng số cột
    data.forEach((item, index) => {
      const columnIndex = index % COLUMN_COUNT; // Xác định ảnh thuộc cột nào
      columns[columnIndex].push(item);
    });
    return columns;
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
                    uri: avatar || "https://via.placeholder.com/150", // Avatar mặc định nếu không có
                  }}
                  style={styles.footerIcon}
                />
                {/* Tiêu đề */}
                <Text style={styles.footerText} numberOfLines={1}>
                  {item.title || "Không có tiêu đề"}
                </Text>
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
      <Footer navigation={navigation} avatar={avatar} namePage={"Trang Ghim"} />
    </View>
  );
};

export default HomeTabs;
