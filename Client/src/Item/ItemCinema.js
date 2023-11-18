import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppConText } from "../features/AppConText";
import * as Location from "expo-location";
import AxiosIntance from "../features/AxiosIntance";
const ItemCinema = (props) => {
  const { item, navigation } = props;
  const { movieId, setmovieId } = useContext(AppConText);
  const [location, setLocation] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
  
    getCinemaDistance();
  }, []);
  const getCinemaDistance = async () => {
    
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation)
    const latitude = currentLocation.coords.latitude;
    const longitude = currentLocation.coords.longitude;
    const respone = await AxiosIntance().get(
      `/cinemas/distances/${latitude},${longitude}`
    );
    if (respone.status === "success") {
       // Tìm phần tử có _id trùng với item._id 
      setDistances(respone.data.distances.find(
        (cinema) => cinema._id === item._id
      ));
    } else {
      ToastAndroid.show("Đã xảy ra lỗi!", ToastAndroid.SHORT);
    }
  };


  const ShowTimesClick = () => {
    navigation.navigate("ShowTime", { item });
  };
  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={ShowTimesClick}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View
            style={{ flexDirection: "column", marginStart: "5%", marginTop: 10 }}
          > 
            <Image source={require("../image/location.png")} />
            <Text style={styles.txr3}>{distances.distance} km</Text>
          </View>
          <View style={{ flexDirection: "column",marginStart:30,flexWrap:"wrap",flex:1,flexDirection:"row" }}>
            <Text style={styles.txtRole}>{item.name}</Text>
            <Text style={styles.txt2} >{item.location.address}</Text>
          </View>
        </View>
        <Image style={styles.line} source={require("../image/line.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default ItemCinema;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130B2B",
  },
  navBack: {
    width: 40,
    height: 40,
    marginStart: 22,
  },
  txt1: {
    color: "#DA004E",
    fontSize: 23,
    fontWeight: "400",
    alignSelf: "center",
    marginStart: "15%",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64,
    marginTop: 8,
    marginStart: 8,
    marginEnd: 8,
  },
  name: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  role: {
    color: "rgba(0, 0, 0, 0.40)",
    fontSize: 12,
    fontWeight: "400",
  },
  btnNavigate: {
    marginStart: 68,
    marginTop: 24,
  },
  container1: {
    backgroundColor: "#1A0F3C",
  },
  row: {
    flexDirection: "row",
    marginStart: 24,
    marginTop: 20,
  },
  txt2: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "200",
    marginTop: 6,
  },
  txr3: {
    color: "#fff",
    fontSize: 12,
    marginTop:5,
    fontWeight: "300",
  },
  txtRole: {
    color: "#F74346",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 6,
  },
  time: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  container2: {
    flexDirection: "row",
    marginTop: 7,
    marginStart: 10,
  },
  line: {
    width: "95%",
    marginTop: 16,
    marginStart: 75,
  
  },
  img: {
    marginStart: 12,
    marginTop: 7.5,
  },
  txtType: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "300",
    marginTop: 8.5,
    marginStart: 8,
  },
});
