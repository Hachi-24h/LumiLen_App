import React, { useEffect ,useContext } from "react";
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
} from "react-native";
import styles from "../../Css/Info_Css";
import Footer from "../footer";
import { UserContext }  from "../../Hook/UserContext";
const { width } = Dimensions.get("window");

const boardsData = [
  { id: 1, title: "b", pins: 0, image: require("../../Picture/image_1.png") },
  { id: 2, title: "chus", pins: 21, image: require("../../Picture/image_1.png"), secret: true },
  { id: 3, title: "demo", pins: 5, image: require("../../Picture/image_1.png") },
  { id: 4, title: "EmBé❤️", pins: 22, image: require("../../Picture/image_1.png"), secret: true },
  { id: 5, title: "Hate", pins: 4, image: require("../../Picture/image_1.png") },
  { id: 6, title: "Nhảm nhí", pins: 15, image: require("../../Picture/image_1.png"), secret: true },
];

const InfoScreen = ({ navigation, route }) => {
  
  const { selectedIcon } = route.params || {};
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;



  const renderBoardItem = ({ item }) => (
    <View style={styles.boardItem}>
      <StatusBar hidden={false} />
      <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")}>
        <Image source={item.image} style={styles.boardImage} />
        {item.secret && (
          <Image
            source={require("../../Icon/mess_check.png")}
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
          <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")} style={styles.TouchableOpacitystyle}>
            <Image
             source={avatar ? { uri: avatar } : require("../../Icon/mess_check.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <TouchableOpacity onPress={() => navigation.navigate("Info_Ghim")}>
            <Text style={styles.headerTitle}>Ghim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Info")}>
            <Text style={[styles.headerTitle, styles.activeTab]}>Bảng</Text>
          </TouchableOpacity>
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
            source={require("../../Icon/mess_check.png")}
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
  <Footer navigation={navigation}  avatar={avatar} initialSelectedIcon={selectedIcon} namePage={"Trang Thông tin"} />
    </View>
  );
};

export default InfoScreen;
