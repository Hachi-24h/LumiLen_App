import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import MasonryList from "react-native-masonry-list";
import Footer from "../footer";
import styles from "../../Css/Info_Ghim_Css";
import { UserContext } from "../../Hook/UserContext";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";

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
  // xử lí hiển thị ảnh
  const [viewMode, setViewMode] = useState(2);

  const { width, height } = Dimensions.get("window");
  const SPACING = 10; // Khoảng cách giữa các cột
  const columnWidth = (width - (viewMode + 1) * SPACING) / viewMode;
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị Modal
  // Tạo dữ liệu cho từng cột
  const generateColumns = (data) => {
    const columns = Array.from({ length: viewMode }, () => []);
    data.forEach((item, index) => {
      const columnIndex = index % viewMode; // Phân bố ảnh vào các cột
      columns[columnIndex].push(item);
    });
    return columns;
  };

  // Render từng cột ảnh
  const renderColumn = (columnData, columnIndex) => (
    <View
      key={`column-${columnIndex}`}
      style={{ flex: 1, paddingHorizontal: width * 0.01 }}
    >
      {columnData.map((item, index) => {
        const imageHeight = (item.height / item.width) * columnWidth;
        return (
          <View key={`${item.id}-${index}`} style={styles.imageContainer}>
            {/* {console.log("item", item)} */}
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

                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
  const updateViewMode = (mode) => {
    setViewMode(mode);
    setModalVisible(false);
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
            <Text style={styles.headerTitle2}>Bảng</Text>
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
          onPress={() => setModalVisible(true)}
          style={styles.navtouch}
        >
          <Image
            source={
              viewMode === 1
                ? require("../../Icon/1x1.png")
                : viewMode === 2
                ? require("../../Icon/2x2.png")
                : require("../../Icon/3x3.png")
            }
            style={styles.imgHeader3}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              borderWidth: selectItem === "Tất cả" ? 2 : 1,
              // borderColor: selectItem === "Tất cả" ? "red" : "black",
            },
          ]}
          onPress={() => setSelectItem("Tất cả")}
        >
          <Text
            style={[
              styles.filterText,
              { fontWeight: selectItem === "Tất cả" ? "bold" : "normal" },
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              borderWidth: selectItem === "Bản Thân" ? 2 : 1,
              // borderColor: selectItem === "Bản Thân" ? "red" : "black",
            },
          ]}
          onPress={() => setSelectItem("Bản Thân")}
        >
          <Text
            style={[
              styles.filterText,
              { fontWeight: selectItem === "Bản Thân" ? "bold" : "normal" },
            ]}
          >
            Bản Thân
          </Text>
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
            <FlatList
              data={generateColumns(images)} // Chia ảnh thành các cột
              renderItem={({ item, index }) => renderColumn(item, index)} // Render từng cột
              key={viewMode} // Buộc FlatList render lại khi số cột thay đổi
              numColumns={viewMode}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
              showsVerticalScrollIndicator={false}
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
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() =>
                    navigation.navigate(
                      "AddGhim",
                      { userId },
                      setCreateModalVisible(false)
                    )
                  }
                >
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Đóng modal khi nhấn nút back (Android)
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)} // Tắt modal khi bấm ra ngoài
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chế độ xem</Text>
                <Pressable style={styles.modalChoose}>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => updateViewMode(3)}
                  >
                    <Text
                      style={
                        viewMode === 3
                          ? styles.modalOptionActive
                          : styles.modalOptionText
                      }
                    >
                      Thu nhỏ
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => updateViewMode(2)}
                  >
                    <Text
                      style={
                        viewMode === 2
                          ? styles.modalOptionActive
                          : styles.modalOptionText
                      }
                    >
                      Mặc định
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => updateViewMode(1)}
                  >
                    <Text
                      style={
                        viewMode === 1
                          ? styles.modalOptionActive
                          : styles.modalOptionText
                      }
                    >
                      Rộng
                    </Text>
                  </Pressable>
                </Pressable>

                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseText}>Đóng</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default InfoScreen;
