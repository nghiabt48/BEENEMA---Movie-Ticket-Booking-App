import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AppConText } from './AppConText';
import AxiosIntance from './AxiosIntance';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logins = (props) => {
    const { navigation } = props;
    const { setisLogin , setinfoUser} = useContext(AppConText);
    const [emailUser, setEmailUser] = useState("")
    const [passwordUser, setPasswordUser] = useState("")
    const LoginApp = async () => {
        try {
            const response = await AxiosIntance().post("users/login", { email: emailUser, password: passwordUser });
            await AsyncStorage.setItem('token', response.token);
            ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
            setisLogin(true) 
            setinfoUser(response.data.user)
        } catch (e) {
            ToastAndroid.show("Sai email hoặc mật khẩu", ToastAndroid.SHORT);
        }
        
    }
    const RegisterApp = async () => {
        navigation.navigate('Register');
    }

    const navigateToForgotPassword = () =>{
        navigation.navigate('Forgot');
    }
  return (
    <View style={styles.container}>
            <Text style={styles.Text1}>Beenema</Text>
            <Text style={styles.Text2}>Nhập dữ liệu của bạn</Text>
            <View style={styles.Group}>
                <Text style={styles.Text3}>Email</Text>
                <TextInput style={styles.Edt} onChangeText={setEmailUser}
                    placeholder='Nhập email...'
                    placeholderTextColor={'#ffff'}
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group2}>
                <Text style={styles.Text3}>Mật khẩu</Text>
                <TextInput style={styles.Edt} onChangeText={setPasswordUser}
                    placeholder='Nhập mật khẩu...'
                    placeholderTextColor={'#ffff'}
                    returnKeyType='go'
                    secureTextEntry={true}
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group3}>
                <Text style={styles.Text4} onPress={navigateToForgotPassword}>Quên mật khẩu?</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={LoginApp}>
                <LinearGradient
                    colors={['#F34C30', '#DA004E']}
                    style={styles.gradient}
                    end={{ x: 0.01, y: 1 }}
                >
                    <Text style={styles.Text5}>Đăng Nhập</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.Group4} >
                <TouchableOpacity onPress={RegisterApp}>
                <Text style={styles.buttonText2}>Bạn mới biết đến Beenema? <Text style={styles.buttonText3}>Đăng ký</Text></Text>
                </TouchableOpacity>
            </View>

        </View>
  )
}

export default Logins

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
    Text3: {
        color: '#ffff',
        fontSize: 16,
        //fontFamily: 'poppins',
        fontWeight: 'normal',
        marginLeft: 10,
        marginBottom: 5,
    },
    Text4: {
        color: '#DA004E',
        fontSize: 12,
        //fontFamily: 'poppins',
        fontWeight: 'bold',


    },
    Text5: {
        color: '#ffff',
        fontSize: 17,
        //fontFamily: 'poppins',
        fontWeight: '600',

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
    Group: {
        width: '100%'
    },
    Group2: {
        width: '100%',
        marginTop: 30,
    },
    Group3: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 5,
        
    },
    Group4:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    buttonText2: {
        fontSize: 16,
        color: 'white',
    },
    buttonText3: {
        fontSize: 16,
        color: '#DA004E',
    },
})