import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemMovie from '../Item/ItemMovie'
import { SafeAreaView } from 'react-native-safe-area-context';
import AxiosIntance from './AxiosIntance';

const ListMovie = (props) => {
    const { navigation } = props;
    const [data, setdata] = useState([])
    const [isLoading, setisLoading] = useState(null);
    //get all movie
    useEffect(() => {
        const getAllMovie = async () => {
            setisLoading(true)
            const response = await AxiosIntance().get("/movies");
            if (response.status == "success") {
                setdata(response.data.data);
                setisLoading(false)
            } else {
                setisLoading(false)
                setdata(null)
            }
        }
        getAllMovie();

        return () => {

        }
    }, [])

    // set time out
    let timeOut = null;
    const down = (searchText) => {
        if (timeOut) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(() => {
            search(searchText);
        }, 1000);
    }
    //get movie by title
    const search = async (searchText) => {
        setisLoading(true);
        const respone = await AxiosIntance().get("/movies/search?title=" + searchText);
        if (respone.status == "success") {
            setdata(respone.movie);
            setisLoading(false);
        } else {
            
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Search}>
                <Image source={require('../image/Layer3.png')} />
                <TextInput placeholder='Tìm kiếm...' placeholderTextColor={'#ffff'} onChangeText={(text) => down(text)} style={styles.TextInputSearch}></TextInput>
            </View>
            {
                isLoading == true ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <FlatList
                        data={data}
                        numColumns={2}
                        renderItem={({ item }) => <ItemMovie data={item} navigation={navigation} />}
                        keyExtractor={(item) => item._id}
                        showsVerticalScrollIndicator={false} />)
            }

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
        flex: 1,
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

})
