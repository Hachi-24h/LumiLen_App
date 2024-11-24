import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../Css/ImageDetail_Css";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";
const { width, height } = Dimensions.get("window");

const ImageDetailScreen = ({ route, navigation }) => {
  const { image } = route.params || {};

  if (!image) {
    console.error("Image data is undefined.");
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Error: No image data provided.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={{ fontSize: 16, color: "blue" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { uri, title, user } = image;
  const userAvatar = user?.avatar || "https://via.placeholder.com/150";
  const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";

  const [scrollY] = useState(new Animated.Value(0));
  const [relatedImages, setRelatedImages] = useState([]);

  useEffect(() => {
    const fetchRelatedImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}:5000/picture/getAllPictures`);
        const data = await response.json();
        const imagesWithSize = await convertDataWithSize(data);
        setRelatedImages(imagesWithSize);
      } catch (error) {
        console.error("Error fetching related images:", error);
      }
    };

    fetchRelatedImages();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const userInfoTranslateY = scrollY.interpolate({
    inputRange: [0, 50, 150],
    outputRange: [100, 60, -30], // Avatar xuất hiện hợp lý hơn, không quá cao.
    extrapolate: "clamp",
  });

  const userInfoOpacity = scrollY.interpolate({
    inputRange: [0, 50, 150],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const actionContainerTranslateY = scrollY.interpolate({
    inputRange: [0, 50, 150],
    outputRange: [0, 50, -30], // Nút chức năng di chuyển phù hợp với avatar.
    extrapolate: "clamp",
  });

  const { height: screenHeight } = Dimensions.get("window");

  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [screenHeight * 0.89, screenHeight * 0.3],
    extrapolate: "clamp",
  });

  const renderRelatedImage = ({ item }) => {
    const columnWidth = Dimensions.get("window").width / 2 - 15;
    const imageHeight = (item.height / item.width) * columnWidth;

    return (
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() =>
          navigation.navigate("ImageDetailScreen", {
            image: {
              uri: item.uri,
              title: item.title,
              user: {
                avatar: item.user?.avatar || "https://via.placeholder.com/150",
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
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.threeDotsButton}>
          <Ionicons name="ellipsis-horizontal" size={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Avatar và thông tin người dùng */}
      <Animated.View
        style={[
          styles.userInfo,
          {
            transform: [{ translateY: userInfoTranslateY }],
            opacity: userInfoOpacity,
            position: "absolute",
            top: 100,
            zIndex: 2,
          },
        ]}
      >
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Theo dõi</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Nội dung cuộn */}
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hình ảnh chính */}
        <Animated.Image
          source={{ uri }}
          style={[styles.image, { height: imageHeight }]}
        />

        {/* Các nút chức năng */}
        <Animated.View
          style={[
            styles.actionContainer,
            { transform: [{ translateY: actionContainerTranslateY }] },
          ]}
        >
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.buttonTextSave}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.buttonText}>Xem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#000" />
            <Text style={styles.iconText}>365</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Danh sách ảnh liên quan */}
        <View style={styles.relatedImagesContainer}>
          <FlatList
            data={relatedImages}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 10, // Khoảng cách giữa các hàng
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const imageWidth = width / 2 - 20; // Chia thành 2 cột
              const imageHeight =
                item.height && item.width
                  ? (item.height / item.width) * imageWidth
                  : 200; // Fallback nếu không có kích thước

              return (
                <View style={styles.imageWrapper}>
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
                        width: imageWidth,
                        height: imageHeight,
                        borderRadius: 10,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.footerContainer}>
                    <Image
                      source={{
                        uri:
                          item.user?.avatar ||
                          "https://via.placeholder.com/150",
                      }}
                      style={styles.footerIcon}
                    />
                    <Text style={styles.footerText} numberOfLines={1}>
                      {item.title || "Không có tiêu đề"}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default ImageDetailScreen;
