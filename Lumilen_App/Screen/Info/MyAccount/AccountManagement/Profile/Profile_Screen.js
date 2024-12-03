import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  StatusBar,
  Modal,
  Alert,
  TextInput,
  Dimensions,
  visible,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../../../../../Css/Proflie_Css";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Import axios để gọi API
import { UserContext } from "../../../../../Hook/UserContext";
import BASE_URL from "../../../../../config/IpAdress";
import { showNotification } from "../../../../../Custom/notification";
const ProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const userIDshow = "672cd1f6ea6637803a6b8424"; // Lấy userID từ route.params
  const {width, height} = Dimensions.get("window");
  const [userShow, setUserShow] = useState(null); // Lưu thông tin người dùng
  const DefaultAvatar = require("../../../../../Picture/defaulttableuser.jpg");
  const { userData, fetchUserData } = useContext(UserContext);
  const userIdCurrent = userData ? userData._id : null;
  const userId = userData ? userData.idUser : null;
  const email = userData ? userData.email : null;
  const [isSameUser, setIsSameUser] = useState(false);
  const name = userData ? userData.firstName + " " + userData.lastName : null;
  const follower = userData ? userData.followers.length : 0;
  const following = userData ? userData.following.length : 0;
  const originalListTableUser = userData ? userData.collectionUser : [];
  const [displayedListTableUser, setDisplayedListTableUser] = useState(
    originalListTableUser
  );
 
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [IsTableSelected, setIsTableSelected] = useState(null);
  const [newTableName, setNewTableName] = useState(null); // Tên bảng mới
  const [newStatus, setNewStatus] = useState(Boolean); // Trạng thái bảng mới
  const handleDelete = (userId, tableUserId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa bảng này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `${BASE_URL}:5000/tableUser/deleteTableUser`,
                {
                  data: {
                    userId,
                    tableUserId,
                  },
                }
              );

              if (response.status === 200) {
                showNotification("Xóa bảng thành công", "success");
                await fetchUserData(email);
                setModalVisible(false);
              } else {
                Alert.alert(
                  "Lỗi",
                  response.data.message || "Có lỗi xảy ra khi xóa bảng."
                );
              }
            } catch (error) {
              console.error("Lỗi khi xóa bảng:", error);
              Alert.alert("Lỗi", "Không thể xóa bảng, vui lòng thử lại.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  // Hàm cập nhật thông tin bảng
  const handleEdit = () => {
    onEdit(table._id, newTableName, newStatus);
    setEditModalVisible(false);
  };

  const ClickHandleDeleteTable = (idTable) => {
    setModalVisible(true);
    setIsTableSelected(idTable);
  };
  console.log("idTableSelected :", IsTableSelected);
  useEffect(() => {
    // Hàm gọi API để lấy thông tin người dùng
    const fetchUserById = async () => {
      try {
        const linkapi = `${BASE_URL}:5000/user/findUserById/${userIDshow}`;

        const response = await axios.get(linkapi);
        setUserShow(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error.message);
        setUserShow(null);
      }
    };

    if (userIDshow) {
      fetchUserById();
    }
  }, [userIDshow]);

  // kiểm tra user xem có phải là user hiện tại không
  useEffect(() => {
    if (userIdCurrent && userIDshow) {
      console.log("userIdCure :", userIdCurrent);
      console.log("userIDshow :", userIDshow);
      if (userIdCurrent === userIDshow) {
        setIsSameUser(true); // Cả hai userID giống nhau
      } else {
        setIsSameUser(false); // Cả hai userID khác nhau
      }
    }
  }, [userId, userIDshow]);

  useEffect(() => {
    console.log("trang thai user :", isSameUser);
    if (isSameUser === false) {
      const filteredList = originalListTableUser.filter(
        (table) => table.statusTab === "unblock"
      );
      setDisplayedListTableUser(filteredList);
    } else {
      // Nếu là user giống nhau thì giữ nguyên danh sách
      setDisplayedListTableUser(originalListTableUser);
    }
  }, [isSameUser, originalListTableUser]);

  const renderTableUser = ({ item }) => {
    const tableName = item.name;
    const numberOfImages = item.listAnh.length;
    const styleIcon = item.statusTab === "block" ? styles.lock : styles.null;

    const images = [
      item.listAnh[0] ? { uri: item.listAnh[0].uri } : DefaultAvatar,
      item.listAnh[1] ? { uri: item.listAnh[1].uri } : DefaultAvatar,
      item.listAnh[2] ? { uri: item.listAnh[2].uri } : DefaultAvatar,
    ];

    return (
      <View style={styles.boardItem}>
        <StatusBar hidden={false} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TableDetail", {
              tableId: item._id,
              userId: userId,
            })
          }
          style={styles.boardImage}
        >
          <View style={styles.boardImage}>
            <View style={{ width: "50%", height: "100%", paddingRight: 1 }}>
              <Image source={images[0]} style={styles.img} />
              <View style={styleIcon}>
                <Image
                  source={require("../../../../../Icon/lock.png")}
                  style={styles.lockIcon}
                />
              </View>
            </View>
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <View style={{ width: "100%", height: "50%", paddingBottom: 1 }}>
                <Image source={images[1]} style={styles.img} />
              </View>
              <View style={{ width: "100%", height: "50%" }}>
                <Image source={images[2]} style={styles.img} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <View>
            <Text style={styles.boardTitle}>{tableName}</Text>
            <Text style={styles.boardDetails}>{numberOfImages} ghim</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setIsTableSelected(item._id);
              setNewTableName(item.name);
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="share-social" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ChangeAvatar")}>
          {/* Hiển thị avatar mới nếu có, nếu không hiển thị ảnh mặc định */}
          <Image
            source={
              userData?.avatar
                ? { uri: userData.avatar }
                : require("../../../../../Picture/image_1.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}> {name} </Text>
        <Text style={styles.userID}>@{userId}</Text>
        <Text style={styles.followInfo}>
          {follower} người theo dõi · {following} đang theo dõi
        </Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("UpdateInfo")}
        >
          <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ListTab}>
        {displayedListTableUser.length === 0 ? (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>
              {searchQuery
                ? "Không có bảng nào hic hic . đi tạo bảng ngay nào"
                : "Không có bảng nào , tạo ngay nào"}
            </Text>
          </View>
        ) : (
          <FlatList
            data={displayedListTableUser}
            renderItem={renderTableUser}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.boardList}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Lựa chọn hành động</Text>
              <Pressable
                style={styles.modalOption}
                onPress={() => handleDelete(userIdCurrent, IsTableSelected)} // Truyền vào hàm như một callback
              >
                <Text style={styles.modalOptionText}>Xóa bảng này</Text>
              </Pressable>

              <Pressable
                style={styles.modalOption}
                onPress={() => setEditModalVisible(true)}
              >
                <Text style={styles.modalOptionText}>Chỉnh sửa bảng</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>Đóng</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible} // Mở modal khi nhấn vào "Chỉnh sửa bảng"
        onRequestClose={() => setEditModalVisible(false)} // Đóng modal khi nhấn nút back (Android)
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa bảng</Text>

            {/* Tên bảng */}
            <Text style={styles.titlecss}>Tên bảng</Text>
            <TextInput
              style={styles.input}
              value={newTableName}
              onChangeText={setNewTableName}
              placeholder="Tên bảng mới"
            />

            {/* Trạng thái bảng */}
            <View style={{flexDirection:"row", width:width*0.9, justifyContent:"space-between"}}>
              <Text style={styles.titlecss}>Trạng thái bảng</Text>
              <Switch
                value={newStatus}
                style={{marginTop:height*0.005}}
                onValueChange={(value) => setNewStatus(value)}
                thumbColor={newStatus ? "#34c759" : "#ff3b30"} // Adjust thumb color based on status
                trackColor={{ false: "#d3d3d3", true: "#81b0ff" }} // Track color for different states
              />
            </View>

            {/* Lưu và đóng modal */}
            <Pressable
              style={styles.modalOption}
              onPress={() => {
               
               
              }}
            >
              <Text style={styles.modalOptionText1}>Lưu</Text>
            </Pressable>

            <Pressable
              onPress={() => setEditModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
