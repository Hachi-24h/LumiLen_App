import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar, Modal,
} from "react-native";
import MasonryList from "react-native-masonry-list";
import Footer from "../footer";
import styles from "../../Css/Info_Ghim_Css";
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";

// Usage example
// const processedImages = await convertDataWithSize(data);


const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const SPACING = 2;
const columnWidth = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

const InfoScreen = ({ navigation, route }) => {
  const { selectedIcon } = route.params || {};
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;

  const [selectItem, setSelectItem] = useState("Tất cả");
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = userData ? userData._id : null;
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  // Hàm lấy dữ liệu từ API
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}:5000/picture/getUserImages?userId=${userId}`
      );
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
      setFilteredImages(filteredImages); // Khởi tạo `filteredImages` với toàn bộ ảnh ban đầu
    };

    fetchAndConvertImages();
  }, [selectItem, userId]);

  // Hàm tìm kiếm và cập nhật `filteredImages`
  const handleSearch = (text) => {
    setSearchQuery(text);

    // Lọc `images` dựa trên `searchQuery`
    const filtered = images.filter((img) =>
      img.title.toLowerCase().includes(text.toLowerCase().trim())
    );
    setFilteredImages(filtered);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.TouchableOpacitystyle}
            onPress={() => navigation.navigate("AccountSetting")}
          >
            <Image source={{ uri: avatar }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <TouchableOpacity onPress={() => navigation.navigate("Info_Ghim")}>
            <Text style={[styles.headerTitle, styles.activeTab]}>Ghim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Info_Bang")}>
            <Text style={styles.headerTitle}>Bảng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setCreateModalVisible(true)}>
            <Image
              source={require("../../Icon/add.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Nhập tiêu đề của của bạn cần tìm nhé!"
          value={searchQuery}
          onChangeText={(text) => handleSearch(text.trim())}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              borderWidth: selectItem === "Tất cả" ? 2 : 1,
              borderColor: selectItem === "Tất cả" ? "red" : "black",
            },
          ]}
          onPress={() => setSelectItem("Tất cả")}
        >
          <Text style={styles.filterText}>Tất cả</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              borderWidth: selectItem === "Bản Thân" ? 2 : 1,
              borderColor: selectItem === "Bản Thân" ? "red" : "black",
            },
          ]}
          onPress={() => setSelectItem("Bản Thân")}
        >
          <Text style={styles.filterText}>Bản Thân</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ListTab}>
        {filteredImages.length === 0 ? (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>
              {searchQuery
                ? "Oh no! Không có ảnh nào như bạn tìm rồi! Hic hic"
                : selectItem === "Tất cả"
                ? "Ảnh của bạn Ghim sẽ được lưu tại đây nhé - đi tới trang chủ nào"
                : "Oh No! Bạn chưa có ảnh nào tải lên, hãy đi tải lên nào"}
            </Text>
          </View>
        ) : (
          <View style={styles.imageList}>
            <MasonryList
              key={filteredImages.length}
              images={filteredImages.map((item) => ({
                source: { uri: item.uri },
                width: (item.width * columnWidth * 2) / item.width,
                height: (item.height * columnWidth * 2) / item.width,
              }))}
              columns={COLUMN_COUNT}
              spacing={SPACING}
              imageContainerStyle={styles.imageStyle}
            />
          </View>
        )}
      </View>
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.createModalContent}>
            <TouchableOpacity
              onPress={() => setCreateModalVisible(false)}
              style={styles.closeButton}
            >
              <Image
                source={require("../../Icon/cancel.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.createModalTitle}>Bắt đầu tạo ngay</Text>
            </TouchableOpacity>

            <View style={styles.createOptions}>
              <View style={{ marginBottom: 20, alignItems: "center" }}>
                <TouchableOpacity style={styles.optionButton}>
                  <Image
                    source={require("../../Icon/upload.png")}
                    style={styles.optionIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.optionText}>Ghim</Text>
              </View>

              <View style={{ marginBottom: 20, alignItems: "center" }}>
                <TouchableOpacity style={styles.optionButton}>
                  <Image
                    source={require("../../Icon/abum.png")}
                    style={styles.optionIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.optionText}>Bảng</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Footer
        navigation={navigation}
        avatar={avatar}
        initialSelectedIcon={"account"}
        namePage={"Trang Ghim"}
      />
    </View>
  );
};

export default InfoScreen;
