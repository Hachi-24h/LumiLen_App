import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../../Css/AccountSetting_Css'; // Import CSS
import { Ionicons } from "@expo/vector-icons";
import Footer from '../../footer';

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tài khoản của bạn</Text>
      </View>

    
      <TouchableOpacity style={styles.profileSection}
       onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-circle-outline" size={50} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Hachi</Text>
          <Text style={styles.profileLink}>Xem hồ sơ</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      
      <ScrollView contentContainerStyle={styles.scrollContent}>
    
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("AccountManagement")}>
            <Text style={styles.settingText}>Quản lý tài khoản</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Chế độ hiển thị hồ sơ</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Bộ điều chỉnh bảng tin nhà</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Tài khoản được xác nhận</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Quyền mạng xã hội</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Thông báo</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Quyền riêng tư và dữ liệu</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Cổng thông tin báo cáo vi phạm</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Đăng nhập</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Bảo mật</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Đăng xuất</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Hỗ trợ</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Trung tâm Trợ giúp</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Điều khoản dịch vụ</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Chính sách quyền riêng tư</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Giới thiệu</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>


      <Footer navigation={navigation} />  
    </View>
  );
};

export default AccountScreen;
