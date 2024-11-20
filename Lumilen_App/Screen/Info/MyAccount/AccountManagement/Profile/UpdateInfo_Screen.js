import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { UserContext } from "../../../../../Hook/UserContext";
import styles from "../../../../../Css/UpdateInfo_css";
import BASE_URL from "../../../../../IpAdress";
import { showNotification } from "../../../../../Other/notification";
import colors from "../../../../../Other/Color";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userData, fetchUserData } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idUser, setIdUser] = useState("");
  const [description, setDescription] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [avatarUri, setAvatarUri] = useState(
    userData?.avatar || require("../../../../../Picture/defaultavatar.jpg")
  );
  const [isFirstNameValid, setIsFirstNameValid] = useState(true); // Kiểm tra tính hợp lệ của tên
  const [isLastNameValid, setIsLastNameValid] = useState(true); // Kiểm tra tính hợp lệ của họ

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

 // Hàm kiểm tra tính hợp lệ của họ
const validateFirstName = (text) => {
  const isValid =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$/.test(
      text
    ) || text === userData?.firstName; // Cho phép ký tự tiếng Việt hoặc giống giá trị gốc

  setFirstName(text); // Cập nhật giá trị
  setIsFirstNameValid(isValid); // Cập nhật trạng thái hợp lệ
};

// Hàm kiểm tra tính hợp lệ của tên
const validateLastName = (text) => {
  const isValid =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$/.test(
      text
    ) || text === userData?.lastName; // Cho phép ký tự tiếng Việt hoặc giống giá trị gốc

  setLastName(text); // Cập nhật giá trị
  setIsLastNameValid(isValid); // Cập nhật trạng thái hợp lệ
};


  // Cập nhật dữ liệu khi `userData` sẵn sàng
  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setIdUser(userData.idUser || "");
      setDescription(userData.Description || "");
      setAvatarUri(
        userData.avatar || require("../../../../../Picture/defaultavatar.jpg")
      );
    }
  }, [userData]);

  // Kiểm tra sự thay đổi dữ liệu
  useEffect(() => {
    const isDataChanged =
      firstName !== userData?.firstName ||
      lastName !== userData?.lastName ||
      idUser !== userData?.idUser ||
      description !== userData?.Description ||
      avatarUri !== userData?.avatar;

    setSaveEnabled(isDataChanged);
  }, [firstName, lastName, idUser, description, avatarUri]);

  // Kiểm tra tên người dùng
  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.post(`${BASE_URL}:5000/user/checkNameUser`, {
        idUser,
      });

      const { exists } = response.data;

      if (exists && idUser !== userData?.idUser) {
        setIsUsernameTaken(true);
        showNotification("Tên người dùng đã tồn tại!", "error");
        return true;
      }

      setIsUsernameTaken(false);
      return false;
    } catch (error) {
      showNotification("Có lỗi xảy ra khi kiểm tra tên người dùng!", "error");
      return true;
    }
  };

  // Upload avatar
  const handleImageUpload = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append("img", {
        uri: imageUri,
        type: "image/jpeg",
        name: "avatar.jpg",
      });

      const uploadResponse = await axios.post(
        `${BASE_URL}:5000/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return uploadResponse.data.path;
    } catch (error) {
      showNotification("Có lỗi xảy ra khi upload ảnh!", "error");
      return null;
    }
  };

  // Chọn ảnh
  const chooseImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showNotification("Ứng dụng cần quyền truy cập thư viện ảnh!", "error");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setAvatarUri(imageUri);
      }
    } catch (error) {
      showNotification("Không thể chọn ảnh, vui lòng thử lại!", "error");
    }
  };

  // Lưu thông tin
  const handleSave = async () => {
    setIsLoading(true);

    const isUsernameTaken = await checkUsernameAvailability();
    if (isUsernameTaken) {
      setIsLoading(false);
      return;
    }

    let finalAvatarUri = avatarUri;
    if (avatarUri !== userData?.avatar) {
      const uploadedAvatar = await handleImageUpload(avatarUri);
      if (uploadedAvatar) {
        finalAvatarUri = uploadedAvatar;
      } else {
        setIsLoading(false);
        return;
      }
    }

    try {
      const updateData = {
        firstName,
        lastName,
        idUser,
        Description: description,
        avatar: finalAvatarUri,
      };

      const response = await axios.put(
        `${BASE_URL}:5000/user/updateUser/${userData._id}`,
        updateData
      );

      if (response.status === 200) {
        showNotification("Cập nhật thông tin thành công!", "success");

        // Làm mới thông tin người dùng
        await fetchUserData(userData.email, true);

        navigation.goBack();
      } else {
        showNotification("Cập nhật thông tin thất bại!", "error");
      }
    } catch (error) {
      showNotification("Không thể cập nhật thông tin!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu chưa có `userData`, hiển thị màn hình loading
  if (!userData) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.red} />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("../../../../../Icon/back.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>Chỉnh sửa hồ sơ</Text>
            <TouchableOpacity
              style={[
                styles.doneButton,
                { backgroundColor: isSaveEnabled ? colors.red : colors.gray },
              ]}
              disabled={!isSaveEnabled}
              onPress={handleSave}
            >
              <Text 
                style={[
                  styles.doneButtonText,
                  { color: isSaveEnabled ? colors.white : colors.darkgray },
                ]}
              
              >Xong</Text>
            </TouchableOpacity>
          </View>

          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.red} />
            </View>
          )}

          {/* Profile Image Section */}
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: avatarUri }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton} onPress={chooseImage}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tên</Text>
            <TextInput
              style={[
                styles.input,
                !isFirstNameValid && { borderColor: "red" }, // Thêm màu viền đỏ nếu không hợp lệ
              ]}
              placeholder="Nhập tên của bạn"
              value={firstName}
              onChangeText={validateFirstName} // Gọi hàm kiểm tra khi nhập
              selectionColor="red" // Màu con trỏ thành đỏ
            />

            <Text style={styles.inputLabel}>Họ</Text>
            <TextInput
              style={[
                styles.input,
                !isLastNameValid && { borderColor: "red" }, // Thêm màu viền đỏ nếu không hợp lệ
              ]}
              placeholder="Nhập họ của bạn"
              value={lastName}
              onChangeText={validateLastName} 
              selectionColor="red" // Màu con trỏ thành đỏ
            />

            <Text style={styles.inputLabel}>Tên người dùng</Text>
            <TextInput
              style={[
                styles.input,
                isUsernameTaken ? { borderColor: "red" } : {},
              ]}
              placeholder="Nhập tên riêng của bạn"
              value={idUser}
              onChangeText={setIdUser}
              selectionColor="red" // Màu con trỏ thành đỏ
            />

            <Text style={styles.inputLabel}>Giới thiệu</Text>
            <TouchableOpacity
              style={styles.descriptionButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.descriptionText}>
                {description || "Nhấn để nhập giới thiệu..."}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal for Description */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Nhập Giới Thiệu</Text>
                <TextInput
                  style={styles.modalInput}
                  multiline={true}
                  placeholder="Nhập giới thiệu của bạn..."
                  value={tempDescription}
                  onChangeText={setTempDescription}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalCancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalSaveButton}
                    onPress={() => {
                      setDescription(tempDescription);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalSaveButtonText}>Lưu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
