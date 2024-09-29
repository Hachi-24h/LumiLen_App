import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Css/Home_Css'; 

const HomeScreen = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Lưới hình ảnh */}
        <View style={styles.imageGrid}>
          <View style={styles.leftColumn}>
            {/* Ảnh lớn đầu tiên */}
            <View style={styles.imageWrapper}>
              <Image style={styles.imageLarge} source={require('../Picture/image_1.png')} />
              <View style={styles.likeContainer}>
                <Text style={styles.likeText}>2</Text>
                <Ionicons name="chatbubble-outline" size={18} color="white" />
              </View>
              <TouchableOpacity style={styles.moreOptions}>
                <Ionicons name="ellipsis-horizontal" size={18} color="white" />
              </TouchableOpacity>
            </View>
  
            {/* Ảnh nhỏ */}
            <Image style={styles.imageLarge} source={require('../Picture/image_3.png')} />
          </View>
  
          <View style={styles.rightColumn}>
            {/* Ảnh lớn */}
            <View style={styles.imageWrapper}>
              <Image style={styles.imageSmall} source={require('../Picture/image_2.png')} />
              <TouchableOpacity style={styles.moreOptions}>
                <Ionicons name="ellipsis-horizontal" size={18} color="white" />
              </TouchableOpacity>
            </View>
            {/* Ảnh nhỏ */}
            <Image style={styles.imageLarge} source={require('../Picture/image_4.png')} />
          </View>
        </View>
  
        {/* Thông tin người dùng */}
        <View style={styles.userInfo}>
          <Image style={styles.avatar} source={require('../Picture/image_1.png')} />
          <Text style={styles.userName}>TonyMeccalV</Text>
          <Text style={styles.likes}>❤️ 6.0k</Text>
        </View>
  
        {/* Lưới hình ảnh tiếp theo */}
        <View style={styles.imageGrid}>
          <View style={styles.leftColumn}>
            <Image style={styles.imageLarge} source={require('../Picture/image_5.png')} />
            <Image style={styles.imageSmall} source={require('../Picture/image_6.png')} />
          </View>
          <View style={styles.rightColumn}>
            <Image style={styles.imageSmall} source={require('../Picture/image_7.png')} />
          </View>
        </View>
      </ScrollView>
    );
  };
  

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Search') {
              iconName = 'search-outline';
            } else if (route.name === 'Create') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications-outline';
            } else if (route.name === 'Info') {
              iconName = 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={() => <View><Text>Search</Text></View>} />
        <Tab.Screen name="Create" component={() => <View><Text>Create</Text></View>} />
        <Tab.Screen name="Notifications" component={() => <View><Text>Notifications</Text></View>} />
        <Tab.Screen name="Info" component={() => <View><Text>Info</Text></View>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
