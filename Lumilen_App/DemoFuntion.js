import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import BASE_URL from "./IpAdress";

const UserDetailScreen = ({ route }) => {
  const userId = "672cd1f6ea6637803a6b8424"; 
  const [user, setUser] = useState(null); // Trạng thái lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Gọi API để lấy thông tin người dùng
        const response = await fetch(`${BASE_URL}:5000/user/findUserById/${userId}`);
        const data = await response.json();
        console.log("Data:", data);
        if (response.ok) {
          setUser(data); // Lưu thông tin người dùng vào state
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false); // Tắt trạng thái tải
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải thông tin người dùng...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy người dùng</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar || "https://via.placeholder.com/150" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default UserDetailScreen;
