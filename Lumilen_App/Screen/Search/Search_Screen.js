import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import axios from "axios";
import styles from "../../Css/Search_css";
import Footer from "../../Screen/footer";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from "../../IpAdress";
import { UserContext } from "../../Hook/UserContext";
import { convertDataWithSize } from "../../Hook/imageUtils";
import MasonryList from "react-native-masonry-list";
const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const SPACING = 2;
const columnWidth = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;
const Search = ({ navigation }) => {
  const [currentView, setCurrentView] = useState("default");
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [listHistoryText, setListHistoryText] = useState([]);
  const { userData } = useContext(UserContext);
  const userId = userData ? userData._id : null;
  const avatar = userData ? userData.avatar : null;

  // Fetch history text
  useEffect(() => {
    const fetchHistoryText = async () => {
      if (!userId) return;

      try {
        const { data } = await axios.get(
          `${BASE_URL}:5000/user/getUserHistory/${userId}`
        );
        setListHistoryText(data.historyText || []);
      } catch (err) {
        console.error("API Error:", err.message || "Unknown error");
      }
    };

    fetchHistoryText();
  }, [userId]);

  // Handle delete history text
  const handleDeleteHistoryText = async (text) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}:5000/user/deleteHistoryText`,
        {
          data: { id: userId, text },
        }
      );
      setListHistoryText(data.historyText || []);
    } catch (err) {
      console.error(
        "Error deleting history text:",
        err.message || "Unknown error"
      );
    }
  };

  // Handle direct search for history text
  const handleDirectSearch = async (text) => {
    setSearchText(text);
    setIsLoading(true);
    setCurrentView("results");

    try {
      // Gọi API tìm kiếm với text
      const response = await axios.post(`${BASE_URL}:5001/api/search_image`, {
        keyword: text,
      });

      const fetchedImages = response.data.best_image_urls;
      if (fetchedImages.length > 0) {
        setImages(await convertDataWithSize(fetchedImages));
        setNoResults(false);
      } else {
        setImages([]);
        setNoResults(true);
      }
    } catch (err) {
      console.error("Error fetching images:", err.message || "Unknown error");
      setImages([]);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search and add history
  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsLoading(true);
    setCurrentView("results");

    try {
      // Thêm từ khóa vào lịch sử
      await axios.post(`${BASE_URL}:5000/user/addHistoryText`, {
        id: userId,
        text: searchText,
      });

      // Gọi API tìm kiếm
      const response = await axios.post(`${BASE_URL}:5001/api/search_image`, {
        keyword: searchText,
      });

      const fetchedImages = response.data.best_image_urls;
      if (fetchedImages.length > 0) {
        setImages(await convertDataWithSize(fetchedImages));
        setNoResults(false);
      } else {
        setImages([]);
        setNoResults(true);
      }

      // Cập nhật lịch sử
      const { data } = await axios.get(
        `${BASE_URL}:5000/user/getUserHistory/${userId}`
      );
      setListHistoryText(data.historyText || []);
    } catch (err) {
      console.error("Error searching:", err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const renderHistoryText = () => {
    return listHistoryText.map((text, index) => (
      <View style={styles.historyRow} key={`${text}-${index}`}>
        {/* Icon tìm kiếm và nội dung */}
        <TouchableOpacity
          style={styles.historyItem}
          onPress={() => handleDirectSearch(text)} // Tìm kiếm trực tiếp
        >
          <Image
            source={require("../../Icon/search.png")}
            style={styles.iconSearch}
          />
          <Text style={styles.historyText}>{text}</Text>
        </TouchableOpacity>

        {/* Icon xóa */}
        <TouchableOpacity onPress={() => handleDeleteHistoryText(text)}>
          <Ionicons name="close" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    ));
  };

  const handleCancel = () => {
    setCurrentView("default");
    setSearchText("");
    setImages([]);
    setNoResults(false);
    Keyboard.dismiss();
  };

  const handleBackToDefault = () => {
    setCurrentView("default");
    setSearchText("");
    setImages([]);
    setNoResults(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentView === "results" && (
          <TouchableOpacity
            onPress={handleBackToDefault}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm ý tưởng"
          value={searchText}
          onFocus={() => setCurrentView("searching")}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {currentView === "searching" && (
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.body}>
        {currentView === "default" && (
          <ScrollView>
            <Text style={styles.defaultText}>
              Đây là nội dung trang chính, hiển thị gợi ý theo yêu cầu.
            </Text>
          </ScrollView>
        )}
        {currentView === "searching" && (
          <ScrollView>{renderHistoryText()}</ScrollView>
        )}
        {currentView === "results" && (
          <>
            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : noResults ? (
              <Text style={styles.noResultsText}>Không có ảnh nào.</Text>
            ) : (
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
                />
              </View>
            )}
          </>
        )}
      </View>

      <Footer
        navigation={navigation}
        avatar={avatar}
        initialSelectedIcon={"Search"}
        namePage={"Trang tìm kiếm"}
      />
    </View>
  );
};

export default Search;
