import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemActor = (props) => {
    const { data } = props;
  return (
    <View style={styles.container}> 
        <Image source={require('../image/Code.png')} style={styles.Image}/>
        <Text style={styles.Text1}>dfgdg</Text>
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
        fontSize: 15,
        fontWeight: '600',
        color: '#ffff',
      },
      Image:{
        borderRadius:100,
        height:50,
        width: 50,
      },
      
})