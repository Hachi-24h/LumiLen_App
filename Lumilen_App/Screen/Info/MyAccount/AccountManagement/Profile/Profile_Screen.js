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
  const userIDshow = route.params.userID;
  console.log("userIDshow :", userIDshow);
  const { width, height } = Dimensions.get("window");
  const [userShow, setUserShow] = useState(null); // Lưu thông tin người dùng
  const DefaultAvatar = require("../../../../../Picture/defaulttableuser.jpg");
  const avatar = userShow ? userShow.avatar : null;
  const { userData, fetchUserData } = useContext(UserContext);
  const userIdCurrent = userData ? userData._id : null;
  const userId = userShow ? userShow.idUser : null;
  const email = userData ? userData.email : null;
  console.log("email :", email);
  const [isSameUser, setIsSameUser] = useState(false);
  const name = userShow ? userShow.firstName + " " + userData.lastName : null;
  const follower = userShow?.followers?.length || 0;
  const following = userShow?.following?.length || 0;
  const originalListTableUser = userShow ? userShow.collectionUser : [];
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

  const handleSave = async () => {
    try {
      if (!newTableName) {
        showNotification("Vui lòng nhập tên bảng", "error");
        return;
      }
      const statustab = newStatus ? "block" : "unblock";

      console.log("IsTableSelected :", IsTableSelected);
      const dataupdate = {
        userId: userIdCurrent,
        tableUserId: IsTableSelected,
        newName: newTableName,
        newStatus: statustab,
      };
      console.log("dataupdate :", dataupdate);
      const response = await axios.put(
        `${BASE_URL}:5000/tableUser/updateTableUser`,
        dataupdate
      );

      // Kiểm tra nếu phản hồi thành công
      if (response.status === 200) {
       
        await fetchUserData(email,true);
        showNotification("Cập nhật bảng thành công", "success");
        setModalVisible(false);
        setEditModalVisible(false);
      } else {
        Alert.alert(
          "Lỗi",
          response.data.message || "Có lỗi xảy ra khi cập nhật."
        );
      }
    } catch (error) {
      console.error("Lỗi khi lưu bảng:", error);
      showNotification("Có lỗi xảy ra hãy làm lại nhé ", "error");
    }
  };

  // Hàm cập nhật thông tin bảng
  const handleEdit = () => {
    onEdit(table._id, newTableName, newStatus);
    setEditModalVisible(false);
  };

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
      if (userIdCurrent === userIDshow) {
        setIsSameUser(true); // Cả hai userID giống nhau
      } else {
        setIsSameUser(false); // Cả hai userID khác nhau
      }
    }
  }, [userId, userIDshow]);

  useEffect(() => {
    if (isSameUser !== true) {
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
    // console.log("item :", item);
    const numberOfImages = Array.isArray(item.listAnh)
      ? item.listAnh.length
      : 0;
    
    const styleIcon = item.statusTab === "block" ? styles.lock : styles.null;
    // Kiểm tra nếu item.listAnh là mảng hợp lệ trước khi sử dụng
    const images = [
      item.listAnh && item.listAnh[0]
        ? { uri: item.listAnh[0].uri }
        : DefaultAvatar,
      item.listAnh && item.listAnh[1]
        ? { uri: item.listAnh[1].uri }
        : DefaultAvatar,
      item.listAnh && item.listAnh[2]
        ? { uri: item.listAnh[2].uri }
        : DefaultAvatar,
    ];

    return (
      <View style={styles.boardItem}>
        <StatusBar hidden={false} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TableDetail", {
              tableId: item._id,
              userId: userIdCurrent,
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
          {isSameUser === true && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setIsTableSelected(item._id);
                setNewTableName(item.name);
              }}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="black" />
            </TouchableOpacity>
          )}
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
        <StatusBar hidden={false} />

        <TouchableOpacity
          onPress={
            isSameUser === true
              ? () => navigation.navigate("ChangeAvatar")
              : null
          }
        >
          <Image
            source={avatar ? { uri: avatar } : DefaultAvatar}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}> {name} </Text>
        <Text style={styles.userID}>@{userId}</Text>
        <Text style={styles.followInfo}>
          {follower} người theo dõi · {following} đang theo dõi
        </Text>
        {isSameUser === true && (
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate("UpdateInfo")}
          >
            <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.ListTab}>
        {displayedListTableUser.length === 0 ? (
          // Nếu không có phần tử nào trong displayedListTableUser
          <View style={styles.emptyMessageContainer }>
            <Text style={{marginTop:height*0.12, fontSize:height*0.022}}>
              Không có bảng nào để hiển thị!!
            </Text>
          </View>
        ) : (
          // Nếu có phần tử, hiển thị FlatList
          <FlatList
            data={displayedListTableUser}
            renderItem={renderTableUser}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.boardList}
            keyExtractor={(item) =>
              item._id ? item._id.toString() : Math.random().toString()
            } // Đảm bảo key là duy nhất
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
            <View
              style={{
                flexDirection: "row",
                width: width * 0.9,
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.titlecss}>Trạng thái bảng</Text>
              <Switch
                value={newStatus}
                style={{ marginTop: height * 0.005 }}
                onValueChange={(value) => setNewStatus(value)}
                thumbColor={newStatus ? "#34c759" : "#ff3b30"} // Adjust thumb color based on status
                trackColor={{ false: "#d3d3d3", true: "#81b0ff" }} // Track color for different states
              />
            </View>

            {/* Lưu và đóng modal */}
            <Pressable
              style={styles.modalOption}
              onPress={() => {
                handleSave();
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
