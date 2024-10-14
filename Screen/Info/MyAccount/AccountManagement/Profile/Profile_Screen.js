import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from "../../../../../Css/Proflie_Css";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={30}  />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
       
          <TouchableOpacity>
          <Ionicons name="share-social" size={30}  />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <Image source={require('../../../../../Picture/image_1.png')} style={styles.avatar} />
          </TouchableOpacity>
        <Text style={styles.username}>Hachi</Text>
        <Text style={styles.userID}>@hachi</Text>
        <Text style={styles.followInfo}>3 người theo dõi · 62 đang theo dõi</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Section */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Đã tạo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>Đã lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Pins Section */}
      <View style={styles.pinsContainer}>
     
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.pinItem}>
            <Image source={require('../../../../../Icon/plus_check.png')} style={styles.pinImage} />
          </View>
          <View style={styles.pinItem}>
            <Image source={require('../../../../../Icon/plus_check.png')} style={styles.pinImage} />
          </View>
          
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
