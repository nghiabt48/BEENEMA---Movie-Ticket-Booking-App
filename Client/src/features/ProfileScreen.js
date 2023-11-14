import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AppConText } from "./AppConText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosIntance from "./AxiosIntance";

const ProfileScreen = (props) => {
  const { navigation } = props;
  const { setisLogin } = useContext(AppConText);
  const [data, setdata] = useState([]);
  const ImageURL = `http://149.28.159.68:3000/img/users/`;

  useEffect(() => {
    //Profile
    const Profile = async () => {
      const respone = await AxiosIntance().get("/users/me");
      if (respone.status == "success") {
        setdata(respone.data.document);
      } else {
        ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      }
    };
    Profile();
    return () => { };
  }, []);

  //check  avatar user có hay chưa nếu chưa thì sẽ mặc định hiển thị avatar.png
  const userAvatar = data.avatar
    ? { uri: `${ImageURL}${data.avatar}` }
    : require("../image/avatar.png");

  //Sign Out
  const signOut = async () => {
    setisLogin(false);
    await AsyncStorage.removeItem("token");
    ToastAndroid.show("Logout Succesfully!", ToastAndroid.SHORT);
  };

  const navigateToProfileSettings = () => {
    navigation.navigate("ProfileSettings");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.Row1}>
          <Text style={styles.textProfile}>Profile</Text>
          <TouchableOpacity onPress={navigateToProfileSettings}>
            <Image
              style={styles.settingBtn}
              source={require("../image/Settings.png")}
            />
          </TouchableOpacity>

        </View>
        {/* avatar , name  */}
        <View style={styles.Row2}>
          <Image style={styles.avatarImg} source={userAvatar} />
          <Text style={styles.row}>
            <Text style={styles.txtName}>Chào! {data.username}</Text>
            {"\n"}
            <Text style={styles.txtHello}>Chào mừng</Text>
          </Text>
        </View>
        {/* Button My Tickets*/}
        <View style={styles.viewBtn}>
          <TouchableOpacity style={styles.btnMine}>
            <Image
              style={styles.imgView}
              source={require("../image/Ticket.png")}
            />
            <Text style={styles.buttonText1}>Vé của tôi</Text>
            <Image
              style={styles.btnArrow}
              source={require("../image/arrowleft.png")}
            />
          </TouchableOpacity>
        </View>
        {/* Button My credit Cards*/}
        <View style={styles.viewBtn2}>
          <TouchableOpacity style={styles.btnMine}>
            <Image style={styles.imgView} source={require("../image/card.png")} />
            <Text style={styles.buttonText2}>My credit cards</Text>
            <Image
              style={styles.btnArrow2}
              source={require("../image/arrowleft.png")}
            />
          </TouchableOpacity>
        </View>
        {/* Button History*/}
        <View style={styles.viewBtn3}>
          <TouchableOpacity style={styles.btnMine}>
            <Image
              style={styles.imgView}
              source={require("../image/history.png")}
            />
            <Text style={styles.buttonText3}>Lịch sử</Text>
            <Image
              style={styles.btnArrow3}
              source={require("../image/arrowleft.png")}
            />
          </TouchableOpacity>
        </View>
        {/* Button Logout */}
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: '20%' }}>
          <LinearGradient
            colors={["rgb(243, 76, 48)", "rgb(218, 0, 78)"]}
            style={styles.btnLogOut}
          >
            <TouchableOpacity style={styles.buttonContainer} onPress={signOut}>
              <Image
                style={styles.imgLogOut}
                source={require("../image/logout.png")}
              />
              <Text style={styles.buttonTextLogOut}>Đăng xuất</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161621",
  },
  Row1: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  Row2: {
    flexDirection: "row",
    marginStart: 50,
    marginTop: 20,
  },
  Row3: {
    flexDirection: "row",
    marginStart: 80,
    marginTop: 50,
  },
  Row4: {
    flexDirection: "row",
    marginStart: 90,
    marginTop: 10,
  },
  textProfile: {
    color: "white",
    fontWeight: "bold",
    fontSize: 27,
    padding: 10,
  },
  settingBtn: {
    width: 53,
    height: 53,
    marginStart: 40,
  },
  avatarImg: {
    width: 105,
    height: 105,
    flexShrink: 0,
    borderRadius: 27,
  },
  row: {
    flexDirection: "row",
    paddingStart: 20,
    paddingTop: 30,
  },
  txtName: {
    fontSize: 20,
    color: "white",
  },
  txtHello: {
    fontSize: 27,
    color: "white",
    fontWeight: "bold",
  },
  viewBtn: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  viewBtn2: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  viewBtn3: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnMine: {
    backgroundColor: "#2B2B38",
    padding: 10,
    width: 288,
    height: 58,
    borderRadius: 16,
    flexDirection: "row",
  },
  buttonText1: {
    color: "white",
    fontSize: 21.95,
    textAlign: "center",
    marginStart: 20,
  },
  buttonText2: {
    color: "white",
    fontSize: 21.95,
    textAlign: "center",
    marginStart: 20,
  },
  buttonText3: {
    color: "white",
    fontSize: 21.95,
    textAlign: "center",
    marginStart: 20,
  },
  imgView: {
    width: 26,
    height: 20,
    marginTop: 8,
    marginStart: 20,
  },
  btnArrow: {
    width: 10.45,
    height: 12.41,
    marginTop: 10,
    marginStart: 70,
  },
  btnArrow2: {
    width: 10.45,
    height: 12.41,
    marginTop: 10,
    marginStart: 20,
  },
  btnArrow3: {
    width: 10.45,
    height: 12.41,
    marginTop: 10,
    marginStart: 100,
  },
  textEdit: {
    color: "white",
    fontSize: 22,
    marginTop: 5,
  },
  textInfo: {
    color: "white",
    fontSize: 22,
    marginStart: 10,
    marginTop: -5,
  },
  btnLogOut: {
    borderRadius: 20,
    width: 286,
    height: 48,
  },
  buttonContainer: {
    padding: 10,
  },
  imgLogOut: {
    width: 24,
    height: 24,
    marginStart: 15,
  },
  buttonTextLogOut: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -25,
  },
});
