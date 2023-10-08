import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React from "react";

const profile_settings = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.settingsImg}
        source={require("../image/settings2.png")}
      />
       {/* Button Update Profile*/}
    <View style={styles.viewBtn}>
      <TouchableOpacity style={styles.btnMine}>
        <Image
          style={styles.imgView}
          source={require("../image/editwhite.png")}
        />
        <Text style={styles.buttonText1}>Update profile</Text>
        <Image
          style={styles.btnArrow}
          source={require("../image/arrowright.png")}
        />
      </TouchableOpacity>
    </View>
       {/* Button change password*/}
       <View style={styles.viewBtn}>
      <TouchableOpacity style={styles.btnMine}>
        <Image
          style={styles.imgView}
          source={require("../image/lock.png")}
        />
        <Text style={styles.buttonText1}>Change password</Text>
        <Image
          style={styles.btnArrow2}
          source={require("../image/arrowright.png")}
        />
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default profile_settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161621",
    alignItems: "center",
  },
  settingsImg: {
    marginTop: 100,
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
    marginTop:-5,
  },
  btnArrow: {
    width: 27.27,
    height: 24,
    marginTop: 10,
    marginStart: 60,
    marginTop:5,
  },
  btnArrow2: {
    width: 27.27,
    height: 24,
    marginTop: 10,
    marginStart: 20,
    marginTop:5,
  },
  buttonText1: {
    color: "white",
    fontWeight:"bold",
    fontSize: 21.95,
    textAlign: "center",
  },
});
