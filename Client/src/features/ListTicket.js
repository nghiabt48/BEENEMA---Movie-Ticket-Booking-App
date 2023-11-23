import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import ItemTicket from "../Item/ItemTicket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosIntance from "./AxiosIntance";

const ListTicket = (props) => {
  const { navigation } = props;
  const [ticket, setTicket] = useState();
  const [isLoading, setisLoading] = useState(null);
  const Back = () => {
    navigation.goBack();
  };
  useEffect(() => {
    fetchTickets();
    return () => {};
  }, []);

  const fetchTickets = async () => {
    setisLoading(true);
    const response = await AxiosIntance().get(`/tickets/user`);
    if (response.status === "success") {
      setTicket(response.data.tickets);

      setisLoading(false);
    } else {
      setisLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Phần đầu */}
      <View style={styles.header}>
        <TouchableOpacity onPress={Back}>
          <Image
            style={styles.imagestyle}
            source={require("../icons/back.png")}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: -50 }}>
          <Text style={[styles.textstyle, { textAlign: "center" }]}>
            Vé của tôi
          </Text>
        </View>
      </View>
      {/* Danh sách vé đã mua */}
      <View style={{ marginVertical: "5%", flex: 1 }}>
        <FlatList
          data={ticket}
          horizontal={true}
          renderItem={({ item }) => (
            <ItemTicket item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default ListTicket;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    padding: "10%",
  },
  header: {
    flexDirection: "row",
  },
  textstyle: {
    color: "white",
    fontWeight: "bold",
  },
});

const movieData = [
  {
    _id: "1",
    movietitle: "Star Wars: The Rise of Skywalker (2019)",
    moviedate: "1000",
    movietime: "10:00",
    seat: "5C",
  },
  {
    _id: "2",
    movietitle: "Star Wars: The Rise of Skywalker (2019)",
    moviedate: "1000",
    movietime: "10:00",
    seat: "5C",
  },
  {
    _id: "3",
    movietitle: "Star Wars: The Rise of Skywalker (2019)",
    moviedate: "1000",
    movietime: "10:00",
    seat: "5C",
  },
];
