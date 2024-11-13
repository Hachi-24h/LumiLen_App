import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../IpAdress";
 
export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // Hàm tải dữ liệu người dùng với email động
  const fetchUserData = useCallback(
    async (email, forceRefresh = true) => { // luôn forceRefresh để tải lại dữ liệu
      setLoading(true); // Bắt đầu trạng thái tải
      try {
        if (forceRefresh) {
          await AsyncStorage.removeItem("userData");
          console.log("Cleared user data from AsyncStorage");
        }
 
        const storedData = await AsyncStorage.getItem("userData");
 
        if (storedData && !forceRefresh) {
          setUserData(JSON.parse(storedData));
        } else {
          const response = await axios.get(`${BASE_URL}/user/findUserByEmail`, {
            params: { email }
          });
 
          if (response.data) {
            setUserData(response.data);
            await AsyncStorage.setItem("userData", JSON.stringify(response.data));
          } else {
            console.error("No user data returned from API.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    },
    []
  );
 
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
 
 