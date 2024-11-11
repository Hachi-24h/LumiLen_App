import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../../../../../Css/DOB_Css";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../../../../../Hook/UserContext";
import BASE_URL from "../../../../../../IpAdress";

const BirthdayScreen = ({ navigation }) => {
  const { userData, fetchUserData } = useContext(UserContext);
  const userID = userData ? userData._id : null;
  const dob = userData ? userData.dob : null;
  const [date, setDate] = useState(new Date(dob));
  const [showPicker, setShowPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);

    const currentYear = new Date().getFullYear();
    const selectedYear = currentDate.getFullYear();
    const age = currentYear - selectedYear;

    if (age < 15) {
      setErrorMessage("Xin lỗi bạn phải ít nhất 15 tuổi mới được dùng Pinterest");
    } else {
      setErrorMessage("");
    }
  };

  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) return "Ngày không hợp lệ";
    return `${date.getDate()} thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
  };

  const handleUpdate = async () => {
    const currentYear = new Date().getFullYear();
    const selectedYear = date.getFullYear();
    const age = currentYear - selectedYear;

    if (age < 15) {
      setErrorMessage("Xin lỗi, bạn phải ít nhất 15 tuổi mới được dùng Pinterest");
    } else {
      setErrorMessage("");

      try {
        const formattedDate = date.toISOString();

        const response = await fetch(`${BASE_URL}/user/updateUser/${userID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dob: formattedDate }),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessMessage("Ngày sinh đã được cập nhật thành công!");

          // Gọi hàm fetchUserData để làm mới dữ liệu trong UserContext
          await fetchUserData(userData.email);

          navigation.navigate("PersonalInfo", { showSuccessMessage: "Thêm ngày sinh thành công" });
        } else {
          setErrorMessage(result.message || "Có lỗi xảy ra khi cập nhật ngày sinh.");
        }
      } catch (error) {
        setErrorMessage("Lỗi kết nối. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ngày sinh</Text>
      </View>

      <Text style={styles.description}>
        Để giúp giữ cho Pinterest an toàn, chúng tôi đang cần ngày sinh của bạn.
        Ngày sinh cũng giúp chúng tôi cung cấp các đề xuất được cá nhân hóa nhiều hơn và quảng cáo có liên quan hơn.
        Chúng tôi sẽ không chia sẻ thông tin này mà không có sự cho phép của bạn và thông tin sẽ không hiển thị trên hồ sơ của bạn.
      </Text>

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}

      {errorMessage ? (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 20 }}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={{ color: "green", textAlign: "center", marginBottom: 20 }}>{successMessage}</Text>
      ) : null}

      <Text style={styles.subText}>
        Sử dụng ngày sinh của chính bạn, ngay cả khi đây là tài khoản doanh nghiệp.
      </Text>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdate}
        disabled={!!errorMessage}
      >
        <Text style={styles.updateButtonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BirthdayScreen;
