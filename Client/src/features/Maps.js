import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";
import cinemaMarkerImage from "../image/cinema3.png";
import userMarkerImage from "../image/userlocation.png";
import AxiosIntance from "./AxiosIntance";
const Maps = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Ref cho MapView
  const [theaters, setTheaters] = useState([]);
  const [distances,setDistances] = useState();
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
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
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
      setDistances(respone.data.data);
      console.log(respone.data.data);
    } else {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
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
        {theaters.map((theater) => (
          
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
              <Text>{theater.name}</Text>
              <Text>{distances.name}</Text>
              {/* Hiển thị khoảng cách ở đây */}
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
