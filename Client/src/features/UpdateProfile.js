import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AppConText } from "./AppConText";
import AxiosIntance from "./AxiosIntance";
import * as ImagePicker from "expo-image-picker";

const UpdateProfile = (props) => {
  const { navigation } = props;
  const [isLoading, setisLoading] = useState(null);
  const { infoUser, setinfoUser } = useContext(AppConText);
  const [image, setImage] = useState(null);
  const ImageURL = "http://149.28.159.68:3000/img/users/";

  //Lấy thông tin user
  const GetUserProfile = async () => {
    try {
      setisLoading(true);
      const respone = await AxiosIntance().get("users/me");
      if (respone.status == "success") {
        setinfoUser(respone.data.document);
        setImage(respone.data.document.avatar);
        setisLoading(false);
      } else {
        ToastAndroid.show("Get Data Failed Successfully", ToastAndroid.SHORT);
        setisLoading(false);
      }
    } catch (e) {
      ToastAndroid.show("Get Data Failed", ToastAndroid.SHORT);
      setisLoading(false);
    }
  };
  useEffect(() => {
    GetUserProfile();
  }, []);

  //chọn hình trong kho ảnh để đăng lên (chưa tìm được cách để tạm ảnh hay nói thẳng là ngu nên xài api luôn)
  const pickImage = async () => {
    try {
      //Chọn hình
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      //form data để upload file
      const formData = new FormData();
      formData.append("avatar", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name:"image.jpg"
      });
      //chạy api
      const respone = await AxiosIntance("multipart/form-data").patch(
        "users/update-user-avatar",
        formData
      );
      if (!result.canceled) {
        if (respone.status == "success") {
            console.log(respone);
            ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
            setImage(respone.url);
        } else {
          ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
        }
      }
      else{
        ToastAndroid.show("Error", ToastAndroid.SHORT);
      }
    }
    catch (e) {
      console.log(e);
    }

  };

  const goBack = () => {
    navigation.goBack();
  };

  //Cập nhật profile
  const UpdateProfile = async () => {
    try {

      const respone = await AxiosIntance().patch(
        "users/update-me",
        {
          email: infoUser.email,
          username: infoUser.username,
          phone_number: infoUser.phone_number,
          avatar: image
        }
      );

      if (respone.status == "success") {
        ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);``
        setinfoUser(respone.data.user);
      } else {
        ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
      }


    } catch (e) {
      ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
      console.log(e);
    }
  };

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
        <Text style={styles.textseat}>Cập nhật thông tin</Text>
      </View>

      {/* Phần cập nhật hình ảnh*/}
      <View style={styles.updateimagecontainer}>
        <TouchableOpacity onPress={pickImage}>
          {isLoading === true ? (
            <ActivityIndicator size="large" />
          ) : infoUser.avatar != null ? (
            <Image
              style={styles.updateimage}
              source={{ uri: `${ImageURL}${image}` }}
            />
          ) : (
            <Image
              style={styles.updateimage}
              source={require("../image/avatar.png")}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Phần nhập thông tin người dùng*/}
      <ScrollView style={styles.infocontainer}>
        {/* Phần nhập email */}
        <Text style={styles.textstyle}>Email:</Text>
        <TextInput
          style={styles.textinput}
          keyboardType="email-address"
          returnKeyType="next"
          autoCorrect={false}
          value={infoUser.email}
          onChangeText={(text) => setinfoUser({ ...infoUser, email: text })}
        />

        {/* Phần nhập tên*/}
        <Text style={styles.textstyle}>UserName:</Text>
        <TextInput
          style={styles.textinput}
          autoCorrect={false}
          value={infoUser.username}
          onChangeText={(text) => setinfoUser({ ...infoUser, username: text })}
        />

        {/* Phần nhập số điện thoại (Cần xác thực số điện thoại, sẽ cập nhật sau)*/}
        <Text style={styles.textstyle}>Phone Number:</Text>
        <TextInput
          style={styles.textinput}
          autoCorrect={false}
          value={infoUser.phone_number}
          onChangeText={(text) =>
            setinfoUser({ ...infoUser, phone_number: text })
          }
        />

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
          style={{ padding: "4%", borderRadius: 10 }}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          locations={[0.0, 2.0]}
          colors={["#F34C30", "#DA004E"]}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={UpdateProfile}
          >
            <Image
              style={{ marginRight: "5%" }}
              source={require("../icons/updateprofile.png")}
            ></Image>
            <Text style={styles.textstyle2}>Cập nhật</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#130B2B",
    padding: "10%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  header: {
    flexDirection: "row",
  },
  infocontainer: {},
  imagestyle: {
    width: 50,
    height: 50,
  },
  textstyle: {
    color: "white",
    fontWeight: "bold",
  },
  textinput: {
    padding: "3%",
    marginVertical: "5%",
    color: "white",
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 1,
  },
  textstyle2: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  updateimagecontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:'10%'
  },
  updateimage: {
    width: "50%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 27,
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
});
