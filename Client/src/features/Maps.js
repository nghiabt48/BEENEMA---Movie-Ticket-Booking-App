import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import cinemaMarkerImage from "../image/cinema3.png";
import userMarkerImage from "../image/userlocation.png";
import AxiosIntance from "./AxiosIntance";
import Autocomplete from "react-native-autocomplete-input";
const Maps = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Ref cho MapView
  const [theaters, setTheaters] = useState([]);
  const [distances, setDistances] = useState([]);
  const [data, setdata] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Di chuyển bản đồ đến vị trí hiện tại
      if (mapRef.current && currentLocation) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };
    getPermissions();
    getCinema();
    getCinemaDistance();
  }, []);

  const getCinema = async () => {
    const respone = await AxiosIntance().get("/cinemas");
    if (respone.status === "success") {
      setTheaters(respone.data.data);
      // console.log(respone.data.data);
    } else {
      ToastAndroid.show("Đã xảy ra lỗi!", ToastAndroid.SHORT);
    }
  };

  const getCinemaDistance = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    const latitude = currentLocation.coords.latitude;
    const longitude = currentLocation.coords.longitude;
    const respone = await AxiosIntance().get(
      `/cinemas/distances/${latitude},${longitude}`
    );
    if (respone.status === "success") {
      setDistances(respone.data.distances);
      // console.log(respone.data.distances);
    } else {
      ToastAndroid.show("Đã xảy ra lỗi!", ToastAndroid.SHORT);
    }
  };

  const navigateToCinemaLocation = (latitude, longitude) => {
    // Sử dụng hàm setRegion của MapView để cập nhật vị trí hiện tại của bản đồ
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05, // Bạn có thể điều chỉnh giá trị này để zoom vào hoặc ra khỏi vị trí cinema
      longitudeDelta: 0.05,
    });
  };

  const searchCinema = async (text) => {
    const respone = await AxiosIntance().get("/cinemas?name=" + text);
    if (respone.status === "success") {
      const cinemaData = respone.data;
      setdata(cinemaData);
      // console.log(cinemaData);

      // Kiểm tra xem có dữ liệu vị trí không trước khi chuyển đến vị trí đầu tiên
      if (cinemaData.length > 0 && cinemaData[0].location) {
        const firstCinemaLocation = cinemaData[0].location.coordinates;

        navigateToCinemaLocation(
          firstCinemaLocation[1],
          firstCinemaLocation[0]
        );
      }
    } else {
      // Xử lý trường hợp lỗi
    }
  };

 

  const renderSuggestions = ({ item }) => {
    console.log(item); // Log giá trị của trường "name" trong đối tượng item
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#130B2B" }}>
      <View style={styles.Search}>
        <Autocomplete
          data={data}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            searchCinema(text);
        
          }}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => <Text style={{color:"red",fontSize:16,padding:10}}>{item.name}</Text>,
          }}
          placeholder="Tìm kiếm..."
        />
      </View>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: location ? location.coords.latitude : 0, // Set to 0 if location is not available
          longitude: location ? location.coords.longitude : 0,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            image={userMarkerImage}
          />
        )}
        {theaters.map((theater) => {
          const distanceInfo = distances.find(
            (item) => item._id === theater._id
          );
          const distance = distanceInfo ? distanceInfo.distance : "N/A";

          return (
            <Marker
              key={theater._id}
              coordinate={{
                latitude: theater.location.coordinates[1],
                longitude: theater.location.coordinates[0],
              }}
              title={theater.name}
              image={cinemaMarkerImage}
            >
              <Callout>
                <Text>
                  <Text>Rạp : </Text>
                  <Text style={styles.txt}>{theater.name}</Text>
                </Text>
                <Text>
                  <Text>Khoảang Cách : </Text>
                  <Text style={styles.txt}>{distance} Kilometers</Text>
                </Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FA6900",
  },
  txt: {
    fontWeight: "bold",
  },
  Search: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop:10
  },
  TextInputSearch: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FA6900",
    padding: 8,
    borderRadius: 20,
    color: "#ffff",
  },
});
