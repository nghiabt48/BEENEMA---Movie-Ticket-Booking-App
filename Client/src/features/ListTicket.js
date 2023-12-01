import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import ItemTicket from "../Item/ItemTicket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosIntance from "./AxiosIntance";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container}>
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
      {isLoading === true ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ marginVertical: "5%",marginStart:10}}>
          <FlatList
            data={ticket}
            renderItem={({ item }) => (
              <ItemTicket item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ListTicket;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#130B2B",
  },
  header: {
    flexDirection: "row",
    marginStart:"10%"
  },
  textstyle: {
    color: "white",
    fontWeight: "bold",
  },
});


