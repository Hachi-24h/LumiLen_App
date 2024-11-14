import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import MasonryList from "react-native-masonry-list";
import styles from "../../Css/Search_css";
import Footer from "../footer";
import { UserContext } from "../../Hook/UserContext";
import { convertDataWithSize } from "../../Hook/imageUtils";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const SPACING = 2;
const columnWidth = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

const Search = ({ navigation, route }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const {textinput} = route.params || "";
  const [searchText, setSearchText] = useState(textinput);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedIcon } = route.params || {};
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsLoading(true); // Bắt đầu loading
    setImages([]); // Xóa hình ảnh trước đó để đảm bảo mới mỗi lần tìm kiếm
    setNoResults(false); // Đặt lại trạng thái kết quả không có

    try {
      const response = await axios.post("http://192.168.0.100:5001/api/search_image", {
        keyword: searchText,
      });

      const fetchedImages = response.data.best_image_urls;
      if (fetchedImages.length > 0) {
        const imageUtils = await convertDataWithSize(fetchedImages);
        console.log("imageUtils", imageUtils);
        setImages(imageUtils);
        setNoResults(false);
      } else {
        setImages([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
      setNoResults(true);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    handleSearch();
  };

  const handleCancel = () => {
    setIsSearchActive(false);
    setSearchText("");
    setImages([]);
    setNoResults(false);
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} />

      {/* Search Bar */}
      
      <View style={styles.header}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={[
              styles.searchBar,
              isSearchActive ? styles.searchBarActive : null,
            ]}
            placeholder="Search for a project of any size"
            placeholderTextColor="#C4C4C4"
            value={searchText}
            onFocus={() => setIsSearchActive(true)}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSubmitEditing}
            returnKeyType="search"
          />
          {isSearchActive && (
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Hiển thị Modal loading */}
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Đang load ảnh, vui lòng chờ...</Text>
        </View>
      </Modal>

      {/* Hiển thị kết quả tìm kiếm hoặc các component mặc định */}
      {images.length > 0 ? (
       <View style={styles.imageList}>
       <MasonryList
         key={images.length}
         images={images.map((item) => ({
           source: { uri: item.uri },
           width: (item.width * columnWidth * 2) / item.width,
           height: (item.height * columnWidth * 2) / item.width,
         }))}
         columns={COLUMN_COUNT}
         spacing={SPACING}
         imageContainerStyle={styles.imageStyle}
         contentContainerStyle={{
           paddingBottom: 20, // thêm khoảng trống cuối danh sách
         }}
       />
     </View>
      ) : noResults ? (
        <Text style={styles.noResultsText}>Không có ảnh nào.</Text>
      ) : (
        <ScrollView style={styles.section} keyboardShouldPersistTaps="handled">
          {/* Nội dung mặc định */}
        </ScrollView>
      )}

      {!keyboardVisible && (
        <Footer
          navigation={navigation}
          avatar={avatar}
          initialSelectedIcon={selectedIcon}
          namePage={"Trang Tìm kiếm"}
        />
      )}
    </View>
  );
};

export default Search;
