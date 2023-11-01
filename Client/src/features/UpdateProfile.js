import { View, Text, TouchableOpacity,Image, StyleSheet, Dimensions, TextInput} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
const UpdateProfile = () => {
  return (
    // Error: khi nhấp vào textinput sẽ bị đẩy lên trên
    <View style={styles.container}>
        {/* Phần đầu */}
        <View style={styles.header}>   
            <TouchableOpacity>
                <Image style={styles.imagestyle} source={require('../icons/back.png')} />
                </TouchableOpacity>               
            <View style={{flex:1, justifyContent:'center', marginLeft:-50}}>
                <Text style={[styles.textstyle, {textAlign:'center'}]}>Update Profile</Text>
            </View>
        </View>
        {/* Phần cập nhật hình ảnh (hình text) */}
        <View style={styles.updateimagecontainer}>   
            <TouchableOpacity>
                <Image style={styles.updateimage} source={require('../icons/updateimage.png')} />
            </TouchableOpacity>    
        </View>
        {/* Phần nhập thông tin người dùng*/}
        <View style={styles.infocontainer}>
            {/* Phần nhập email */}
            <Text style={styles.textstyle}>Email</Text>
            <TextInput
                style={styles.textinput}
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false} 
            />
            {/* Phần nhập tên*/}
            <Text style={styles.textstyle}>Name</Text>
            <TextInput 
                style={styles.textinput}
                autoCorrect={false} />
            {/* Phần nhập tên rạp ?*/}
            <Text style={styles.textstyle}>Cinema</Text>
            <TextInput 
                style={styles.textinput}
                autoCorrect={false} 
                />
            {/* Nút xác nhận cập nhật thông tin cá nhân*/}
            <LinearGradient
                style={{padding:'4%', borderRadius:10}}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                locations={[0.0, 2.0]}
                colors={['#F34C30', '#DA004E']}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Image style={{marginRight:'5%'}} source={require('../icons/updateprofile.png')}></Image>
                    <Text style={styles.textstyle2}>Update Profile</Text>
                </TouchableOpacity>
            </LinearGradient>         
        </View>    

    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'black',
        padding:'10%'
    },
    header:{
        flexDirection:'row',
    },
    infocontainer:{
        justifyContent:'center',
    },
    imagestyle:{
        width:50,
        height:50
    },
    textstyle:{
        color:'white',
        fontWeight:'bold',
    },
    textinput:{
        padding:'3%',
        marginVertical:'5%',
        color:'white',
        borderRadius:10,
        borderColor:'red',
        borderWidth:1,
    },
    textstyle2:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    updateimagecontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center', 
    },
    updateimage:{
        width:'50%',
        height:undefined,
        aspectRatio:1
    }
    
})