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
  const { infoUser, setinfoUser } = useContext(AppConText);
  const ImageURL = `http://149.28.159.68:3000/img/users/`;
  useEffect(() => {
    //Profile
    const Profile = async () => {
      try {
        const respone = await AxiosIntance().get("/users/me");
        if (respone.status == "success") {
          setinfoUser(respone.data.document);
        } else {
          ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show("Something went wrong!" +error, ToastAndroid.SHORT);
      }
    
    };
    Profile();
    return () => { };
  }, []);

  //check  avatar user có hay chưa nếu chưa thì sẽ mặc định hiển thị avatar.png
  const userAvatar = infoUser.avatar
    ? { uri: `${ImageURL}${infoUser.avatar}` }
    : require("../image/avatar.png");

  //Sign Out
  const signOut = async () => {
    setisLogin(false);
    await AsyncStorage.removeItem("token");
    ToastAndroid.show("Logout Succesfully!", ToastAndroid.SHORT);
  };
  const updateProfile = () => {
    navigation.navigate('UpdateProfile');
  }
  const changePassword = () => {
    navigation.navigate('ChangePassword');
  }
  const myTicket = () => {
    navigation.navigate('ListTicket');
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.Row1}>
          <Text style={styles.textProfile}>Profile</Text>

        </View>
        {/* avatar , name  */}
        <View style={styles.Row2}>
          <Image style={styles.avatarImg} source={userAvatar} />
          <Text style={styles.row}>
            <Text style={styles.txtName}>Chào! {infoUser.username}</Text>
            {"\n"}
            <Text style={styles.txtHello}>Chào mừng</Text>
          </Text>
        </View>
        <View style={styles.ViewGroup}>
          {/* Button My Tickets*/}
          <View style={styles.viewBtn}>
            <TouchableOpacity style={styles.btnMine} onPress={myTicket}>
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
          {/* Button Update Profile*/}
          <View style={styles.viewBtn2}>
            <TouchableOpacity style={styles.btnMine} onPress={updateProfile}>
              <Image style={styles.imgView} source={require("../image/Note.png")} />
              <Text style={styles.buttonText2}>Cập nhật hồ sơ</Text>
              <Image
                style={styles.btnArrow2}
                source={require("../image/arrowleft.png")}
              />
            </TouchableOpacity>
          </View>
          {/* Button Change password*/}
          <View style={styles.viewBtn3}>
            <TouchableOpacity style={styles.btnMine} onPress={changePassword}>
              <Image
                style={styles.imgView}
                source={require("../image/SetTing.png")}
              />
              <Text style={styles.buttonText3}>Đổi mật khẩu</Text>
              <Image
                style={styles.btnArrow3}
                source={require("../image/arrowleft.png")}
              />
            </TouchableOpacity>
          </View>

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
      {/* avatar , name  */}

    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130B2B",
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
    width: '100%',
    height: 58,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: 'center'
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
    marginStart: 25,
  },
  btnArrow3: {
    width: 10.45,
    height: 12.41,
    marginTop: 10,
    marginStart: 33,
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
    height: 50,
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
  ViewGroup: {
    marginStart: '10%',
    marginEnd: '10%'
  }
});
