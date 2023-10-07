import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.Row1}>
        <Text style={styles.textProfile}>Profile</Text>
        <Image source={require("./src/image/Settings.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161621",
  },
  Row1: {
    flexDirection: "row",
  },
  textProfile: {
    color: "white",
    fontWeight: "bold",
    fontSize: 27,
  },
});
