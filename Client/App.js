
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logins from "./src/features/Logins";
import { AppConTextProvider } from "./src/features/AppConText";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/features/AppNavigator";




const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <AppConTextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppConTextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
