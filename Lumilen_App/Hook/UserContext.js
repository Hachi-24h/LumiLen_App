import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../IpAdress";

 
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
 
 
  // Hàm tải dữ liệu người dùng với email động
  const fetchUserData = useCallback(async (email, forceRefresh = false) => {
    try { 
      // Nếu cần tải mới dữ liệu, xóa dữ liệu cũ từ `AsyncStorage`
      if (forceRefresh) {
        await AsyncStorage.removeItem("userData");
        console.log("Cleared user data from AsyncStorage");
      }
 
      // Kiểm tra xem dữ liệu đã lưu trong `AsyncStorage` chưa
      const storedData = await AsyncStorage.getItem("userData");
 
      if (storedData && !forceRefresh) {
        // Nếu có dữ liệu trong `AsyncStorage` và không cần tải lại, dùng dữ liệu từ `AsyncStorage`
        setUserData(JSON.parse(storedData));
      } else {
        // Nếu không có dữ liệu hoặc cần tải lại, gọi API với email để lấy dữ liệu mới
        const response = await axios.get(`${BASE_URL}/user/findUserByEmail`, {
          params: { email }
        });
 
        // Kiểm tra dữ liệu trả về có hợp lệ không
        if (response.data) {
          setUserData(response.data);
          await AsyncStorage.setItem("userData", JSON.stringify(response.data)); // Lưu vào `AsyncStorage`
        } else {
          console.error("No user data returned from API.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, []);
 
  // Hàm xóa dữ liệu người dùng khỏi `AsyncStorage` và trạng thái `userData`
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUserData(null);
    } catch (error) {
      console.error("Failed to clear user data:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, fetchUserData, clearUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};