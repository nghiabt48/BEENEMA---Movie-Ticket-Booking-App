import { View, Text, TouchableOpacity,Image, StyleSheet, Dimensions, TextInput, ToastAndroid, ScrollView} from 'react-native'
import React, { useContext, useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AppConText } from './AppConText';
import AxiosIntance from './AxiosIntance';
import * as ImagePicker from 'expo-image-picker';

const UpdateProfile = (props) => {
    const { navigation } = props;z
    const {infoUser, setinfoUser} = useContext(AppConText);
    const ImageURL = "http://149.28.159.68:3000/img/users/";
   
    //Lấy thông tin user 
    const GetUserProfile = async () => {
        try {
            const respone = await AxiosIntance().get("users/me");
            if (respone.status == "success") {
                setinfoUser(respone.data.document);
            }
            else{
                ToastAndroid.show("Get Data Failed Successfully", ToastAndroid.SHORT);
            }
        } catch (e) {
            ToastAndroid.show("Get Data Failed", ToastAndroid.SHORT);
        }
    }
    useEffect(() => {
        GetUserProfile();
    }, []);

    //chọn hình trong kho ảnh để đăng lên (chưa tìm được cách để tạm ảnh hay nói thẳng là ngu nên xài api luôn)
    const pickImage = async () => {
        //Chọn hình
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        //form data để upload file 
        const formData = new FormData();
        formData.append('avatar', {
            uri: result.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg'
        });
        //chạy api
        const respone = await AxiosIntance("multipart/form-data").patch("users/update-me", formData);
        if (!result.canceled) {
            if(respone.status == "success"){
                ToastAndroid.show("Update Image Successfully", ToastAndroid.SHORT);
                GetUserProfile();
            }
            else{
                ToastAndroid.show("Update Image Failed", ToastAndroid.SHORT);
            }
        }
      };    

    const goBack = () =>{
        navigation.goBack();
    }

    //Cập nhật profile
    const UpdateProfile = async () => {
        try {

            //form data để upload file 
            const formData = new FormData();
            formData.append('email',infoUser.email);
            formData.append('username',infoUser.username);
            formData.append('phone_number',infoUser.phone_number);
            // formData.append('address',infoUser.address);
            // formData.append('location',infoUser.location);
            
            await AxiosIntance("multipart/form-data").patch("users/update-me", formData);
            ToastAndroid.show("Update Profile Successfully", ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show("Update Profile Failed", ToastAndroid.SHORT);
            console.log(e);
        }

    }

    return (

    <View style={styles.container}>

        {/* Phần đầu */}
        <View style={styles.header}>   
            <TouchableOpacity onPress={goBack}>
                <Image style={styles.imagestyle} source={require('../icons/back.png')} />
            </TouchableOpacity>               
            <View style={{flex:1, justifyContent:'center', marginLeft:-50}}>
                <Text style={[styles.textstyle, {textAlign:'center'}]}>Update Profile</Text>
            </View>
        </View>

        {/* Phần cập nhật hình ảnh*/}
        <View style={styles.updateimagecontainer}>   
            <TouchableOpacity onPress={pickImage}>
                {
                    infoUser.avatar !=null
                    ?
                    <Image style={styles.updateimage} source={{uri:`${ImageURL}${infoUser.avatar}`}}/>
                    :
                    <Image style={styles.updateimage} source={require('../image/avatar.png')} />
                }
            </TouchableOpacity>    
        </View>

        {/* Phần nhập thông tin người dùng*/}
        <ScrollView style={styles.infocontainer}>

            {/* Phần nhập email */}
            <Text style={styles.textstyle}>Email:</Text>
            <TextInput
                style={styles.textinput}
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                value={infoUser.email}
                onChangeText={(text) => setinfoUser({...infoUser, email: text})}
            />

            {/* Phần nhập tên*/}
            <Text style={styles.textstyle}>UserName:</Text>
            <TextInput 
                style={styles.textinput}
                autoCorrect={false}
                value={infoUser.username}
                onChangeText={(text) => setinfoUser({...infoUser, username: text})}
            />

            {/* Phần nhập số điện thoại (Cần xác thực số điện thoại, sẽ cập nhật sau)*/}
            <Text style={styles.textstyle}>Phone Number:</Text>
            <TextInput 
                style={styles.textinput}
                autoCorrect={false} 
                value={infoUser.phone_number}
                onChangeText={(text) => setinfoUser({...infoUser, phone_number: text})}/>

            {/* Phần nhập địa chỉ*/}
            {/* <Text style={styles.textstyle}>Address:</Text>
            <TextInput 
                style={styles.textinput}
                autoCorrect={false} 
                value={infoUser.address}
                onChangeText={(text) => setinfoUser({...infoUser, address: text})}/>   */}

            {/* Location (Lấy vị trí của người dùng, sẽ cập nhật sau)*/}    
            {/* <Text style={styles.textstyle}>Location:</Text>
            <TextInput 
                style={styles.textinput}
                autoCorrect={false} 
                value={infoUser.location}
                onChangeText={(text) => setinfoUser({...infoUser, location: text})}/>   */}

            {/* Nút xác nhận cập nhật thông tin cá nhân*/}
            <LinearGradient
                style={{padding:'4%', borderRadius:10}}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                locations={[0.0, 2.0]}
                colors={['#F34C30', '#DA004E']}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={UpdateProfile}>
                    <Image style={{marginRight:'5%'}} source={require('../icons/updateprofile.png')}></Image>
                    <Text style={styles.textstyle2}>Update Profile</Text>
                </TouchableOpacity>
            </LinearGradient>         
        </ScrollView>    

    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        backgroundColor:'black',
        padding:'10%',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    header:{
        flexDirection:'row',
    },
    infocontainer:{
       
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
        justifyContent:'center',
        alignItems:'center', 
    },
    updateimage:{
        width:'50%',
        height:undefined,
        aspectRatio:1,
        borderRadius:27
    }
    
})