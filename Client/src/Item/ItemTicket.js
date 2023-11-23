import { View, Text, TouchableOpacity,Image, StyleSheet, Dimensions, TextInput, ImageBackground} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const ItemTicket = (props) => {
    const { item, navigation } = props;
    const ImageURL = `http://149.28.159.68:3000/img/movies/${item.showtime.movie.imageCover}`
     //format thoi gian
  const inputTimestamp = item.showtime.start_time;
  const datePart = inputTimestamp.slice(0, 10);
  const timePart = inputTimestamp.slice(11, 16);

  const date = new Date(datePart);// Lấy ngày từ datePart 
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  

// Lấy thông tin ngày, tháng, năm
const day = date.getUTCDate();
const month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0
const year = date.getUTCFullYear();

// Định dạng lại ngày theo dạng "DD-MM-YYYY"
const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;


//   console.log(`Ngày thứ ${dayOfWeek}`);

    return (
        <TouchableOpacity >
         <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ImageURL}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={["rgba(255,85,36,0)", "#FF5524"]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{formattedDate}</Text>
              <Text style={styles.subtitle}>{dayOfWeek}</Text>
            </View>
            <View style={styles.subtitleContainer}>
            <Image  source={require('../image/clock.png')} />
              <Text style={styles.subtitle}>{timePart}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Phòng</Text>
              <Text style={styles.subtitle}>{item.showtime.room.name}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Ghế</Text>
              <Text style={styles.subtitle}>{item.seats}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Mã vé</Text>
              <Text style={styles.subtitle}>
              {item.ticket_code}
              </Text>
            </View>
          </View>
          <Image
            source={require('../image/barcode.png')}
            style={styles.barcodeImage}
          />
          </View>
          </View>
          
        </TouchableOpacity>
    )
}

export default ItemTicket

const styles = StyleSheet.create({
    ticketContainer: {
        flex: 1,
        justifyContent: 'center',
        padding:20
      },
      ticketBGImage: {
        alignSelf: 'center',
        width: 250,
        aspectRatio: 200 / 300,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
        justifyContent: 'flex-end',
      },
      linearGradient: {
        height: '70%',
      },
      linear: {
        borderTopColor: "black",
        borderTopWidth: 3,
        width: 250,
        alignSelf: 'center',
        backgroundColor: "#FF5524",
        borderStyle: 'dashed',
      },
      ticketFooter: {
        backgroundColor: "#FF5524",
        width: 250,
        alignItems: 'center',
        paddingBottom: 25,
        alignSelf: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      },
      ticketDateContainer: {
        flexDirection: 'row',
        gap: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      },
      ticketSeatContainer: {
        flexDirection: 'row',
        gap: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      },
      dateTitle: {
        fontSize: 20,
        color: "white",
      },
      subtitle: {
        fontSize: 14,
        color: "white",
        fontWeight:'bold'
      },
      subheading: {
    
        fontSize: 18,
        color: "white",
      },
      subtitleContainer: {
        alignItems: 'center',
      },
      barcodeImage: {
        height: 50,
        aspectRatio: 158 / 52,
      },
      blackCircle: {
        height: 80,
        width: 80,
        borderRadius: 80,
        backgroundColor: "black",
      },
  });