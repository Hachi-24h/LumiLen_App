import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./../../../../../Css/updateEmail_css";
import BASE_URL from "../../../../../config/IpAdress";
import { UserContext } from "../../../../../Hook/UserContext"; // Import context
import { Ionicons } from "@expo/vector-icons";

const UpdateEmailScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.email);
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // Kiểm tra trạng thái email hợp lệ
  const { userData, fetchUserData } = useContext(UserContext); // Lấy dữ liệu và hàm fetchUserData từ context
  const userId = userData ? userData._id : null;
  const emailPre = userData ? userData.email : null;

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);

    // Kiểm tra email mỗi khi người dùng nhập ký tự
    if (text === emailPre) {
      setError("Đây là email hiện tại của bạn.");
      setIsEmailValid(false);
    } else if (!validateEmail(text)) {
      setIsEmailValid(false);
      setError("Email không đúng định dạng.");
    } else {
      setIsEmailValid(true);
      setError("");
    }
  };

  const handleUpdateEmail = async () => {
    // Kiểm tra email lại trước khi cập nhật
    if (email === emailPre) {
      Alert.alert("Thông báo", "Đây là email hiện tại của bạn.");
      return;
    }

    if (!isEmailValid) {
      Alert.alert("Thông báo", "Email không hợp lệ.");
      return;
    }

    try {
      const linkapi = `${BASE_URL}:5000/user/updateEmail/${userId}`;
      // console.log(linkapi);
      const response = await fetch(linkapi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail: email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sau khi cập nhật email thành công, gọi lại fetchUserData
        fetchUserData(email, true); // Gọi lại hàm fetchUserData với email mới
        navigation.navigate("AccountManagement", { updatedEmail: email });
      } else {
        if (data.message === "Email đã tồn tại, vui lòng chọn email khác.") {
          setError("Email đã được sử dụng.");
        } else {
          setError(data.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
      }
    } catch (error) {
      setError("Lỗi kết nối, vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("PersonalInfo")}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cập nhật Email</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, !isEmailValid && styles.inputError]} // Áp dụng lỗi khi không hợp lệ
          value={email}
          onChangeText={handleEmailChange} // Kiểm tra email khi người dùng nhập
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Nhập Gmail của bạn"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[
            styles.button,
            !isEmailValid || email === emailPre
              ? styles.buttonDisabled
              : styles.buttonEnabled, // Disable nút nếu email không hợp lệ hoặc trùng với email cũ
          ]}
          onPress={handleUpdateEmail}
          disabled={!isEmailValid || email === emailPre} // Disable nút nếu email không hợp lệ
        >
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateEmailScreen;
