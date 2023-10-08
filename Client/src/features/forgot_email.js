import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
const forgot_email = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtBeenema}>Beenema</Text>
      <Text style={styles.txtEnterData}>Enter your data</Text>
      <View>
        <Text style={{color:'white',marginStart:40,marginTop:50,fontSize:16}}>Email</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="white"
      />
      </View>

      <View style={{ alignItems: "center", marginTop: 300 }}>
      <LinearGradient
        colors={["rgb(243, 76, 48)", "rgb(218, 0, 78)"]}
        style={styles.btnReset}
      >
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Reset password</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
    </View>
  );
};

export default forgot_email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161621",
  },
  txtBeenema: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FA6900",
    textAlign: "center",
  },
  txtEnterData: {
    fontSize: 20,
    color: "white",
    marginTop: 40,
    textAlign: "center",
  },
  input: {
    width: 340,
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius:20,
    padding: 15,
    marginStart:25,
    marginTop:5,
  },
  btnReset: {
    borderRadius: 20,
    width: 286,
    height: 50,
  },
  buttonContainer: {
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
});
