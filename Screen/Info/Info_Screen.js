import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import styles from "../../Css/Info_Css"; 
import Footer from "../footer";
const { width } = Dimensions.get("window");

const boardsData = [
  { id: 1, title: "b", pins: 0, image: require("../../Picture/image_1.png") },
  {
    id: 2,
    title: "chus",
    pins: 21,
    image: require("../../Picture/image_1.png"),
    secret: true,
  },
  {
    id: 3,
    title: "demo",
    pins: 5,
    image: require("../../Picture/image_1.png"),
  },
  {
    id: 4,
    title: "EmBé❤️",
    pins: 22,
    image: require("../../Picture/image_1.png"),
    secret: true,
  },
  {
    id: 5,
    title: "Hate",
    pins: 4,
    image: require("../../Picture/image_1.png"),
  },
  {
    id: 6,
    title: "Nhảm nhí",
    pins: 15,
    image: require("../../Picture/image_1.png"),
    secret: true,
  },
];

const InfoScreen = ({ navigation }) => {
  const renderBoardItem = ({ item }) => (
    <View style={styles.boardItem}>
      <StatusBar hidden={false} />
      <TouchableOpacity >
        <Image source={item.image} style={styles.boardImage} />
        {item.secret && (
          <Image
            source={require("../../Icon/mess.png")}
            style={styles.lockIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.boardTitle}>{item.title}</Text>
      <Text style={styles.boardDetails}>{item.pins} ghim</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
     
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")}>
            <Image
              source={require("../../Icon/mess.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Ghim</Text>
          <Text style={[styles.headerTitle, styles.activeTab]}>Bảng</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

    
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Tìm Ghim của bạn" />
      </View>

    
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require("../../Icon/mess.png")}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTextButton}>
          <Text style={styles.filterText}>Nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTextButton}>
          <Text style={styles.filterText}>Bí mật</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={boardsData}
        renderItem={renderBoardItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.boardList}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

export default InfoScreen;
