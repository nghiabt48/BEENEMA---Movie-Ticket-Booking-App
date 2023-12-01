import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AxiosIntance from './AxiosIntance';
import { AppConText } from './AppConText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = (props) => {

    const { navigation } = props;
    const { setisLogin } = useContext(AppConText);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const ChangePassword = async () => {
        try {
            await AxiosIntance().patch("users/change-password", {
                password: password,
                newpassword: newPassword,
                passwordconfirm: passwordConfirm
            });
            ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
            //quay lại màn hình login
            setisLogin(false);
            await AsyncStorage.removeItem("token");
        } catch (e) {
            ToastAndroid.show("Đổi mật khẩu thất bại", ToastAndroid.SHORT);
        }

    }

    const goBack = () => {
        navigation.goBack();
    }

    return (

        <View style={styles.container}>
            {/* Phần đầu */}
            <View style={styles.viewGroup1}>
                <TouchableOpacity onPress={goBack}>
                    <Image
                        style={styles.ImageBack}
                        source={require("../image/Back.png")}
                    ></Image>
                </TouchableOpacity>
                <Text style={styles.textseat}>Đổi mật khẩu</Text>
            </View>
            {/* Phần nhập thông tin người dùng*/}
            <View style={styles.infocontainer}>
                {/* Phần nhập mật khẩu cũ */}
                <Text style={styles.textstyle}>Mật khẩu hiện tại</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Nhập mật khẩu hiện tại..."
                    placeholderTextColor={'white'}
                    returnKeyType='next'
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={setPassword}
                />
                {/* Phần nhập mật khẩu mới */}
                <Text style={styles.textstyle}>Mật khẩu mới</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Nhập mật khẩu mới..."
                    placeholderTextColor={'white'}
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={setNewPassword}
                />
                {/* Phần nhập lại mật khẩu mới */}
                <Text style={styles.textstyle}>Xác nhận mật khẩu</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Nhập xác nhận mật khẩu..."
                    placeholderTextColor={'white'}
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={setPasswordConfirm}
                />
                {/* Nút xác nhận đổi mật khẩu */}
                <LinearGradient
                    style={{ padding: '4%', borderRadius: 10 }}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 0.0 }}
                    locations={[0.0, 2.0]}
                    colors={['#F34C30', '#DA004E']}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={ChangePassword}>
                        <Image style={{ marginRight: '5%' }} source={require('../icons/password.png')}></Image>
                        <Text style={styles.textstyle2}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

        </View>
    )
}

export default ChangePassword
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: '#130B2B',
        padding: '10%'
    },
    header: {
        flexDirection: 'row',
        marginTop: '5%'
    },
    infocontainer: {
        flex: 3,
        justifyContent: 'center',
    },
    imagestyle: {
        width: 50,
        height: 50
    },
    textstyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    textinput: {
        padding: '3%',
        marginVertical: '5%',
        color: 'white',
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1
    },
    textstyle2: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    ImageBack: {
        width: 50,
        height: 50,
    },
    viewGroup1: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    textseat: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        flex: 1,
        textAlign: "center",
      },
})