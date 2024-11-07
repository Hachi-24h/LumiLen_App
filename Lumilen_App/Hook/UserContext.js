import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../IpAdress";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Hàm tải dữ liệu người dùng với email động
  const fetchUserData = async (email) => {
    try {
 
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        // Nếu không có dữ liệu lưu trữ, gọi API với email người dùng
        const response = await axios.get(`${BASE_URL}/user/findUser?email=${email}`);
        setUserData(response.data);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data)); // Lưu dữ liệu vào AsyncStorage
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
