import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../../../../../Css/ChangePassword_css'; 
import { UserContext } from '../../../../../Hook/UserContext';
import BASE_URL from '../../../../../IpAdress';

const ChangePasswordScreen = ({ navigation }) => {
  const { userData, fetchUserData } = useContext(UserContext);
  const userId = userData ? userData._id : ''; // Lấy userId từ context
  const savedPassword = userData ? userData.password : ''; // Mật khẩu hiện tại từ context

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  // Kiểm tra định dạng mật khẩu mới
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Xử lý khi nhấn nút "Xong"
  const handleSubmit = async () => {
    let isValid = true;

    // Kiểm tra mật khẩu hiện tại
    if (!currentPassword) {
      setErrorCurrentPassword('Mật khẩu hiện tại không được để trống.');
      isValid = false;
    } else if (currentPassword !== savedPassword) {
      setErrorCurrentPassword('Mật khẩu hiện tại không đúng.');
      isValid = false;
    } else {
      setErrorCurrentPassword('');
    }

    // Kiểm tra mật khẩu mới
    if (!newPassword) {
      setErrorNewPassword('Mật khẩu mới không được để trống.');
      isValid = false;
    } else if (newPassword === savedPassword) {
      setErrorNewPassword('Mật khẩu mới không được trùng với mật khẩu hiện tại.');
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      setErrorNewPassword('Mật khẩu mới phải có ít nhất 8 ký tự, 1 chữ cái viết hoa, 1 ký tự đặc biệt và 1 số.');
      isValid = false;
    } else {
      setErrorNewPassword('');
    }

    // Kiểm tra xác nhận mật khẩu
    if (!confirmPassword) {
      setErrorConfirmPassword('Xác nhận mật khẩu không được để trống.');
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setErrorConfirmPassword('Mật khẩu xác nhận không khớp.');
      isValid = false;
    } else {
      setErrorConfirmPassword('');
    }

    // Nếu tất cả hợp lệ, gọi API để cập nhật mật khẩu
    if (isValid) {
      try {
        const response = await axios.put(`${BASE_URL}:5000/user/updateUser/${userId}`, {
          password: newPassword,
        });
        if (response.status === 200) {
       
          fetchUserData(userData.email); // Cập nhật dữ liệu người dùng sau khi thay đổi mật khẩu
          navigation.navigate("AccountManagement", {
            showSuccessMessage: "Thay đổi mật khẩu thành công",
          });
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể cập nhật mật khẩu. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đổi Mật Khẩu</Text>
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: '#DF0018' }]}
          onPress={handleSubmit}
        >
          <Text style={styles.doneButtonText}>Xong</Text>
        </TouchableOpacity>
      </View>

      {/* Mật khẩu hiện tại */}
      <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <View style={[styles.inputContainer, errorCurrentPassword ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isCurrentPasswordVisible}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Nhập mật khẩu hiện tại"
        />
        <TouchableOpacity onPress={() => setCurrentPasswordVisible(!isCurrentPasswordVisible)}>
          <Ionicons
            name={isCurrentPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errorCurrentPassword ? <Text style={styles.errorText}>{errorCurrentPassword}</Text> : null}

      {/* Mật khẩu mới */}
      <Text style={styles.label}>Mật khẩu mới</Text>
      <View style={[styles.inputContainer, errorNewPassword ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isNewPasswordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nhập mật khẩu mới"
        />
        <TouchableOpacity onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}>
          <Ionicons
            name={isNewPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errorNewPassword ? <Text style={styles.errorText}>{errorNewPassword}</Text> : null}

      {/* Xác nhận mật khẩu mới */}
      <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
      <View style={[styles.inputContainer, errorConfirmPassword ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Nhập lại mật khẩu mới"
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
          <Ionicons
            name={isConfirmPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}
    </View>
  );
};

export default ChangePasswordScreen;
