import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Axios } from "axios";
import AxiosIntance from "./AxiosIntance";
import ItemShowTime from "../Item/ItemShowTime";
import { AppConText } from "./AppConText";


const ShowTimes = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  const [showtime, setshowtime] = useState();
  const [isLoading, setisLoading] = useState(null);
  const {movieId,setmovieId } = useContext(AppConText);

  const Back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchShowTime();
    return () => {};
  }, []);

  const fetchShowTime = async () => {
    setisLoading(true);
    const response = await AxiosIntance().get(`/showtimes?cinema=${params.item._id}`);
    if (response.status == "success") {
      setshowtime(response.data.showtimes.filter(item => item.movie.id == movieId._id));
      setisLoading(false);
    } else {
      setisLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={Back}>
          <Image
            style={styles.navBack}
            source={require("../image/navback.png")}
          />
        </TouchableOpacity>

        <Text style={styles.txt1}>Chọn xuất chiếu</Text>
      </View>

      <FlatList
        data={showtime}
        renderItem={({ item }) => <ItemShowTime item={item}  navigation={navigation}/>}
        keyExtractor={(item) => item._id}
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
    width: 35,
    height: 35,
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
