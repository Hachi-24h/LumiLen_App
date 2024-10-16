import React from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "./Screen/Home/Home_Screen";
import SignUp from "./Screen/Screen_SignUp/SignUp_Screen";
import SignUp1 from "./Screen/Screen_SignUp/SignUp_01_Screen";
import SignUp2 from "./Screen/Screen_SignUp/SignUp_02_Screen";
import SignUp3 from "./Screen/Screen_SignUp/SignUp_03_Screen";
import SignUp4 from "./Screen/Screen_SignUp/SignUp_04_Screen";
import Search from "./Screen/Search/Search_Screen";
import SignIn from "./Screen/SignIn/SignIn_Screen";
import Info_Bang from "./Screen/Info/Info_Bang_Screen";
import Info_Ghim from "./Screen/Info/Info_Ghim_Screen";
import AccountSetting from "./Screen/Info/MyAccount/AccountSetting_Screen";
import AccountManagement from "./Screen/Info/MyAccount/AccountManagement/AccountManagement_Screen";
import PersonalInfo from "./Screen/Info/MyAccount/AccountManagement/AccountSetting/PersonalInfo/PersonalInfo_Screen";
import DOBInfo from "./Screen/Info/MyAccount/AccountManagement/AccountSetting/PersonalInfo/DayOfBirth_Screen";
import GenderInfo from "./Screen/Info/MyAccount/AccountManagement/AccountSetting/PersonalInfo/GenderInfo_Screen"
import CountrySelector from "./Screen/Info/MyAccount/AccountManagement/AccountSetting/PersonalInfo/GenderInfo_Screen";
import UpdateEmail from "./Screen/Info/MyAccount/AccountManagement/AccountSetting/UpdateEmail_Screen";
import ChangePassword from "./Screen/Info/MyAccount/AccountManagement/AccountSetting/ChangePassword_Screen";
import Profile from "./Screen/Info/MyAccount/AccountManagement/Profile/Profile_Screen";
import ChangeAvatar from "./Screen/Info/MyAccount/AccountManagement/Profile/ChangeAvatar_Screen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Info"
          component={Info_Bang}
          options={{
            title: "Info",
            headerShown: false, // Ẩn header
          }}
        />  
        <Stack.Screen
          name="AccountSetting"
          component={AccountSetting}
          options={{
            title: "Account Setting",
            headerShown: false, // Ẩn header
          }}
        />
        <Stack.Screen
          name="AccountManagement"
          component={AccountManagement}
          options={{
            title: "Account Management",
            headerShown: false, // Ẩn header
          }}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          options={{
            title: "PersonalInfo",
            headerShown: false, // Ẩn header
          }}
        />
        <Stack.Screen
          name="DOBInfo"
          component={DOBInfo}
          options={{
            title: "DOBInfo",
            headerShown: false, // Ẩn header
          }}
        />
         <Stack.Screen
          name="GenderInfo"
          component={GenderInfo}
          options={{
            title: "GenderInfo",
            headerShown: false, // Ẩn header
          }}
        />
       <Stack.Screen
          name="CountrySelector"
          component={CountrySelector}
          options={{
            title: "CountrySelector",
            headerShown: false, // Ẩn header
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: "Search",
            headerShown: false, // Ẩn header
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
        <Stack.Screen
          name="Home"
          component={HomeTabs}  // Dùng HomeTabs thay cho Home
          options={{
            title: "Home",
            headerShown: false, // Ẩn header
          }}
        />
        <Stack.Screen
          name="UpdateEmail"
          component={UpdateEmail}
          options={{
            title: "UpdateEmail",
            headerShown: false, // Ẩn header
          }}
        />
       <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: "ChangePassword",
            headerShown: false, // Ẩn header
          }}
        />
        <Stack.Screen
          name="Info_Ghim"
          component={Info_Ghim}
          options={{
            title: "Info_Ghim",
            headerShown: false, // Ẩn header
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerShown: false, // Ẩn header
          }}
        />
        <Stack.Screen
          name="ChangeAvatar"
          component={ChangeAvatar}
          options={{
            title: "ChangeAvatar",
            headerShown: false, // Ẩn header
          }}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};


// testt adshksja

export default App;
