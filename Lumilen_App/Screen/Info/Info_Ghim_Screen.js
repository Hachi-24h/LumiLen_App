import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import MasonryList from "react-native-masonry-list";
import Footer from "../footer";
import styles from "../../Css/Info_Ghim_Css";

const { width } = Dimensions.get("window");

// Dữ liệu ảnh gốc với các kích thước đã cung cấp
const imageData = [
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 800,
    height: 600,
  },
  {
    id: 2,
    source: require("../../Picture/image_1.png"),
    width: 600,
    height: 400,
  },
  {
    id: 3,
    source: require("../../Picture/image_1.png"),
    width: 440,
    height: 400,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 800,
    height: 600,
  },
  {
    id: 2,
    source: require("../../Picture/image_1.png"),
    width: 600,
    height: 400,
  },
  {
    id: 3,
    source: require("../../Picture/image_1.png"),
    width: 550,
    height: 400,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 440,
    height: 400,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 3,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 800,
    height: 600,
  },
  {
    id: 2,
    source: require("../../Picture/image_1.png"),
    width: 600,
    height: 400,
  },
  {
    id: 3,
    source: require("../../Picture/image_1.png"),
    width: 430,
    height: 400,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 3,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 800,
    height: 600,
  },
  {
    id: 2,
    source: require("../../Picture/image_1.png"),
    width: 600,
    height: 400,
  },
  {
    id: 3,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 4,
    source: require("../../Picture/image_1.png"),
    width: 760,
    height: 400,
  },
  {
    id: 5,
    source: require("../../Picture/image_1.png"),
    width: 300,
    height: 600,
  },
];

// Tính toán chiều rộng của mỗi cột
const COLUMN_COUNT = 3; // Số cột mong muốn
const SPACING = 2; // Khoảng cách giữa các ảnh
const columnWidth = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT; // Tính chiều rộng mỗi cột sao cho khít nhau

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountSetting")}
          >
            <Image
              source={require("../../Icon/mess_check.png")}
              style={styles.profileImage}
            />
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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Tìm Ghim của bạn" />
      </View>

      {/* Masonry List for Images */}
      <View style={styles.imageList}>
        <MasonryList
          images={imageData.map((item) => ({
            source: item.source,
            width: (item.width * columnWidth * 2) / item.width, // Phóng to ảnh 1.5 lần
            height: (item.height * columnWidth * 2) / item.width, // Tính chiều cao tương ứng để giữ tỉ lệ ảnh
          }))}
          columns={COLUMN_COUNT} // Số cột
          spacing={SPACING} // Khoảng cách giữa các ảnh
          imageContainerStyle={styles.imageStyle}
        />
      </View>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

export default InfoScreen;
