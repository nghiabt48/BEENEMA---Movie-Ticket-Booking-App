import { Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AxiosIntance from './AxiosIntance';

const Registers = (props) => {
    const { navigation } = props;
    const [emailUser, setEmailUser] = useState("")
    const [Username, setUsername] = useState("")
    const [passwordUser, setPasswordUser] = useState("")
    const [passwordConfirm, setpasswordConfirm] = useState("")
    const RegisterApp = async () => {
        try {
            await AxiosIntance().post("users/register", { username: Username, email: emailUser, password: passwordUser, passwordConfirm: passwordConfirm });
            ToastAndroid.show("Sign Up Success", ToastAndroid.SHORT);

            navigation.navigate("Login")
        } catch (e) {
            if (e.response.data.error.name == "ValidationError"
                && e.response.data.error.message.includes("Passwords are not the same")) {
                ToastAndroid.show("Passwords are not the same", ToastAndroid.LONG);
            }
            else if (e.response.data.error.name == "ValidationError") {
                ToastAndroid.show("Please enter complete information", ToastAndroid.LONG);
            }
            if (e.response.data.message.includes("email") && e.response.data.error.code === 11000) {
                ToastAndroid.show("Someone has used this email", ToastAndroid.LONG);
            }
            if (e.response.data.message.includes("username") && e.response.data.error.code === 11000) {
                ToastAndroid.show("Someone is already using this username", ToastAndroid.LONG);
            }
        }

    }
    const Back = () => {
        navigation.navigate("Login")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.GroupImages} onPress={Back}>
                <Image style={styles.Image} source={require('../image/Back.png')} />
            </TouchableOpacity>

            <Text style={styles.Text1}>Beenema</Text>
            <Text style={styles.Text2}>Enter your data</Text>
            <View style={styles.Group}>
                <Text style={styles.Text3}>Email</Text>
                <TextInput style={styles.Edt} onChangeText={setEmailUser}
                    placeholder='Enter yor email'
                    placeholderTextColor={'#ffff'}
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group2}>
                <Text style={styles.Text3}>Username</Text>
                <TextInput style={styles.Edt} onChangeText={setUsername}
                    placeholder='Enter yor username'
                    placeholderTextColor={'#ffff'}
                    returnKeyType='next'
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group2}>
                <Text style={styles.Text3}>Password</Text>
                <TextInput style={styles.Edt} onChangeText={setPasswordUser}
                    placeholder='Enter yor password'
                    placeholderTextColor={'#ffff'}
                    returnKeyType='go'
                    secureTextEntry={true}
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group2}>
                <Text style={styles.Text3}>Confirm Password</Text>
                <TextInput style={styles.Edt} onChangeText={setpasswordConfirm}
                    placeholder='Enter yor confirm password'
                    placeholderTextColor={'#ffff'}
                    returnKeyType='go'
                    secureTextEntry={true}
                    autoCorrect={false}></TextInput>
            </View>
            <TouchableOpacity style={styles.button} onPress={RegisterApp}>
                <LinearGradient
                    colors={['#F34C30', '#DA004E']}
                    style={styles.gradient}
                    end={{ x: 0.01, y: 1 }}
                >
                    <Text style={styles.Text5}>Register</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
}

export default Registers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#130B2B',
        alignItems: 'center',
        padding: 20,

    },
    Image: {
        width: 40,
        height: 40,
    },
    GroupImages: {
        width: '100%',
        marginTop: 20,
    },
    Text1: {
        color: '#DA004E',
        fontSize: 40,
        fontWeight: 'bold',
        //fontFamily: 'poppins',
        marginTop: 10,
    },
    Text2: {
        marginTop: 20,
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
        justifyContent: 'flex-end',
        marginTop: 50,
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
        marginTop: 20,
    },
    Group3: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 5,

    },
})