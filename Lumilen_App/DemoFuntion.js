// SomeScreen.js
import React from "react";
import { Text, View } from "react-native";
import { useNavigationState } from "@react-navigation/native";  // Hook để lấy trạng thái navigation
import PageTransition from "./Custom/PageTransition"; // Đảm bảo import đúng đường dẫn
import Footer from "./Screen/Other/footer";
const SomeScreen = () => {
  const navigationState = useNavigationState((state) => state);  // Lấy trạng thái navigation
  const previousRouteName = navigationState?.routes[navigationState.index - 1]?.name;

  // Chọn effect dựa trên màn hình trước đó
  const transitionEffect = previousRouteName === 'Home' ? 4 : previousRouteName === 'Info' ? 3 : 1;

  return (
    <PageTransition effect={transitionEffect} duration={500} delay={0}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24 }}>Chào mừng đến với trang mới!</Text>
        <Footer />
      </View>
    </PageTransition>
  );
};

export default SomeScreen;
