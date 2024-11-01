import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styles from '../../../../../Css/ChangePassword_css'; 
import { Ionicons } from '@expo/vector-icons';

const ChangePasswordScreen = ({ navigation ,route}) => {
  const savedPassword = 'Hachi'; // Mật khẩu hiện tại giả lập
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  // Kiểm tra mật khẩu mới có đúng định dạng hay không
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Xử lý khi người dùng nhập mật khẩu mới
  const handleNewPasswordChange = (password) => {
    setNewPassword(password);
    if (!validatePassword(password)) {
      setErrorNewPassword('Mật khẩu mới phải có ít nhất 8 ký tự, 1 chữ cái viết hoa, 1 ký tự đặc biệt và 1 số.');
    } else {
      setErrorNewPassword('');
    }
  };

  // Xử lý khi người dùng nhập lại mật khẩu xác nhận
  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
    if (password !== newPassword) {
      setErrorConfirmPassword('Mật khẩu của bạn không khớp.');
    } else {
      setErrorConfirmPassword('');
    }
  };

  // Kiểm tra mật khẩu hiện tại có đúng hay không
  const handleCurrentPasswordChange = (password) => {
    setCurrentPassword(password);
    if (password !== savedPassword) {
      setErrorCurrentPassword('Mật khẩu hiện tại không đúng.');
    } else {
      setErrorCurrentPassword('');
    }
  };

  // Điều kiện để nút "Xong" được kích hoạt
  const isFormValid = 
    currentPassword === savedPassword &&
    !errorNewPassword &&
    !errorConfirmPassword &&
    newPassword === confirmPassword &&
    newPassword !== ''; // Đảm bảo mật khẩu mới không trống

  const handleSubmit = () => {
    if (isFormValid) {
    
      navigation.navigate("AccountManagement", {
        showSuccessMessage: "Thay đổi mật khẩu thành công", // Nội dung thông báo
      });
    } else {
        navigation.navigate("AccountManagement", {
            showSuccessMessage: "Có lỗi xảy ra ", // Nội dung thông báo lỗi 
          });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mật khẩu</Text>
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: isFormValid ? '#DF0018' : '#ccc' }]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.doneButtonText}>Xong</Text>
        </TouchableOpacity>
      </View>

      {/* Mật khẩu hiện tại */}
      <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <TextInput
        style={[styles.input, errorCurrentPassword ? styles.errorInput : null]}
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={handleCurrentPasswordChange}
        placeholder="Nhập mật khẩu hiện tại"
      />
      {errorCurrentPassword ? <Text style={styles.errorText}>{errorCurrentPassword}</Text> : null}

      {/* Mật khẩu mới */}
      <Text style={styles.label}>Mật khẩu mới</Text>
      <TextInput
        style={[styles.input, errorNewPassword ? styles.errorInput : null]}
        secureTextEntry={true}
        value={newPassword}
        onChangeText={handleNewPasswordChange}
        placeholder="Nhập mật khẩu mới"
      />
      {errorNewPassword ? <Text style={styles.errorText}>{errorNewPassword}</Text> : null}

      {/* Xác nhận mật khẩu mới */}
      <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
      <TextInput
        style={[styles.input, errorConfirmPassword ? styles.errorInput : null]}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        placeholder="Nhập lại mật khẩu mới"
      />
      {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}
    </View>
  );
};

export default ChangePasswordScreen;
