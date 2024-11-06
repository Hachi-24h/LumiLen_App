import React, { useState, useEffect ,useContext} from "react";
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
} from "react-native";
import styles from "../../Css/Search_css";
import Footer from "../footer";
import { UserContext } from "../../Hook/UserContext";
const { width } = Dimensions.get("window");

const dataIdeas = [
  { id: 1, title: "Galaxy Wallpaper" },
  { id: 2, title: "Funny gif" },
  { id: 3, title: "Astronomy" },
  { id: 4, title: "Design" },
  { id: 5, title: "Photography" },
  { id: 6, title: "Animals" },
];

const inspirationData = [
  { id: 1, image: require("../../Picture/image_1.png") },
  { id: 2, image: require("../../Picture/image_2.png") },
  { id: 3, image: require("../../Picture/image_3.png") },
  { id: 4, image: require("../../Picture/image_4.png") },
  { id: 5, image: require("../../Picture/image_5.png") },
  { id: 6, image: require("../../Picture/image_6.png") },
];

const spotlightData = [
  { id: 1, image: require("../../Picture/image_3.png") },
  { id: 2, image: require("../../Picture/image_4.png") },
  { id: 3, image: require("../../Picture/image_5.png") },
  { id: 4, image: require("../../Picture/image_6.png") },
];

const Search = ({navigation,route}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState(""); 
  const [keyboardVisible, setKeyboardVisible] = useState(false); 
  const { selectedIcon } = route.params || {}; 
  const { userData } = useContext(UserContext);
  const avatar = userData ? userData.avatar : null;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Bàn phím xuất hiện
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Bàn phím ẩn đi
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCancel = () => {
    setIsSearchActive(false);
    setSearchText("");
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
          />
          {isSearchActive && (
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sử dụng ScrollView để cuộn nội dung khi vượt quá kích thước */}
      <ScrollView 
        style={styles.section}
        keyboardShouldPersistTaps="handled" // Ngăn không để bàn phím ảnh hưởng đến cuộn
      >
        {/* Ideas Section */}
        <View style={styles.ideaSection}>
          <Text style={styles.sectionTitle}>Ideas for you</Text>
          <FlatList
            horizontal
            data={dataIdeas}
            renderItem={({ item }) => (
              <View style={styles.ideaItem}>
                <Text style={styles.ideaText}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Inspiration Section */}
        <View style={styles.inspirationSection}>
          <Text style={styles.sectionTitle}>Today's Inspiration</Text>
          <FlatList
            horizontal
            data={inspirationData}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.image}
                style={styles.inspirationImage}
              >
                <Text style={styles.inspirationText}>Your go-to guide</Text>
              </ImageBackground>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={width * 0.8 + 20}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - width * 1) / 2,
            }}
          />
        </View>

        {/* Spotlight Section */}
        <View style={styles.spotlightSection}>
          <Text style={styles.sectionTitle}>Shopping Spotlight</Text>
          <FlatList
            horizontal
            data={spotlightData}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.image}
                style={styles.spotlightImage}
              >
                <Text style={styles.spotlightText}>Spotlight Content</Text>
              </ImageBackground>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={width * 0.8 + 20}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - width * 1) / 2,
            }}
          />
        </View>
      </ScrollView>

      {!keyboardVisible &&     <Footer navigation={navigation}  avatar={avatar} initialSelectedIcon={selectedIcon} namePage={"Trang Tìm kiếm"}  />} 
    </View>
  );
};

export default Search;
