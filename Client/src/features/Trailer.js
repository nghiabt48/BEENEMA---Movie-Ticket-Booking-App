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
  const title = params.title

  const Back = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewGroup1}>
        <TouchableOpacity onPress={Back}>
          <Image style={styles.boxImage1} source={require('../image/Back.png')}></Image>
        </TouchableOpacity>
        <Text style={styles.textTrailer}>Trailer</Text>
      </View>
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
          shouldPlay
        />
        <Text style={styles.textTitle}>{title}</Text>
      </View>

    </SafeAreaView>
  )
}

export default Trailer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#130B2B'
  },
  video: {
    alignSelf: 'center',
    width: "100%",
    height: 200,
  },
  Group1: {
    marginTop: 10,
  },
  Group2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  boxImage1: {
    width: 40,
    height: 40,

  },
  viewGroup1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textTrailer: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  textTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginStart: 15,
    textAlign:'center'
  }
})