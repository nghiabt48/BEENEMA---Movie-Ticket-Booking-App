import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
const ItemTicket = (props) => {
  const { item, navigation } = props;
  const ImageURL = `http://149.28.159.68:3000/img/movies/${item.showtime.movie.imageCover}`;
  //format thoi gian
  const inputTimestamp = item.showtime.start_time;
  const datePart = inputTimestamp.slice(0, 10);
  const timePart = inputTimestamp.slice(11, 16);
  const date = new Date(datePart); // Lấy ngày từ datePart
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];

  // Lấy thông tin ngày, tháng, năm
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear();

  // Định dạng lại ngày theo dạng "DD-MM-YYYY"
  const formattedDate = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;

  //   console.log(`Ngày thứ ${dayOfWeek}`);

  const goDetail = function () {
    navigation.navigate("DetailTickets", { item });
  };

  return (
    <TouchableOpacity onPress={goDetail}>
      <View style={styles.containerMain}>
        <Image
          style={{ width: "45%", height: 106, borderRadius: 20 }}
          source={{ uri: ImageURL }}
        />
        <View style={styles.containerSub}>
          <Text style={styles.txtName}>{item.showtime.movie.title}</Text>
          <Text style={{ marginStart: 10, marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
              Ngày:{" "}
            </Text>
            <Text style={styles.txtDate}>
              {dayOfWeek} {formattedDate}
            </Text>
          </Text>
          <Text style={{ marginStart: 10, marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
              Thời gian:{" "}
            </Text>
            <Text style={styles.txtDate}>{timePart} | </Text>
            <Text style={{ flex: 1 }}>
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                Ghế:{" "}
              </Text>
              <Text style={styles.txtDate}>{item.seats.join(", ")}</Text>
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemTicket;

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: "row",
    marginTop: 15,
    flex: 1,
  },
  containerSub: {
    flexDirection: "column",
    marginTop: 10,
  },
  txtName: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    flexWrap: "wrap",
    marginStart: 10,
  },
  txtDate: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    flexWrap: "wrap",
    width:50,
  },
});
