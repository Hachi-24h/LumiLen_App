import 'react-native-gesture-handler';
import React from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { UserProvider } from "./Hook/UserContext";
import Screens from "./config/ImportScreen";
import { LogBox } from "react-native";

// Tắt cảnh báo cụ thể
LogBox.ignoreLogs([
  "expo-image-picker", // Hoặc thêm phần thông báo cụ thể
]);
LogBox.ignoreAllLogs(false); // Hiển thị tất cả cảnh báo
enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
         
          {Object.keys(Screens).map((screen) => (
            <Stack.Screen
              key={screen}
              name={screen}
              component={Screens[screen]}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>

        <FlashMessage position="top" />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
