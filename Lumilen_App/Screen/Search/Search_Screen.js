import React, { useState, useContext, useEffect, useRef } from "react";
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
import Footer from "../Other/footer";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from "../../config/IpAdress";
import { UserContext } from "../../Hook/UserContext";
import { convertDataWithSize } from "../../Hook/imageUtils";
import MasonryList from "react-native-masonry-list";
const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const SPACING = 2;
const columnWidth = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;
const Search = ({ navigation }) => {
  const bannerRef = useRef(null);
  const [currentView, setCurrentView] = useState("default");
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [listHistoryText, setListHistoryText] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [userList, setUserList] = useState([]); // Thêm state này để lưu danh sách người dùng tìm được
  const { userData } = useContext(UserContext);
  const userId = userData ? userData._id : null;
  const avatar = userData ? userData.avatar : null;

  const bannerImages = [
    "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
    "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
    "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
    "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
  ];

  const imageLists = [
    {
      title: "Lời trích về cuộc sống",
      images: [
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
      ],
    },
    {
      title: "Hình về cute",
      images: [
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",

        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",

        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
      ],
    },
    {
      title: "Avatar đôi",
      images: [
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
      ],
    },
    {
      title: "Ảnh bầu trời đêm",
      images: [
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
        "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
      ],
    },
  ];

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

    // Kiểm tra nếu chuỗi tìm kiếm bắt đầu bằng '@', tìm người dùng
    if (searchText.trim().startsWith("@")) {
      const userName = searchText.trim().substring(1); // Lấy tên người dùng từ chuỗi (bỏ dấu '@')
      // console.log("Searching for user:", userName);
      try {
        const response = await axios.get(
          `${BASE_URL}:5000/user/findUserByIdUser`,
          {
            params: { idUser: userName }, // Truyền idUser là tên người dùng
          }
        );

        const user = response.data;

        if (user) {
          setUserList([user]); // Lưu người dùng vào state userList
          setImages([]); // Không hiển thị ảnh nữa
          setNoResults(false);
        } else {
          setUserList([]); // Không tìm thấy người dùng
          setNoResults(true);
        }
      } catch (err) {
        // console.error(
        //   "Error searching for user:",
        //   err.message || "Unknown error"
        // );
        setUserList([]); // Xử lý khi có lỗi
        setNoResults(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Xử lý tìm kiếm ảnh như cũ nếu không phải tìm người dùng
      try {
        // Gọi API tìm kiếm ảnh
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
      } catch (err) {
        console.error("Error searching:", err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
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

  const renderSearchResults = () => {
    const userListData = userList[0]; // Truy cập mảng con bên trong userList  
    // Kiểm tra mảng con trong userList
    if (!Array.isArray(userListData) || userListData.length === 0) {
      return (
        <Text style={styles.noResultsText}>Không tìm thấy người dùng nào.</Text>
      );
    }
  
    return (
      <FlatList
        data={userListData}  // Truyền dữ liệu đã được xử lý
        keyExtractor={(item) => item.id + "" + item.idUser}  // Tạo key duy nhất
        renderItem={({ item, index }) => {
          // console.log(`Rendering item ${index}: ${item.firstName} ${item.lastName}, avatar URL: ${item.avatar}`);
  
          return (
            <TouchableOpacity style={styles.userItem}>
              <View style={styles.imageContainer}>
               
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.imageStyle} />
                ) : (
                  <Text>No Avatar</Text> 
                )}
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.userID}>{item.idUser}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerRef.current) {
        const nextIndex = (currentBannerIndex + 1) % bannerImages.length; // Chuyển sang ảnh tiếp theo hoặc quay lại đầu
        bannerRef.current.scrollToIndex({ index: nextIndex });
        setCurrentBannerIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval); // Xóa interval khi component bị hủy
  }, [currentBannerIndex]);

  // Hàm xử lý khi lướt banner thủ công
  const handleBannerScroll = (event) => {
    if (!event.nativeEvent || !event.nativeEvent.contentOffset) {
      console.error("Event or contentOffset is undefined");
      return;
    }

    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.floor(scrollPosition / width);

    // Nếu đến ảnh cuối cùng thì quay lại đầu
    if (currentIndex === bannerImages.length - 1) {
      setTimeout(() => {
        bannerRef.current.scrollToIndex({ index: 0, animated: false });
        setCurrentBannerIndex(0);
      }, 300);
    } else if (
      currentIndex === 0 &&
      currentBannerIndex === bannerImages.length - 1
    ) {
      // Nếu đang từ cuối lướt ngược về đầu
      setTimeout(() => {
        bannerRef.current.scrollToIndex({
          index: bannerImages.length - 1,
          animated: false,
        });
        setCurrentBannerIndex(bannerImages.length - 1);
      }, 300);
    } else {
      setCurrentBannerIndex(currentIndex);
    }
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
            {/* Banner tự động trượt */}
            <View style={styles.bannerContainer}>
              <FlatList
                data={bannerImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.bannerImage} />
                )}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={handleBannerScroll} // Lắng nghe sự kiện cuộn hoàn thành
                ref={(ref) => (bannerRef.current = ref)} // Lưu tham chiếu FlatList để điều khiển cuộn
              />

              {/* Chấm tròn chỉ số banner */}
              <View style={styles.dotContainer}>
                {bannerImages.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          currentBannerIndex === index ? "#333" : "#ccc",
                      },
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Danh sách ảnh */}
            <View>
              {imageLists.map((list, index) => (
                <View key={index} style={styles.listContainer}>
                  <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>{list.title}</Text>
                    <TouchableOpacity>
                      <Text style={styles.seeMore}>Xem thêm</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={list.images}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Image source={{ uri: item }} style={styles.listImage} />
                    )}
                    keyExtractor={(item, idx) => `${index}-${idx}`}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
        {currentView === "searching" && (
          <ScrollView>{renderHistoryText()}</ScrollView>
        )}
        {currentView === "results" && (
          <>
            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              renderSearchResults() // Gọi hàm renderSearchResults để hiển thị kết quả người dùng
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
