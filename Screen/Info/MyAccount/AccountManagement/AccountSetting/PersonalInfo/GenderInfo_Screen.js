import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../../../Css/GenderInfo_Css'; // Tạo file CSS tương tự

const GenderInfoScreen = ({ navigation, route }) => {
  const [selectedGender, setSelectedGender] = useState(route.params?.gender || 'Nam'); // Lấy giá trị giới tính hiện tại hoặc mặc định là Nam

  // Hàm để chọn giới tính
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    navigation.navigate("PersonalInfo", {
      selectedGender: gender,
      showSuccessMessage: "Thêm giới tính thành công", // Nội dung thông báo
    });
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
