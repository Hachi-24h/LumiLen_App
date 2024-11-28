import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../config/IpAdress";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  // Hàm tải dữ liệu người dùng với email động
  const fetchUserData = useCallback(async (email, forceRefresh = false) => {
    try {
      setLoading(true); // Bắt đầu tải dữ liệu
  
      // Nếu cần tải mới dữ liệu, xóa dữ liệu cũ từ `AsyncStorage`
      if (forceRefresh) {
        await AsyncStorage.removeItem("userData");
      }
  
      // Gọi API lấy dữ liệu người dùng
      const response = await axios.get(`${BASE_URL}:5000/user/findUserByEmail`, {
        params: { email },
      });
  
      if (response.data) {
        // Cập nhật trạng thái `userData`
        setUserData(response.data);
  
        // Lưu dữ liệu mới vào `AsyncStorage`
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      } else {
        console.error("No user data returned from API.");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  }, []);

  const clearUserData = async () => {
    try {
      console.log("Đang xóa dữ liệu người dùng...");
      await AsyncStorage.removeItem("userData");
      console.log("Dữ liệu người dùng đã bị xóa khỏi AsyncStorage.");
      setUserData(null); // Đảm bảo set lại null cho userData trong context
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu người dùng:", error);
    }
  };
  
  
  

  return (
    <UserContext.Provider value={{ userData, fetchUserData, clearUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
