import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AppConText } from "../features/AppConText";

const ItemCinema = (props) => {
  const { item, navigation } = props;
  const {movieId,setmovieId } = useContext(AppConText);

  const ShowTimesClick = () =>{
    navigation.navigate('ShowTime',{item})
  }
  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={ShowTimesClick}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.txt2}>{item.location.address}</Text>
        <Text style={styles.txtRole}>{item.name}</Text>
      </View>
      <Image style={styles.line} source={require("../image/line.png")} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={styles.img} source={require("../image/seat.png")} />
        <Text style={styles.txtType}>{item.type}</Text>
      </View>
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
    marginTop: 10,
    marginStart: 21,
    marginEnd: 19,
    borderRadius: 5,
    height: 81,
  },
  row: {
    flexDirection: "row",
    marginStart: 24,
    marginTop: 20,
  },
  txt2: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "400",
    marginTop: 6,
    marginStart: 12,
  },
  txtRole: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "300",
    marginTop: 6,
    marginEnd: 9,
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
    width:'95%',
    marginTop: 5,
    marginStart: 8,
    marginEnd: 7,
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