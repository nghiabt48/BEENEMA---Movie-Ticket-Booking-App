import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

const Trailer = (props) => {
  const video = React.useRef(null);
  const { route } = props
  const navigation = useNavigation();
  const { params } = route
  const trailer = params.trailer
  
  const Back = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.Group1} onPress={Back}>
        <Image source={require('../image/Back.png')} style={styles.boxImage1} />
      </TouchableOpacity>
      <View style={styles.Group2}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: trailer,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping

        />
      </View>

    </SafeAreaView>
  )
}

export default Trailer

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  Group1: {

  },
  Group2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxImage1: {
    width: 40,
    height: 40,
    marginStart: 15,
    marginTop: 10,
  },
})