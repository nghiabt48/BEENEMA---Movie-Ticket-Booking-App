import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppConText } from "./AppConText";
import AxiosIntance from "./AxiosIntance";
const ForgotEmail = (props) => {
  const { navigation } = props;
  const [emailUser, setemailUser] = useState("");

  const resetPassword = async () => {
    try {
      const response = await AxiosIntance().post("users/forget-password", {
        email: emailUser,
      });

      if (response.data.status === "success") {
        ToastAndroid.show(
          "Kiểm tra email của bạn để lấy lại mật khẩu!",
          ToastAndroid.SHORT
        );
        navigation.goBack();
      } else {
        if (response.status === 404) {
          ToastAndroid.show("Email này không tồn tại!", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Đã xảy ra lỗi!", ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        ToastAndroid.show("Email này không tồn tại!", ToastAndroid.SHORT);
      } else {
        console.error(error);
        ToastAndroid.show("Đã xảy ra lỗi!", ToastAndroid.SHORT);
      }
    }
  };
  const goBack = async () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.GroupImages} onPress={goBack}>
        <Image style={styles.Image} source={require('../image/Back.png')} />
      </TouchableOpacity>
      <Text style={styles.Text1}>Beenema</Text>
      <Text style={styles.Text2}>Nhập dữ liệu của bạn</Text>
      <View style={styles.Group}>
        <Text style={styles.Text3}>Email</Text>
        <TextInput style={styles.Edt} onChangeText={setemailUser}
          placeholder='Nhập email...'
          placeholderTextColor={'#ffff'}
          keyboardType='email-address'
          returnKeyType='next'
          autoCorrect={false}></TextInput>
      </View>

      <TouchableOpacity style={styles.button} onPress={resetPassword}>
        <LinearGradient
          colors={['#F34C30', '#DA004E']}
          style={styles.gradient}
          end={{ x: 0.01, y: 1 }}
        >
          <Text style={styles.Text5}>Đăng Nhập</Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
};

export default ForgotEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#130B2B',
    alignItems: 'center',
    padding: 20,
  },
  Text1: {
    color: '#DA004E',
    fontSize: 40,
    fontWeight: 'bold',
    //fontFamily: 'poppins',
    marginTop: 50,
  },
  Text2: {
    marginTop: 30,
    color: '#ffff',
    fontSize: 20,
    //fontFamily: 'poppins',
    fontWeight: 'normal',
    marginBottom: 30
  },
  Group: {
    width: '100%'
  },
  Text3: {
    color: '#ffff',
    fontSize: 16,
    //fontFamily: 'poppins',
    fontWeight: 'normal',
    marginLeft: 10,
    marginBottom: 5,
  },
  Edt: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 12,
    color: '#fff',
    padding: 10,
    //fontFamily: 'poppins',
    fontSize: 16,
  },
  Text5: {
    color: '#ffff',
    fontSize: 17,
    //fontFamily: 'poppins',
    fontWeight: '600',

  },
  Image: {
    width: 40,
    height: 40,
  },
  GroupImages: {
    width: '100%',
    marginTop: 20,
  },
  button: {
        
    width: '100%',
    justifyContent:'flex-end',
    marginTop:50,
},
gradient: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
},
});
