import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import Footer from "../footer";
import { UserContext } from "../../Hook/UserContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../Css/ImageDetail_Css";
import BASE_URL from "../../IpAdress";
import { convertDataWithSize } from "../../Hook/imageUtils";

const { width, height } = Dimensions.get("window");

const ImageDetailScreen = ({ route, navigation }) => {
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [isFollowing, setIsFollowing] = useState(false); // Trạng thái theo dõi
  const [followersCount, setFollowersCount] = useState(0); // Số lượng người theo dõi
  const dataAnh = route.params.dataAnh;
  const userID = dataAnh.userId; // Lấy userID từ dữ liệu ảnh
  const [relatedImages, setRelatedImages] = useState([]); // Lưu danh sách ảnh liên quan
  const uriImage = dataAnh.uri; // Lấy URI của ảnh chính
  const title = dataAnh.title; // Lấy tiêu đề ảnh chính

  // Lấy thông tin người dùng đăng ảnh chính
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}:5000/user/findUserById/${userID}`
        );
        const userData = await response.json();
        if (response.ok) {
          setUser(userData); // Lưu thông tin người dùng vào state
          setFollowersCount(userData.followers.length); // Cập nhật số lượng người theo dõi
          setIsFollowing(userData.followers.includes(userData._id)); // Cập nhật trạng thái "Follow"
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

        const imagesWithUser = await Promise.all(
          imagesWithSize.map(async (image) => {
            try {
              const userResponse = await fetch(
                `${BASE_URL}:5000/user/findUserById/${image.userId}`
              );
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
              console.error(
                `Error fetching user for image ${image._id}:`,
                error.message
              );
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
      const currentUserId = userData._id; // ID của người dùng hiện tại

      // Cập nhật trạng thái follow
      const updatedUser = { ...user };
      if (updatedUser.followers.includes(currentUserId)) {
        updatedUser.followers = updatedUser.followers.filter(
          (id) => id !== currentUserId
        );
      } else {
        updatedUser.followers.push(currentUserId);
      }

      setUser(updatedUser);
      setIsFollowing(!isFollowing); // Cập nhật trạng thái "Follow"
      setFollowersCount(updatedUser.followers.length); // Cập nhật số lượng followers

      // Gửi yêu cầu lên server để cập nhật
      await fetch(`${BASE_URL}:5000/users/addFollower/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId: currentUserId }),
      });
    } catch (error) {
      console.error("Error updating followers:", error.message);
      Alert.alert("Lỗi", "Không thể thực hiện hành động này.");
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
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ImageDetailScreen", {
              dataAnh: item,
            })
          }
        >
          <Image
            source={{ uri: item.uri }}
            style={{
              width: columnWidth,
              height: imageHeight,
              borderRadius: width * 0.05,
              resizeMode: "contain",
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
    <View style={styles.container}>
      {/* Nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[{ key: "mainContent" }, ...relatedImages]}
        renderItem={({ item }) => {
          if (item.key === "mainContent") {
            return (
              <View>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: uriImage }}
                      style={{
                        width: width, // Full chiều ngang màn hình
                        height: (dataAnh.height / dataAnh.width) * width, // Chiều cao dựa trên tỷ lệ gốc
                        resizeMode: "cover", // Giữ đúng tỷ lệ
                      }}
                    />
                  </View>
                </View>

                {/* Avatar và thông tin người dùng */}
                <View style={styles.userInfoContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: userAvatar }} style={styles.avatar} />
                    <View>
                      <Text style={styles.userName}>{userName}</Text>
                      <Text style={styles.followerCount}>
                        {`${followersCount} người theo dõi`}
                      </Text>
                    </View>
                  </View>

                  {/* Nút Theo dõi */}
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={handleFollowUser}
                  >
                    <Text style={styles.followButtonText}>
                      {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
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
          paddingHorizontal: 0,
          marginHorizontal: 0,
        }}
        showsVerticalScrollIndicator={false}
      />
      <Footer
        navigation={navigation}
        avatar={avatar}
        initialSelectedIcon={"HomeTabs"}
        namePage={"Trang Home"}
      />
    </View>
  );
};

export default ImageDetailScreen;
