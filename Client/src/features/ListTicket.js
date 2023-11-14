import { View, Text, TouchableOpacity,Image, StyleSheet, Dimensions, TextInput, FlatList} from 'react-native'
import React from 'react'
import ItemTicket from './ItemTicket'

const ListTicket = () => {
  return (
    // Mới set cứng thôi
    <View style={styles.container}>
       {/* Phần đầu */}
       <View style={styles.header}>   
            <TouchableOpacity>
                <Image style={styles.imagestyle} source={require('../icons/back.png')} />
                </TouchableOpacity>               
            <View style={{flex:1, justifyContent:'center', marginLeft:-50}}>
                <Text style={[styles.textstyle, {textAlign:'center'}]}>Vé của tôi</Text>
            </View>
        </View>
        {/* Danh sách vé đã mua */}
        <View style={{marginVertical:'5%'}}>
            <FlatList
                data={movieData}
                renderItem={({item}) => <ItemTicket dulieu={item}/>}>
            </FlatList>
        </View>
    </View>
  )
}

export default ListTicket
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'black',
        padding:'10%'
    },
    header:{
        flexDirection:'row',
    },
    textstyle:{
        color:'white',
        fontWeight:'bold',
    },
    
})

const movieData = [
    {
        "_id": "1",
        "movietitle": "Star Wars: The Rise of Skywalker (2019)",
        "moviedate": "1000",
        "movietime":"10:00",
        "seat":"5C"
    },
    {
        "_id": "2",
        "movietitle": "Star Wars: The Rise of Skywalker (2019)",
        "moviedate": "1000",
        "movietime":"10:00",
        "seat":"5C"
    },
    {
        "_id": "3",
        "movietitle": "Star Wars: The Rise of Skywalker (2019)",
        "moviedate": "1000",
        "movietime":"10:00",
        "seat":"5C"
    }
]