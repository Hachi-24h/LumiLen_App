import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens"; // Để tối ưu hóa màn hình
import { AppRegistry } from "react-native";
// Gọi enableScreens để kích hoạt tối ưu hóa
enableScreens();

import SignUp from "./Screen/Screen_SignUp/SignUp_Screen";
import SignUp1 from "./Screen/Screen_SignUp/SignUp_01_Screen";
import SignUp2 from "./Screen/Screen_SignUp/SignUp_02_Screen";
import SignUp3 from "./Screen/Screen_SignUp/SignUp_03_Screen";
import SignUp4 from "./Screen/Screen_SignUp/SignUp_04_Screen";
import Search from "./Screen/Search/Search_Screen";
import SignIn from "./Screen/SignIn/SignIn_Screen";
import HomeTabs from "./Screen/Home/Home_Screen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            title: "HomeTabs",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "SignUp",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp1"
          component={SignUp1}
          options={{
            title: "SignUp 01",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp2"
          component={SignUp2}
          options={{
            title: "SignUp 02",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp3"
          component={SignUp3}
          options={{
            title: "SignUp 03",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp4"
          component={SignUp4}
          options={{
            title: "SignUp 04",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: "SignIn",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent("main", () => App);
export default App;
