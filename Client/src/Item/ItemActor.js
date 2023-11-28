import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemActor = (props) => {
    const { data } = props;
    const ImageURL = `http://149.28.159.68:3000/img/actors/${data.avatar}`

    const shortenText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
      }
      return text;
    };
  return (
    <View style={styles.container}> 
        <Image source={{uri: ImageURL}} style={styles.Image}/>
        <Text style={styles.Text1}>{shortenText(data.name,14)}</Text>
    </View>
  )
}

export default ItemActor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart:10,
        alignItems:'center'
      },
      Text1: {
        fontSize: 10,
        fontWeight: '500',
        color: '#ffff',
      },
      Image:{
        borderRadius:100,
        height:50,
        width: 50,
      },
      
})