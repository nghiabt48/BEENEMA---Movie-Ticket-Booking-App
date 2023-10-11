import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppConText } from './AppConText';
import Logins from './Logins';
import Registers from './Registers';
import ListMovie from './ListMovie';
import ItemMovie from './ItemMovie';
import Test1 from './Test1';
import Test2 from './Test2';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Users = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Logins} />
      <Stack.Screen name="Register" component={Registers} />
    </Stack.Navigator>
  )

}

const Main = () => {
  return (
    <Tab.Navigator initialRouteName='Movie' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return <Image source={require('../image/videoplay.png')} />
        } else if (route.name === 'Test2') {
          return <Image source={require('../image/videoplay.png')} />
        } else if (route.name === 'Test1') {
          return <Image source={require('../image/videoplay.png')} />
        } else if (route.name === 'ProfileScreen') {
          return <Image source={require('../image/videoplay.png')} />
        }
      },
      tabBarActiveTintColor: '#F74346',
      tabBarInactiveTintColor: '#4A4B56',
      tabBarActiveBackgroundColor: '#130B2B',
      tabBarInactiveBackgroundColor: '#130B2B',
      tabBarLabelStyle: {
        fontWeight: '700',
      }
    })}>
      <Stack.Screen name="Home" component={ListMovie} options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="Test2" component={Test2} options={{ headerShown: false }} />
      <Tab.Screen name="Test1" component={Test1} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false}} />
    </Tab.Navigator>

  )

}
const AppNavigator = () => {
  const { isLogin } = useContext(AppConText);
  return (
    <>
      {
        isLogin == false ? <Users /> : <Main />
      }
    </>
  )
}

export default AppNavigator

const styles = StyleSheet.create({
  ImageIcon:{
    width:25,
    height:25,
  }
})