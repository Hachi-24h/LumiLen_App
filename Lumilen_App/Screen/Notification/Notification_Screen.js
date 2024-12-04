import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles from "../../Css/Notification_Css";
import Footer from "../Other/footer";
import { UserContext } from "../../Hook/UserContext";
import axios from 'axios'; // Bạn cần cài axios để gửi yêu cầu HTTP
import BASE_URL from "../../config/IpAdress";

const NotificationScreen = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Biến để quản lý trạng thái loading
  const avatar = userData ? userData.avatar : null;

  // Fetch notifications khi component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}:5000/notification/allNotifications`);
        setNotifications(response.data.notifications); // Cập nhật dữ liệu thông báo từ API
      } catch (error) {
        // Kiểm tra lỗi, nếu là lỗi không có thông báo, chỉ đơn giản là bỏ qua
        if (error.response && error.response.data && error.response.data.message === "Chưa có thông báo nào.") {
          setNotifications([]); // Đảm bảo notifications là mảng trống nếu không có dữ liệu
        } else {
          console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
        }
      } finally {
        setLoading(false); // Đặt loading thành false khi lấy xong dữ liệu
      }
    };

    fetchNotifications();
  }, []); // Chạy một lần khi component được mount
  
  // Hàm tạo thông báo khi ai đó ghim ảnh của bạn
  const sendNotification = async (user1Id, pictureId) => {
    try {
      const message = `${user1Id} vừa ghim ảnh của bạn!`; // Nội dung thông báo
      const userID = userData._id; // ID của bạn (người nhận thông báo)
      
      // Gửi yêu cầu tạo thông báo
      await axios.post(`${BASE_URL}:5000/notification/addNotification`, {
        mess: message,
        userID,  // ID người nhận (bạn)
        picture: pictureId,  // ID của ảnh bị ghim
      });

      // Cập nhật lại danh sách thông báo
      fetchNotifications();
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Mark a notification as read
  const handleMarkAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif._id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Render each notification item
  const renderNotification = ({ item }) => (
    <View
      style={[styles.notificationItem, item.isRead && styles.readNotification]}
    >
      <Text style={styles.notificationText}>{item.mess}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>

      {/* If the notification is unread, show "Mark as Read" button */}
      {!item.isRead && (
        <TouchableOpacity
          onPress={() => handleMarkAsRead(item._id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.markAsRead, item.isRead && styles.markAsReadPressed]}>
            Đánh dấu đã đọc
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải thông báo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Báo</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Hiện tại bạn chưa có thông báo nào. Hãy quay lại sau nhé!
            </Text>
            <Image 
              source={require('../../Picture/defaulttableuser.jpg')} 
              style={styles.emptyImage} 
            />
          </View>
        }
      />
      <Footer
        navigation={navigation}
        notifications={notifications} // Truyền notifications vào Footer
        avatar={avatar}
        initialSelectedIcon={"Notification"}
        namePage={"Trang Notification"}
      />
    </View>
  );
};

export default NotificationScreen;
