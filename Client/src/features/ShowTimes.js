import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    id: "1",
    name: "REAL D 3D",
    role: "Dubbed",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "General",
  },
  {
    id: "2",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
  {
    id: "3",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "General",
  },
  {
    id: "4",
    name: "REAL D 3D",
    role: "Dubbed",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "General",
  },
  {
    id: "5",
    name: "REAL D 3D",
    role: "Dubbed",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
  {
    id: "6",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
  {
    id: "7",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
  {
    id: "8",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
  {
    id: "9",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
  {
    id: "10",
    name: "REAL D 3D",
    role: "Subtitle",
    time1: "15:30",
    time2: "17:40",
    time3: "18:45",
    time4: "21:25",
    type: "Premier",
  },
];

const renderItem = ({ item }) => (
  <View style={styles.container1}>
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <Text style={styles.txt2}>{item.name}</Text>
      <Text style={styles.txtRole}>{item.role}</Text>
    </View>
    <View style={styles.container2}>
      <Text style={styles.time}>{item.time1}</Text>
      <Text style={styles.time}>{item.time2}</Text>
      <Text style={styles.time}>{item.time3}</Text>
      <Text style={styles.time}>{item.time4}</Text>
    </View>
    <Image style={styles.line} source={require("../image/line.png")} />
    <View style={{flexDirection:"row",alignItems:"center",}}>
    <Image style={styles.img} source={require("../image/seat.png")} />
    <Text style={styles.txtType}>{item.type}</Text>
    </View>
  </View>
);

const ShowTimes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.navBack}
          source={require("../image/navback.png")}
        />
        <Text style={styles.txt1}>Choose the time</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ShowTimes;

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
    marginEnd: 163,
    marginStart: 5,
    justifyContent: "space-around",
  },
  line: {
    marginTop: 5,
    marginStart: 8,
    marginEnd: 7,
  },
  img:{
    marginStart:12,
    marginTop:7.5,
  },
  txtType:{
    color:"#fff",
    textAlign:"center",
    fontSize:10,
    fontWeight:"300",
    marginTop:8.5,
    marginStart:8,
  }
});
