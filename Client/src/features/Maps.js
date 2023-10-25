import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import cinemaMarkerImage from '../image/cinema3.png';
import userMarkerImage from '../image/userlocation.png';
const Maps = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Ref cho MapView
  const [theaters, setTheaters] = useState([
    { id: 1, name: "CGV Hoàng Văn Thụ", latitude: 10.79883, longitude: 106.66101 },
    { id: 2, name: "Galaxy Cinema Nguyễn Văn Quá", latitude: 10.84716047399322, longitude: 106.63405551525818 },
    // Add more theaters here
  ]);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log(currentLocation);

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
  }, []);

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
            key={theater.id}
            coordinate={{
              latitude: theater.latitude,
              longitude: theater.longitude,
            }}
            title={theater.name}
           
            image={cinemaMarkerImage}
          />
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
