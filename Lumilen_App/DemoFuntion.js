// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
//   FlatList,
// } from "react-native";
// import Footer from "../footer";
// import styles from "../../Css/Info_Ghim_Css";
// import { UserContext } from "../../Hook/UserContext";
// import BASE_URL from "../../IpAdress";
// import { convertDataWithSize } from "../../Hook/imageUtils";

// const { width } = Dimensions.get("window");
// const COLUMN_COUNT = 3; // Số cột
// const SPACING = 2; // Khoảng cách giữa các cột
// const columnWidth = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

// const InfoScreen = ({ navigation }) => {
//   const { userData } = useContext(UserContext);
//   const avatar = userData ? userData.avatar : null;
//   const userId = userData ? userData._id : null;

//   const [images, setImages] = useState([]); // Danh sách ảnh đầy đủ
//   const [filteredImages, setFilteredImages] = useState([]); // Danh sách ảnh được lọc

//   // Hàm lấy dữ liệu từ API
//   const fetchDataFromAPI = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}:5000/picture/getUserImages?userId=${userId}`);
//       const data = await response.json();
//       const imagesWithSize = await convertDataWithSize(data);
//       setImages(imagesWithSize);
//       setFilteredImages(imagesWithSize);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDataFromAPI();
//   }, [userId]);

//   // Tạo dữ liệu từng cột cho hiệu ứng masonry
//   const generateColumns = (data) => {
//     const columns = Array.from({ length: COLUMN_COUNT }, () => []);
//     data.forEach((item, index) => {
//       const columnIndex = index % COLUMN_COUNT;
//       columns[columnIndex].push(item);
//     });
//     return columns;
//   };

//   // Render từng cột
//   const renderColumn = (columnData, columnIndex) => (
//     <View
//       key={`column-${columnIndex}`}
//       style={{ flex: 1, marginHorizontal: SPACING / 2 }}
//     >
//       {columnData.map((item, index) => {
//         const imageHeight = (item.height / item.width) * columnWidth;

//         return (
//           <View
//             key={`${item._id || "undefined"}-${index}`}
//             style={styles.imageContainer}
//           >
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("ImageDetailScreen", {
//                   dataAnh: item,
//                 })
//               }
//             >
//               <Image
//                 source={{ uri: item.uri }}
//                 style={{
//                   width: columnWidth,
//                   height: imageHeight,
//                   borderRadius: 15,
//                   resizeMode: "cover",
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//         );
//       })}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden={false} />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")}>
//           <Image source={{ uri: avatar }} style={styles.profileImage} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Ghim</Text>
//       </View>
//       <View style={styles.body}>
//         <FlatList
//           data={generateColumns(filteredImages)}
//           renderItem={({ item, index }) => renderColumn(item, index)}
//           keyExtractor={(item, index) => `column-${index}`}
//           horizontal={false}
//           numColumns={COLUMN_COUNT}
//           contentContainerStyle={{
//             padding: SPACING,
//             paddingBottom: 20,
//           }}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//       <Footer navigation={navigation} avatar={avatar} namePage={"Trang Ghim"} />
//     </View>
//   );
// };

// export default InfoScreen;
