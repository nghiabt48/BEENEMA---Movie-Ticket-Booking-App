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
import Maps from "./Maps";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import Trailer from "./Trailer";
import ShowTimes from "./ShowTimes";
import SeatCinemaSocket from "./SeatCinemaSocket";

import ChooseCinema from "./ChooseCinema";

import AxiosIntance from "./AxiosIntance";
import ListTicket from "./ListTicket";
import Search from "./Search";
import GameScreen from './minigame/GameScreen'
import DetailTickets from "./DetailTickets";

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
            return focused? <Image style={styles.ImageIcon} source={require("../image/movie3.png")} />: <Image style={styles.ImageIcon} source={require("../image/movie4.png")} />;
          } else if (route.name === "Profile") {
            return focused? <Image style={styles.ImageIcon} source={require("../image/user1.png")} />: <Image style={styles.ImageIcon} source={require("../image/user2.png")} />;
          } else if (route.name === "Map") {
            return focused? <Image style={styles.ImageIcon} source={require("../image/map1.png")} />: <Image style={styles.ImageIcon} source={require("../image/map2.png")} />;
          }
        },
        tabBarActiveTintColor: "#F74346",
        tabBarInactiveTintColor: "#4A4B56",
        tabBarActiveBackgroundColor: "#130B2B",
        tabBarInactiveBackgroundColor: "#130B2B",
        tabBarLabelStyle: {
          fontWeight: "700",
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Stack.Screen
        name="Home"
        component={BooKing}
        options={{ headerShown: false, title: "Trang chủ" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false ,title:"Cá nhân"}}
      />
      <Stack.Screen
        name="Map"
        component={Maps}
        options={{ headerShown: false, title: "Bản đồ" }}
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
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="MiniGame" component={GameScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ListTicket" component={ListTicket} />
      <Stack.Screen name="DetailTickets" component={DetailTickets} />
    </Stack.Navigator>
  );
};
const BooKing = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListMovie"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ListMovie" component={ListMovie} />
      <Stack.Screen name="DetailMovie" component={DetailMovie} />
      <Stack.Screen name="Trailer" component={Trailer} />
      <Stack.Screen name="ShowTime" component={ShowTimes} />
      <Stack.Screen name="SeatCinemaSocket" component={SeatCinemaSocket} />
      <Stack.Screen name="ChooseCinema" component={ChooseCinema} />
      <Stack.Screen name="Search" component={Search} />
    
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  const { isLogin, setisLogin } = useContext(AppConText);
  const { infoUser, setinfoUser } = useContext(AppConText);

  //get token  đã  lưu từ login
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const response = await AxiosIntance().get('users/me')
      setinfoUser(response.data.document)
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
    width: 30,
    height: 30,
  },
});
