import { FlatList, Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import ItemMovie from './ItemMovie'
import { SafeAreaView } from 'react-native-safe-area-context';
import AxiosIntance from './AxiosIntance';

const ListMovie = (props) => {
    const { navigation } = props;
    const [data, setdata] = useState([])
    //const [isLoading, setisLoading] = useState(null);
    
    const getAllMovie = async () => {
        //setisLoading(true)
        const response = await AxiosIntance().get("/movies");
        if (response.status == "success") {
            setdata(response.data.data);  
        } else {
            ToastAndroid.show("Lay du lieu that bai", ToastAndroid.SHORT);
            setdata(null)
        }
    }
    getAllMovie();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Search}>
                <Image source={require('../image/Layer3.png')} style={styles.ImageSearch}/>
                <TextInput placeholder='Search...' placeholderTextColor={'#ffff'} style={styles.TextInputSearch}></TextInput>
            </View>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item }) => <ItemMovie data={item} navigation={navigation} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false} />
        </SafeAreaView>

    )
}

export default ListMovie

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#130B2B',
        padding: 13

    },
    TextInputSearch: {
        flex:1,
        borderWidth: 1,
        borderColor: '#FA6900',
        padding: 8,
        borderRadius: 20,
        color: '#ffff',
    },
    Search: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    Images:{
       flex:1
    }
})
