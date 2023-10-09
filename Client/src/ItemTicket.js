import { View, Text, TouchableOpacity,Image, StyleSheet, Dimensions, TextInput} from 'react-native'
import React from 'react'

const ItemTicket = (props) => {
    const {dulieu} = props;
    return (
        // Set cứng nốt
        <TouchableOpacity style={{marginVertical:'5%', backgroundColor:'rgba(255, 255, 255, 0.1)', borderRadius:10, padding:'5%'}}>
            <View style={styles.container}>
                <Image style={styles.image} source={require('./icons/itemticket.png')}></Image>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>{dulieu.movietitle}</Text>
                    <Text style={styles.textTitle}>Date: {dulieu.moviedate}</Text>
                    <Text style={styles.textTitle}>Time: {dulieu.movietime} | Seat: {dulieu.seat}</Text>    
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemTicket

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
    },
    
    image: {
       width:'40%',
       height:undefined,
       borderRadius:10,
       aspectRatio:1
    },
    textTitle: {
        fontSize:12,
        fontWeight:'bold',
        color:'white',
    },
    content: {
        width:'60%',
        marginHorizontal:'5%',
        flexDirection:'column',
        justifyContent:'space-between'
    }
  });