import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppConText } from "./AppConText";
import Logins from "./Logins";
import Registers from "./Registers";
import ListMovie from "./ListMovie";
import ItemMovie from "../Item/ItemMovie";
import Test1 from "./Test1";
import Test2 from "./Test2";
import ProfileScreen from "./ProfileScreen";
import ForgotEmail from "./ForgotEmail";
import ProfileSettings from "./ProfileSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailMovie from "./DetailMovie";
import ItemCast from "../Item/ItemCast";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Users = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Logins} />
      <Stack.Screen name="Register" component={Registers} />
      <Stack.Screen name="Forgot" component={ForgotEmail} />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movie"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <Image source={require("../image/videoplay.png")} />;
          } else if (route.name === "DetailMovie") {
            return <Image source={require("../image/videoplay.png")} />;
          } else if (route.name === "ItemCast") {
            return <Image source={require("../image/videoplay.png")} />;
          } else if (route.name === "Profile") {
            return <Image source={require("../image/profile.png")} />;
          }
        },
        tabBarActiveTintColor: "#F74346",
        tabBarInactiveTintColor: "#4A4B56",
        tabBarActiveBackgroundColor: "#130B2B",
        tabBarInactiveBackgroundColor: "#130B2B",
        tabBarLabelStyle: {
          fontWeight: "700",
        },
      })}
    >
      <Stack.Screen
        name="Home"
        component={ListMovie}
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="DetailMovie"
        component={DetailMovie}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ItemCast"
        component={ItemCast}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Profile = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isLogin, setisLogin } = useContext(AppConText);

  //get token  đã  lưu từ login
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setisLogin(true); // Đánh dấu người dùng đã đăng nhập
    }
  };

  useEffect(() => {
    checkToken(); // Kiểm tra token khi ứng dụng khởi chạy
  }, []);
  return <>{isLogin === false ? <Users /> : <Main />}</>;
};

export default AppNavigator;

const styles = StyleSheet.create({
  ImageIcon: {
    width: 25,
    height: 25,
  },
});
