import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AppConText } from "../features/AppConText";

const ItemShowTime = (props) => {
  const { item, navigation } = props;
  const { movieId, setmovieId } = useContext(AppConText);
  const RoomClick = function() {
    navigation.navigate('SeatCinemaSocket',{item,movieId})
  }
  //format thoi gian
  const inputTimestamp = item.start_time;
  const endTime = item.end_time;
  const endtimePart = endTime.slice(11, 16);
  const datePart = inputTimestamp.slice(0, 10);
  const timePart = inputTimestamp.slice(11, 16);


  //format gia tien
  const amount = item.price;
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={RoomClick}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.txt2}>Ngày chiếu: {datePart}</Text>
        <Text style={styles.txtRole}>{formattedAmount}</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.time}>Thời gian chiếu: </Text>
        <Text style={styles.time}>{timePart} </Text>
        <Text style={styles.time}>- </Text>
        <Text style={styles.time}>{endtimePart}</Text>
      </View>
      <Text style={styles.time2}>Phòng: {item.room.name}</Text>
      <Image style={styles.line} source={require("../image/line.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default ItemShowTime;

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
  },
  row: {
    flexDirection: "row",
    marginStart: 24,
    marginTop: 20,
  },
  txt2: {
    color: "#fff",
    fontSize: 14,
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
    fontSize: 10,
    fontWeight: "400",
  },
  time2: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "400",
    marginStart:12
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
