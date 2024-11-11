import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../../../../../../Css/GenderInfo_Css';
import BASE_URL from '../../../../../../IpAdress';
import { UserContext } from '../../../../../../Hook/UserContext';

const GenderInfoScreen = ({ navigation, route }) => {
  const { userData, fetchUserData } = useContext(UserContext);
  const userId = userData ? userData._id : null;

  // Ánh xạ giữa giá trị hiển thị và giá trị enum trong dữ liệu
  const genderMap = {
    "Nam": "Male",
    "Nữ": "Female",
    "Khác": "Other"
  };

  const reverseGenderMap = {
    "Male": "Nam",
    "Female": "Nữ",
    "Other": "Khác"
  };

  const [selectedGender, setSelectedGender] = useState(reverseGenderMap[route.params?.gender] || 'Nam');

  const handleGenderSelect = async (gender) => {
    setSelectedGender(gender);
    const mappedGender = genderMap[gender]; // Chuyển đổi giá trị hiển thị sang giá trị enum

    try {
      const response = await axios.put(`${BASE_URL}/user/updateUser/${userId}`, {
        gender: mappedGender, // Gửi giá trị enum
      });

      if (response.status === 200) {
        await fetchUserData(userData.email); // Làm mới dữ liệu user trong context
        navigation.navigate("PersonalInfo", {
          selectedGender: mappedGender,
          showSuccessMessage: "Thêm giới tính thành công",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giới tính:", error);
      Alert.alert("Lỗi", "Không thể cập nhật giới tính. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giới tính</Text>
      </View>

      {/* Các tùy chọn giới tính */}
      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => handleGenderSelect('Nam')}
      >
        <Ionicons 
          name={selectedGender === 'Nam' ? "radio-button-on" : "radio-button-off"} 
          size={24} 
          color={selectedGender === 'Nam' ? "black" : "gray"} 
        />
        <Text style={styles.optionText}>Nam</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => handleGenderSelect('Nữ')}
      >
        <Ionicons 
          name={selectedGender === 'Nữ' ? "radio-button-on" : "radio-button-off"} 
          size={24} 
          color={selectedGender === 'Nữ' ? "black" : "gray"} 
        />
        <Text style={styles.optionText}>Nữ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => handleGenderSelect('Khác')}
      >
        <Ionicons 
          name={selectedGender === 'Khác' ? "radio-button-on" : "radio-button-off"} 
          size={24} 
          color={selectedGender === 'Khác' ? "black" : "gray"} 
        />
        <Text style={styles.optionText}>Khác</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderInfoScreen;
