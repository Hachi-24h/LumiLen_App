import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./Screen/Screen_SignUp/SignUp_Screen";
import SignUp1 from "./Screen/Screen_SignUp/SignUp_01_Screen";
import SignUp2 from "./Screen/Screen_SignUp/SignUp_02_Screen";
import SignUp3 from "./Screen/Screen_SignUp/SignUp_03_Screen";
import SignUp4 from "./Screen/Screen_SignUp/SignUp_04_Screen";
import Search from "./Screen/Search/Search_Screen";
import SignIn from "./Screen/SignIn/SignIn_Screen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={Search}
          options={{
            title: "Search", 
            headerShown: false, 
          }}
          />
        <Stack.Screen name="SignUp" component={SignUp} 
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

export default App;
