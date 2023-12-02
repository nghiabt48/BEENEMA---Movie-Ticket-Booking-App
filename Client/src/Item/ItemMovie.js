import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemMovie = (props) => {
  const { data, navigation } = props;
  const ImageURL = `http://149.28.159.68:3000/img/movies/${data.imageCover}`
  const goDetail = function() {
    navigation.navigate('DetailMovie', {data, ImageURL})
  }
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goDetail}> 
      <View style={styles.Group}>
        <Image source={{uri: ImageURL}} style={styles.Image}/>
        <Text style={styles.Text1}>{data.title}</Text>
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F74346',
    textAlign:'center'
  },
  Image:{
    borderRadius:10,
    height:200,
    width:'100%',
    
  },
  Group:{
    backgroundColor: '#130B2B',
    alignItems: 'center',
    
  }
})