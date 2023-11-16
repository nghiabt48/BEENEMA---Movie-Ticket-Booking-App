import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSettings = (props) => {
    const {navigation} = props
    
    const goBack = () =>{
        navigation.goBack();
    }
    
    const changePassword = () =>{
      navigation.navigate('ChangePassword');
    }
    
    const updateProfile = () =>{
      navigation.navigate('UpdateProfile');
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row"}}>
        <TouchableOpacity onPress={goBack}>
          <Image style={{marginStart:36,marginTop:10}} source={require("../image/Back.png")} />
        </TouchableOpacity>
        <Text style={styles.txt1}>Cài đặt</Text>
      </View>
      <Image
        style={styles.settingsImg}
        source={require("../image/settings2.png")}
      />
      {/* Button Update Profile*/}
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btnMine} onPress={updateProfile}>
          <Image
            style={styles.imgView}
            source={require("../image/editwhite.png")}
          />
          <Text style={styles.buttonText1}>Cập nhật hồ sơ</Text>
          <Image
            style={styles.btnArrow}
            source={require("../image/arrowright.png")}
          />
        </TouchableOpacity>
      </View>
      {/* Button change password*/}
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btnMine} onPress={changePassword}>
          <Image style={styles.imgView} source={require("../image/lock.png")} />
          <Text style={styles.buttonText1}>Đổi mật khẩu</Text>
          <Image
            style={styles.btnArrow2}
            source={require("../image/arrowright.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161621",
  },
  txt1:{
    color:"#F1F1F1",
    fontSize:27,
    fontWeight:"800", 
    marginStart:63,
    marginTop:10
  },
  settingsImg: {
    marginTop: 100,
    marginStart:103,
    marginEnd:98,
  },
  viewBtn: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnMine: {
    backgroundColor: "#2B2B38",
    padding: 10,
    width: 317,
    height: 58,
    borderRadius: 16,
    flexDirection: "row",
  },
  imgView: {
    width: 41,
    height: 41,
    marginStart: 10,
    marginTop: -5,
  },
  btnArrow: {
    width: 27.27,
    height: 24,
    marginTop: 10,
    marginStart: 60,
    marginTop: 5,
  },
  btnArrow2: {
    width: 27.27,
    height: 24,
    marginTop: 10,
    marginStart: 20,
    marginTop: 5,
  },
  buttonText1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21.95,
    textAlign: "center",
  },
});
