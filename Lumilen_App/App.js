import React from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { UserProvider } from "./Hook/UserContext";
import Screens from "./ImportScreen";

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
