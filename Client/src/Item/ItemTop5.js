import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
const ItemTop5 = (props) => {
  const { data, navigation } = props;
  const ImageURL = `http://149.28.159.68:3000/img/movies/${data.imageCover}`;
  const goDetail = function () {
    navigation.navigate("DetailMovie", { data, ImageURL });
  };
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goDetail}>
      <View style={styles.Group}>
        <Image source={{ uri: ImageURL }} style={styles.Image} />
        <View style={{ position: "absolute",alignSelf:"flex-end",flexDirection:"row" }}>
          <Text
            style={{
           
              color: "white",
              fontWeight: "bold",
              fontSize: 22,
            
            }}
          >
            {data.ratingsAverage}
          </Text>
          <MaterialIcons name={"star"} size={25} style={styles.starSelected} />
        </View>

        <Text style={styles.Text1}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemTop5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //maxWidth: Dimensions.get("window").width / 2,
    padding: 8,
  },
  Text1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F74346",
    textAlign:"center"
  },
  Image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 200,
    width: '100%',
    opacity:0.7
  },
  Group: {
    backgroundColor: "#130B2B",
    alignItems: "center",
  },
  starSelected: {
    color: "#FFD700",
    marginTop:2
  },
});
