import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import styles from '../../Css/Home_Css';  // Import styles từ file Home_Css.js
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const imageData = [
  { id: 1, src: require('../../Picture/image_1.png'), likes: 2 },
  { id: 2, src: require('../../Picture/image_1.png') },
  { id: 3, src: require('../../Picture/image_1.png'), likes: 5 },
  { id: 4, src: require('../../Picture/image_1.png') },
  { id: 5, src: require('../../Picture/image_1.png') },
  { id: 6, src: require('../../Picture/image_1.png') },
];

const HomeScreen = () => {
  const [selectedImageId, setSelectedImageId] = useState(null); // State để lưu trữ hình được chọn
  const [modalVisible, setModalVisible] = useState(false); // State để hiển thị modal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleImagePress = (id) => {
    setSelectedImageId(id); // Cập nhật state với ID của hình được chọn
  };

  const handleOutsidePress = () => {
    setSelectedImageId(null); // Reset state khi nhấn ra ngoài
    setModalVisible(false); // Đóng modal khi nhấn ra ngoài
  };

  const toggleModal = (event) => {
    const { pageY, pageX } = event.nativeEvent; // Lấy tọa độ của nút ba chấm
    setModalPosition({ 
        top: pageY - 170, // Đẩy modal xuống dưới nút ba chấm một chút
        left: pageX - 110 // Căn giữa modal với nút ba chấm
    });
    setModalVisible(!modalVisible); // Hiện/ẩn modal
  };

  const options = [
    { icon: "pin", action: () => console.log('Pinned') },
    { icon: "eye-off", action: () => console.log('Hide') },
    { icon: "arrow-up", action: () => console.log('Download') },
    { icon: "chatbubble", action: () => console.log('Comment') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={handleOutsidePress}>
        <View style={styles.imageGrid}>
          <View style={styles.leftColumn}>
            <TouchableOpacity
              style={[styles.imageWrapper, { opacity: selectedImageId === null || selectedImageId === 1 ? 1 : 0.3 }]}
              activeOpacity={1}
              onPress={(e) => {
                e.stopPropagation(); // Ngăn sự kiện chạm lan ra ngoài
                handleImagePress(1);
              }}
            >
              <Image style={styles.imageLarge} source={imageData[0].src} />
              <View style={styles.likeContainer}>
                <Text style={styles.likeText}>{imageData[0].likes}</Text>
              </View>
              {/* Nút ba chấm chỉ hiển thị khi hình được chọn */}
              {selectedImageId === 1 && (
                <TouchableOpacity style={styles.moreOptionsButton} onPress={toggleModal}>
                  <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.imageWrapper, { opacity: selectedImageId === null || selectedImageId === 3 ? 1 : 0.3 }]}
              activeOpacity={1}
              onPress={(e) => {
                e.stopPropagation();
                handleImagePress(3);
              }}
            >
              <Image style={styles.imageLarge} source={imageData[2].src} />
              <View style={styles.likeContainer}>
                <Text style={styles.likeText}>{imageData[2].likes}</Text>
              </View>
              {/* Nút ba chấm chỉ hiển thị khi hình được chọn */}
              {selectedImageId === 3 && (
                <TouchableOpacity style={styles.moreOptionsButton} onPress={toggleModal}>
                  <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.rightColumn}>
            <TouchableOpacity
              style={[styles.imageWrapper, { opacity: selectedImageId === null || selectedImageId === 2 ? 1 : 0.3 }]}
              activeOpacity={1}
              onPress={(e) => {
                e.stopPropagation();
                handleImagePress(2);
              }}
            >
              <Image style={styles.imageSmall} source={imageData[1].src} />
              {/* Nút ba chấm chỉ hiển thị khi hình được chọn */}
              {selectedImageId === 2 && (
                <TouchableOpacity style={styles.moreOptionsButton} onPress={toggleModal}>
                  <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.imageWrapper, { opacity: selectedImageId === null || selectedImageId === 4 ? 1 : 0.3 }]}
              activeOpacity={1}
              onPress={(e) => {
                e.stopPropagation();
                handleImagePress(4);
              }}
            >
              <Image style={styles.imageLarge} source={imageData[3].src} />
              {/* Nút ba chấm chỉ hiển thị khi hình được chọn */}
              {selectedImageId === 4 && (
                <TouchableOpacity style={styles.moreOptionsButton} onPress={toggleModal}>
                  <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* User info */}
        <View style={styles.userInfo}>
          <Image style={styles.avatar} source={imageData[0].src} />
          <Text style={styles.userName}>TonyMeccalV</Text>
          <Text style={styles.likes}>❤️ 6.0k</Text>
        </View>

        {/* Additional images */}
        <View style={styles.imageGrid}>
          <View style={styles.leftColumn}>
            <TouchableOpacity
              style={[styles.imageWrapper, { opacity: selectedImageId === null || selectedImageId === 5 ? 1 : 0.3 }]}
              activeOpacity={1}
              onPress={(e) => {
                e.stopPropagation();
                handleImagePress(5);
              }}
            >
              <Image style={styles.imageLarge} source={imageData[4].src} />
              {/* Nút ba chấm chỉ hiển thị khi hình được chọn */}
              {selectedImageId === 5 && (
                <TouchableOpacity style={styles.moreOptionsButton} onPress={toggleModal}>
                  <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.rightColumn}>
            <TouchableOpacity
              style={[styles.imageWrapper, { opacity: selectedImageId === null || selectedImageId === 6 ? 1 : 0.3 }]}
              activeOpacity={1}
              onPress={(e) => {
                e.stopPropagation();
                handleImagePress(6);
              }}
            >
              <Image style={styles.imageSmall} source={imageData[5].src} />
              {/* Nút ba chấm chỉ hiển thị khi hình được chọn */}
              {selectedImageId === 6 && (
                <TouchableOpacity style={styles.moreOptionsButton} onPress={toggleModal}>
                  <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal Options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalContainer} 
          onPress={toggleModal} // Bấm ra ngoài modal cũng sẽ đóng
        >
          <View style={styles.optionsContainer}>
            {options.map((option, index) => {
              const angle = (index / options.length) * Math.PI; // Tính góc cho từng nút
              const radius = 70; // Bán kính vòng cung
              const x = modalPosition.left - radius * Math.cos(angle); // Tọa độ x
              const y = modalPosition.top - radius * Math.sin(angle); // Tọa độ y

              return (
                <TouchableOpacity 
                  key={index}
                  style={[styles.option, { position: 'absolute', left: x, top: y }]} 
                  onPress={option.action}
                >
                  <Icon name={option.icon} size={24} color="#000" />
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Create') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Info') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={() => <View><Text>Search</Text></View>} />
      <Tab.Screen name="Create" component={() => <View><Text>Create</Text></View>} />
      <Tab.Screen name="Notifications" component={() => <View><Text>Notifications</Text></View>} />
      <Tab.Screen name="Info" component={() => <View><Text>Info</Text></View>} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
