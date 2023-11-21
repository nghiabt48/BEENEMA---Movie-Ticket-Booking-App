
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logins from "./src/features/Logins";
import { AppConTextProvider } from "./src/features/AppConText";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/features/AppNavigator";
import { StripeProvider } from '@stripe/stripe-react-native';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51NBvkEFht8KJ0hQJRDYtBvGbE1gXSaIFRFiz3pBErwMQ9B45YKIGVv6CoDVut4nhX7UMipWPeHZDcDzdNdZhnGny00bPelUPPE"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <AppConTextProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppConTextProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
