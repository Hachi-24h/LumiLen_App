import React, { useEffect, useState ,useContext} from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import BASE_URL from "./IpAdress";
import { UserContext } from "./Hook/UserContext";
const TableUserListScreen = () => {
  const [images, setImages] = useState([]);
    
  const userId = "672cd1f6ea6637803a6b8424"

  useEffect(() => {
    // Hàm lấy dữ liệu từ API
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/picture/getUserImages?userId=${userId}`);
        const data = await response.json();

        // Dùng Promise.all để đợi tất cả các ảnh có kích thước trước khi setImages
        const imagesWithSize = await Promise.all(
          data.map(async (item) => {
            return new Promise((resolve) => {
              Image.getSize(item.uri, (width, height) => {
                resolve({
                  id: item._id, // Sử dụng ID từ dữ liệu gốc
                  uri: item.uri,
                  width,
                  height,
                });
              }, () => {
                // Xử lý khi không thể lấy kích thước ảnh
                resolve({
                  id: item._id,
                  uri: item.uri,
                  width: 0, // Mặc định nếu không lấy được kích thước
                  height: 0,
                });
              });
            });
          })
        );

        setImages(imagesWithSize); // Lưu dữ liệu đã chuyển đổi vào state
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // Gọi hàm lấy dữ liệu khi component được mount
  }, []);
  console.log(images)
  // Hàm render từng ảnh
  const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.type}>{item.typePicture}</Text>
      <Text style={styles.date}>Created at: {new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(images)}</Text>
    </View>
  );
};

export default TableUserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  type: {
    fontSize: 14,
    color: "gray",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});
