import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const Registers = () => {
  return (
    <View style={styles.container}>
            <View style={styles.GroupImages}>
                <Image style={styles.Image} source={require('../image/Back.png')} />
            </View>
            
            <Text style={styles.Text1}>Beenema</Text>
            <Text style={styles.Text2}>Enter your data</Text>
            <View style={styles.Group}>
                <Text style={styles.Text3}>Email</Text>
                <TextInput style={styles.Edt}
                    placeholder='Enter yor email'
                    placeholderTextColor={'#ffff'}
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group2}>
                <Text style={styles.Text3}>Password</Text>
                <TextInput style={styles.Edt}
                    placeholder='Enter yor password'
                    placeholderTextColor={'#ffff'}
                    returnKeyType='go'
                    secureTextEntry={true}
                    autoCorrect={false}></TextInput>
            </View>
            <View style={styles.Group2}>
                <Text style={styles.Text3}>Confirm Password</Text>
                <TextInput style={styles.Edt}
                    placeholder='Enter yor confirm password'
                    placeholderTextColor={'#ffff'}
                    returnKeyType='go'
                    secureTextEntry={true}
                    autoCorrect={false}></TextInput>
            </View>
            <TouchableOpacity style={styles.button}>
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
    Image:{
        width:50,
        height:50,
    },
    GroupImages:{
        width:'100%'
    },
    Text1: {
        color: '#DA004E',
        fontSize: 40,
        fontWeight: 'bold',
        //fontFamily: 'poppins',
        marginTop: 30,
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
        marginTop: 30,
    },
    Group3: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 5,

    },
})