import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
const DetailTickets = (props) => {
  const { route } = props;
  const { navigation } = props;
  const { params } = route;

  //format thoi gian
  const inputTimestamp = params.item.showtime.start_time;
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
  const formattedDate = `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
    }${month}-${year}`;

  const amount = params.item.showtime.price;
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);



  const Back = () => {
    navigation.goBack();
  };

  const BarcodeGenerator = ({ code }) => {
    return (
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <QRCode
          value={code}
          size={240}
          color="black" // Màu của mã vạch
          backgroundColor="white" // Màu nền của mã vạch
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerMain}>
      <View style={styles.header}>
        <TouchableOpacity onPress={Back}>
          <Image source={require("../icons/back.png")} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Chi tiết vé</Text>
      </View>

      <View style={styles.body}>
        <BarcodeGenerator code={params.item.ticket_code} />
        <Image
          style={{ marginTop: 16 }}
          source={require("../image/tearline.png")}
        />
        <Text style={styles.txtName}>{params.item.showtime.movie.title}</Text>
        <View style={{ marginStart: 16, flexDirection: "row", marginTop: 16 }}>
          <Text style={styles.txtMain}>Rạp:</Text>
          <Text>
            <Text style={styles.txtSub}>
              {params.item.showtime.room.cinema.name}
            </Text>
            {"\n"}
            <Text style={styles.txtAddress}>
              {params.item.showtime.room.cinema.name}
            </Text>
          </Text>
        </View>
        <View style={{ marginStart: 16, flexDirection: "row", marginTop: 8 }}>
          <Text style={styles.txtMain}>Ngày:</Text>
          <Text style={styles.txtSub}>
            {dayOfWeek} {formattedDate}, {timePart}
          </Text>
        </View>
        <View style={{ marginStart: 16, flexDirection: "row", marginTop: 8 }}>
          <Text style={styles.txtMain}>Phòng:</Text>
          <Text style={styles.txtSub}>{params.item.showtime.room.name}</Text>
        </View>
        <View style={{ marginStart: 16, flexDirection: "row", marginTop: 8 }}>
          <Text style={styles.txtMain}>Ghế:</Text>
          <Text style={styles.txtSub}>{params.item.seats.join(", ")}</Text>
        </View>
        <View style={{ marginStart: 16, flexDirection: "row", marginTop: 8 }}>
          <Text style={styles.txtMain}>Giá:</Text>
          <Text style={styles.txtSub}>{formattedAmount}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTickets;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#130B2B",
  },
  header: {
    flexDirection: "row",
    marginStart: 20,
    marginTop: 10
  },
  txtHeader: {
    color: "white",
    fontSize: 23,
    fontWeight: "400",
    alignSelf: "center",
    marginStart: "20%",
  },
  body: {
    backgroundColor: "#1F293D",
    marginStart: 10,
    marginEnd: 10,
    marginTop: 27,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 10,
  },
  txtName: {
    color: "white",
    marginStart: 16,
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 24,
  },
  txtMain: {
    width: 74,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#637394",
  },
  txtSub: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  txtAddress: {
    color: "#637394",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    marginTop: 4,
  },
});
