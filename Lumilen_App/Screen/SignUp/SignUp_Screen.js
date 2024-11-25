import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../Css/SignUp_css";
import useFetch from "../../Hook/useEffetch";

const SignUp = ({ navigation }) => {
  const { data: dataTest } = useFetch("http://192.168.114.1:5000/User/");

  useEffect(() => {
    // Ngăn người dùng quay lại màn hình trước đó
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // Chặn hành động quay lại
    });

    // Dọn dẹp listener khi component bị unmount
    return unsubscribe;
  }, [navigation]);

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
                {dataTest && dataTest.length > 0 ? dataTest[0].name : "Sign Up"}
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
