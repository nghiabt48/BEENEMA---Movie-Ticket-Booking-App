import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemMovie = (props) => {
  const { data, navigation } = props;
  return (
    <TouchableOpacity style={styles.container}> 
      <View style={styles.Group}>
        <Image source={require('../image/image3.png')} style={styles.Image}/>
        <Text style={styles.Text1}>dfgdgdfgfd</Text>
      </View>
    </TouchableOpacity>

  )
}

export default ItemMovie

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: Dimensions.get('window').width / 2,
    padding:13,
  },
  Text1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F74346',
  },
  Image:{
    borderRadius:10,
    height:200,
    width:'100%'
  },
  Group:{
    backgroundColor: '#130B2B',
    alignItems: 'center',
  }
})