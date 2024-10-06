import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "../../Css/Search_css";
import Footer from "../footer"; 

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

const Search = () => {

  const inspirationRef = useRef(null);
  const spotlightRef = useRef(null);

 
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />

      {/* Search Bar */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a project of any size"
          placeholderTextColor="#C4C4C4"
        />
      </View>

      {/* Sử dụng ScrollView để cuộn nội dung khi vượt quá kích thước */}
      <ScrollView style={styles.section}>
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
            ref={inspirationRef}
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
            snapToInterval={width * 0.8 + 20} // Đảm bảo ảnh nằm giữa
            decelerationRate="fast" // Giảm tốc độ cuộn để dừng lại đúng vị trí
            contentContainerStyle={{
              paddingHorizontal: (width - width * 1) / 2,
            }} // Căn giữa nội dung
          />
        </View>

        {/* Spotlight Section */}
        <View style={styles.spotlightSection}>
          <Text style={styles.sectionTitle}>Shopping Spotlight</Text>
          <FlatList
            horizontal
            data={spotlightData}
            ref={spotlightRef}
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
            snapToInterval={width * 0.8 + 20} // Đảm bảo ảnh nằm giữa
            decelerationRate="fast" // Giảm tốc độ cuộn để dừng lại đúng vị trí
            contentContainerStyle={{
              paddingHorizontal: (width - width * 1) / 2,
            }} // Căn giữa nội dung
          />
        </View>
      </ScrollView>

        {/* Footer */}
        <Footer />
    </View>
  );
};

export default Search;
