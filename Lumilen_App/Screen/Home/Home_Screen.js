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
  const avatar = userData ? userData.avatar : null;

  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      setImages(imagesWithSize);
      setFilteredImages(imagesWithSize); // Khởi tạo `filteredImages` với toàn bộ ảnh ban đầu
    };

    fetchAndConvertImages();
  }, [userId]);

  // Tạo dữ liệu từng cột để tạo hiệu ứng masonry
  const generateColumns = (data) => {
    const columns = Array.from({ length: COLUMN_COUNT }, () => []);
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

          // Lấy thông tin user và tiêu đề
          const user = item.id || {
            avatar: "",
            firstName: "Unknown",
            lastName: "",
          };
          const title = item.title || `${user.firstName} ${user.lastName}`;

          return (
            <View
              key={`${item._id || "undefined"}-${index}`}
              style={styles.imageContainer}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ImageDetailScreen", {
                    image: {
                      uri: item.uri,
                      title: item.title,
                      user: {
                        avatar:
                          item.user?.avatar ||
                          "https://via.placeholder.com/150",
                        firstName: item.user?.firstName || "Unknown",
                        lastName: item.user?.lastName || "User",
                      },
                    },
                  })
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

              {/* Footer bên dưới ảnh */}
              <View style={styles.footerContainer}>
                <Image
                  source={{
                    uri: user.avatar || "https://via.placeholder.com/150",
                  }}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText}>{title}</Text>
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
            // height :height*0.8,
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
