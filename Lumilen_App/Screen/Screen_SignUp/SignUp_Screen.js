import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../Css/SignUp_css";
import useFetch from "../../Hook/useEffetch";
const SignUp = ({ navigation }) => {
  const { data: dataTest } = useFetch("http://192.168.1.5:5000/User/");
  // console.log(dataTest);
  return (
    <View style={styles.signUp1}>
      <View style={styles.image}>
        <View style={styles.imageParent}>
          <Image
            style={styles.imageIcon}
            source={require("../../Picture/image_1.png")}
          />
          <Image
            style={styles.imageIcon1}
            source={require("../../Picture/image_2.png")}
          />
          <Image
            style={styles.imageIcon2}
            source={require("../../Picture/image_3.png")}
          />
          <Image
            style={styles.imageIcon3}
            source={require("../../Picture/image_4.png")}
          />
          <Image
            style={styles.imageIcon4}
            source={require("../../Picture/image_5.png")}
          />
          <Image
            style={styles.imageIcon5}
            source={require("../../Picture/image_6.png")}
          />
          <Image
            style={styles.imageIcon6}
            source={require("../../Picture/image_7.png")}
          />
          <Image
            style={styles.imageIcon7}
            source={require("../../Picture/image_8.png")}
          />
          <Image
            style={styles.imageIcon8}
            source={require("../../Picture/image_9.png")}
          />
        </View>

        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "#fff"]} // Màu bắt đầu từ trong suốt (ở dưới) đến trắng (ở trên)
          end={{ x: 0, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.overlay}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.logo}>
          <Image
            style={styles.logoIcon}
            source={require("../../Picture/logo.png")}
          />
          <Text style={styles.welcomeToPinterest}>Welcome to Pinterest</Text>
        </View>
        <View style={styles.buttonGroup}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonBase}
              onPress={() => navigation.navigate("SignUp1")}
            >
              <Text style={styles.button}>
              {dataTest && dataTest.length > 0 ? dataTest[0].name : "No data available"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons1}>
            <TouchableOpacity
              style={styles.buttonBase1}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.button}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.terms}>
          <View style={styles.byContinuingYouAgreeToPiParent}>
            <Text style={styles.byContinuingYou}>
              By continuing, you agree to Pinterest’s
            </Text>
            <Text style={styles.termsOfService}>Terms of Service</Text>
            <Text style={styles.byContinuingYou}>and</Text>
          </View>
          <View style={styles.byContinuingYouAgreeToPiParent}>
            <Text style={styles.byContinuingYou}>
              acknowledge you’ve read our
            </Text>
            <Text style={styles.termsOfService}>Privacy Policy</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

// import React from 'react';
// import { View, Text, ActivityIndicator, Button , StatusBar} from 'react-native';
// import useEfetch from '../../Hook/useEffetch';

// const UserList = () => {
//   const { data: users, loading, error, refetch } = useEfetch('http://localhost:5000/users');

//   if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
//   if (error) return <Text>Error fetching data: {error.message}</Text>;

//   return (
//     <View>
//       <StatusBar hidden={false} />
//       {users && users.length > 0 ? (
//         users.map((user) => <Text key={user.id}>{user.name}</Text>)
//       ) : (
//         <Text>No users found</Text>
//       )}
//       <Button title="Refetch Data" onPress={refetch} />
//     </View>
//   );
// };

// export default UserList;
