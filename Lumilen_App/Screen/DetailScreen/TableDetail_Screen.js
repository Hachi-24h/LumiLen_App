import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import styles from "./../../Css/TableDetail_css"; // File CSS riêng
import BASE_URL from "../../config/IpAdress"; // Địa chỉ API
import { convertDataWithSize } from "../../Hook/imageUtils"; // Hàm xử lý kích thước ảnh

const { height, width } = Dimensions.get("window");
const SPACING = 10; // Khoảng cách giữa các cột

const GalleryScreen = ({ navigation, route }) => {
  const [viewMode, setViewMode] = useState(2); // Mặc định là 2 cột
  const [images, setImages] = useState([]); // Danh sách ảnh từ API
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const tableId = route.params.tableId;
  const userId = route.params.userId;
  const [nameTable, setNameTable] = useState("");
  const [qualityPicture, setQualityPicture] = useState(0);

  //   console.log("tableId", tableId ,"\nuserId", userId);

  const fetchAPIDataTableuser = async () => {
    try {
      const linkapi = `${BASE_URL}:5000/tableUser/getTableUserbyUser/${userId}/${tableId}`;
      // console.log("linkapi", linkapi);
      const response = await fetch(linkapi);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Full Table Users Data:", data); // Hiển thị dữ liệu đầy đủ
      return data;
    } catch (error) {
      console.error("Error fetching table users:", error);
    }
  };

  const changedata = async () => {
    try {
      const data = await fetchAPIDataTableuser(); // Chờ dữ liệu từ API
      if (data) {
        setNameTable(data.name);
        if (data.listAnh) {
          const imagesWithSize = await convertDataWithSize(data.listAnh);
          setQualityPicture(imagesWithSize.length);
          setImages(imagesWithSize);
        }
      }
    } catch (error) {
      console.error("Error change data :", error);
    }
  };

  useEffect(() => {
    changedata();
  }, [tableId]);

  const columnWidth = (width - (viewMode + 1) * SPACING) / viewMode;

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
      style={{ flex: 1, marginHorizontal: SPACING / 2 }}
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

  // Cập nhật số cột và đóng Modal
  const updateViewMode = (mode) => {
    setViewMode(mode);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../Icon/back.png")}
            style={styles.imgHeader}
          />
        </TouchableOpacity>
        <Text style={styles.txtheader}>{nameTable}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../Icon/share.png")}
            style={styles.imgHeader2}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Nav}>
        <Text style={styles.NavText}>{`Có tất cả ${qualityPicture} ghim`}</Text>
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
      </View>
     
      <FlatList
        data={generateColumns(images)} // Chia ảnh thành các cột
        renderItem={({ item, index }) => renderColumn(item, index)} // Render từng cột
        key={viewMode} // Buộc FlatList render lại khi số cột thay đổi
        numColumns={viewMode}
        contentContainerStyle={{
          padding: SPACING,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
      {/* Modal Chọn Chế Độ Hiển Thị */}
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

export default GalleryScreen;
