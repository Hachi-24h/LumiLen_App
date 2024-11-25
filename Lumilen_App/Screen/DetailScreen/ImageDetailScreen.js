import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../Css/ImageDetail_Css";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";

const { width, height } = Dimensions.get("window");

const ImageDetailScreen = ({ route, navigation }) => {
  const dataAnh = {
    height: 500,
    id: "672cca496f8ff39a0e729048",
    title: "Một ngày trong xanh",
    uri: "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730987883/DataPicture/jtj1vu4bzsb9vsv6gpy6.jpg",
    userId: "672cd1f6ea6637803a6b8424",
    width: 500,
  };

  const userID = dataAnh.userId; // Lấy userID từ dữ liệu ảnh chính
  const [user, setUser] = useState(null); // Lưu thông tin người dùng đăng ảnh chính
  const [relatedImages, setRelatedImages] = useState([]); // Lưu danh sách ảnh liên quan
  const uriImage = dataAnh.uri; // Lấy URI của ảnh chính
  const title = dataAnh.title; // Lấy tiêu đề ảnh chính

  // Lấy thông tin người dùng đăng ảnh chính
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}:5000/user/findUserById/${userID}`);
        const userData = await response.json();

        if (response.ok) {
          setUser(userData); // Lưu thông tin người dùng vào state
        } else {
          console.error("Error fetching user:", userData.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUser();
  }, [userID]);

  // Lấy danh sách ảnh liên quan và thông tin user của từng ảnh
  useEffect(() => {
    const fetchRelatedImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}:5000/picture/getAllPictures`);
        const data = await response.json();

        const imagesWithSize = await convertDataWithSize(data);

        // Gắn thông tin user vào từng ảnh
        const imagesWithUser = await Promise.all(
          imagesWithSize.map(async (image) => {
            try {
              const userResponse = await fetch(`${BASE_URL}:5000/user/findUserById/${image.userId}`);
              const userData = await userResponse.json();

              return {
                ...image,
                user: {
                  avatar: userData.avatar || "https://via.placeholder.com/150",
                  firstName: userData.firstName || "Unknown",
                  lastName: userData.lastName || "User",
                },
              };
            } catch (error) {
              console.error(`Error fetching user for image ${image._id}:`, error.message);
              return {
                ...image,
                user: {
                  avatar: "https://via.placeholder.com/150",
                  firstName: "Unknown",
                  lastName: "User",
                },
              };
            }
          })
        );

        setRelatedImages(imagesWithUser);
      } catch (error) {
        console.error("Error fetching related images:", error.message);
      }
    };

    fetchRelatedImages();
  }, []);

  // Hàm xử lý nút theo dõi
  const handleFollowUser = async () => {
    try {
      if (!user) return;
      const updatedUser = { ...user };
      const currentUserId = "currentUserId"; // ID người dùng hiện tại

      // Cập nhật trạng thái follow
      if (updatedUser.followers.includes(currentUserId)) {
        updatedUser.followers = updatedUser.followers.filter(
          (id) => id !== currentUserId
        );
      } else {
        updatedUser.followers.push(currentUserId);
      }

      setUser(updatedUser);

      // Gửi yêu cầu lên server
      await fetch(`${BASE_URL}:5000/users/addFollower/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId: currentUserId }),
      });
    } catch (error) {
      console.error("Error updating followers:", error.message);
    }
  };

  // Hiển thị avatar và tên người dùng của ảnh chính
  const userAvatar = user?.avatar || "https://via.placeholder.com/150";
  const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";

  const COLUMN_COUNT = 2;
  const SPACING = 10;
  const columnWidth = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

  const renderRelatedImage = ({ item }) => {
    const imageHeight = (item.height / item.width) * columnWidth;

    return (
      <View
        style={{
          flex: 1,
          marginBottom: SPACING,
          marginHorizontal: SPACING / 2,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ImageDetailScreen", {
              image: item,
            })
          }
        >
          <Image
            source={{ uri: item.uri }}
            style={{
              width: columnWidth,
              height: imageHeight,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Image
            source={{ uri: item.user?.avatar }}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText} numberOfLines={1}>
            {item.title || "Không có tiêu đề"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={[{ key: "mainContent" }, ...relatedImages]}
      renderItem={({ item }) => {
        if (item.key === "mainContent") {
          return (
            <View>
              {/* Hình ảnh chính */}
              <Image
                source={{ uri: uriImage }}
                style={{
                  width: width,
                  height: height * 0.5,
                  resizeMode: "cover",
                }}
              />

              {/* Avatar và thông tin người dùng */}
              <View style={styles.userInfoContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={{ uri: userAvatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.followerCount}>
                      {`${user?.followers?.length || 0} người theo dõi`}
                    </Text>
                  </View>
                </View>

                {/* Nút Theo dõi */}
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={handleFollowUser}
                >
                  <Text style={styles.followButtonText}>
                    {user?.followers?.includes("currentUserId")
                      ? "Bỏ theo dõi"
                      : "Theo dõi"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Các nút chức năng */}
              <View style={styles.actionContainer}>
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
              </View>
            </View>
          );
        } else {
          return renderRelatedImage({ item });
        }
      }}
      keyExtractor={(item, index) => item.key || `related-${index}`}
      numColumns={COLUMN_COUNT}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{
        padding: SPACING,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ImageDetailScreen;
