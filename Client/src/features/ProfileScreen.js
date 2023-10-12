import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Row1}>
        <Text style={styles.textProfile}>Profile</Text>
        <Image
          style={styles.settingBtn}
          source={require("../image/Settings.png")}
        />
      </View>
      {/* avatar , name  */}
      <View style={styles.Row2}>
        <Image
          style={styles.avatarImg}
          source={require("../image/avatar.png")}
        />
        <Text style={styles.row}>
          <Text style={styles.txtName}>Hi! user</Text>
          {"\n"}
          <Text style={styles.txtHello}>Welcome</Text>
        </Text>
      </View>
      {/* Button My Tickets*/}
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btnMine}>
          <Image
            style={styles.imgView}
            source={require("../image/arrowleft.png")}
          />
          <Text style={styles.buttonText1}>My tickets</Text>
          <Image
            style={styles.btnArrow}
            source={require("../image/arrowleft.png")}
          />
        </TouchableOpacity>
      </View>
      {/* Button My credit Cards*/}
      <View style={styles.viewBtn2}>
        <TouchableOpacity style={styles.btnMine}>
          <Image
            style={styles.imgView}
            source={require("../image/card.png")}
          />
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
          <Text style={styles.buttonText3}>History</Text>
          <Image
            style={styles.btnArrow3}
            source={require("../image/arrowleft.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Row3}>
        <Image source={require("../image/Edit.png")} />
        <Text style={styles.textEdit}>Changes city</Text>
      </View>
      <View style={styles.Row4}>
        <Image source={require("../image/info.png")} />
        <Text style={styles.textInfo}>About us</Text>
      </View>
      {/* Button Logout */}
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <LinearGradient
          colors={["rgb(243, 76, 48)", "rgb(218, 0, 78)"]}
          style={styles.btnLogOut}
        >
          <TouchableOpacity style={styles.buttonContainer}>
            <Image
              style={styles.imgLogOut}
              source={require("../image/logout.png")}
            />
            <Text style={styles.buttonTextLogOut}>Logout</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

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
        marginTop:20,
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
})