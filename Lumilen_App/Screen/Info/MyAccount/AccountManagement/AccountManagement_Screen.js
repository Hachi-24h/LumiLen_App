import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, Switch, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../Css/AccountManagement_Css'; 
import { showSuccessMessage } from "../../../../Screen/Other/notification";
const AccountManagementScreen = ({ navigation, route }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [email, setEmail] = useState('shinnichi987@gmail.com'); // Giá trị mặc định email

  // Cập nhật email nếu nhận được từ màn hình UpdateEmailScreen
  useEffect(() => {
    if (route.params?.updatedEmail) {
      setEmail(route.params.updatedEmail);
      
    }
    if (route.params?.showSuccessMessage) {
        
        // console.log(route.params.showSuccessMessage)
        showSuccessMessage(route.params.showSuccessMessage);

      }
  }, [route.params]);

  const toggleSwitch = () => setIsSoundEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý tài khoản</Text>
      </View>

     
      <Text style={styles.introText}>
        Thực hiện thay đổi đối với thông tin cá nhân hoặc loại tài khoản của bạn
      </Text>

 
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài khoản của bạn</Text>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("PersonalInfo")}>
          <Text style={styles.settingText}>Thông tin cá nhân</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("UpdateEmail", { email })} 
        >
          <View style={styles.settingDetailContainer}>
            <Text style={styles.settingText}>Email</Text>
            <Text style={styles.settingDetail}>{email}</Text> 
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}
         onPress={() => navigation.navigate("ChangePassword")}
        >
          <View style={styles.settingDetailContainer}>
            <Text style={styles.settingText}>Mật khẩu</Text>
            <Text style={styles.settingDetail}>Thay đổi mật khẩu</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingDetailContainer}>
            <Text style={styles.settingText}>Giao diện ứng dụng</Text>
            <Text style={styles.settingDetail}>Mặc định của hệ thống</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingDetailContainer}>
            <Text style={styles.settingText}>Âm thanh ứng dụng</Text>
            <Text style={styles.settingDescription}>Bật âm thanh ứng dụng từ ứng dụng</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSoundEnabled ? '#f5dd4b' : '#f4f3f4' }
            onValueChange={toggleSwitch}
            value={isSoundEnabled}
            style={styles.switch}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vô hiệu hóa và xóa</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingDetailContainer}>
            <Text style={styles.settingText}>Hủy kích hoạt tài khoản</Text>
            <Text style={styles.settingDescription}>Hủy kích hoạt để tạm thời ẩn các Ghim và hồ sơ của bạn</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingDetailContainer}>
            <Text style={styles.settingText}>Xóa dữ liệu và tài khoản của bạn</Text>
            <Text style={styles.settingDescription}>Xóa vĩnh viễn dữ liệu của bạn và mọi thứ liên kết với tài khoản của bạn</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountManagementScreen;
