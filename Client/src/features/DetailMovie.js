import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemCast from '../Item/ItemCast'

const DetailMovie = () => {
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={require('../image/image3.png')} style={styles.boxImage2} />
                {/* btn Back */}
                <TouchableOpacity style={styles.Group1}>
                    <Image source={require('../image/Back.png')} style={styles.boxImage1} />
                </TouchableOpacity>
                {/* btn trailer */}
                <View style={styles.Group2}>
                    <TouchableOpacity style={styles.buttonTrailer}>
                        <View style={styles.fixToText}>
                            <Image source={require('../image/Play.png')} style={styles.boxImage3} />
                            <Text style={styles.text4}>Trailer</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.Group3}>
                    <Text style={styles.text2}>dsfgdgsdfsfgdghf</Text>
                    <Text style={styles.text3}>fdgfdghfhfghfgh</Text>
                </View>
                <FlatList
                    data={data}
                    horizontal={true}
                    style={styles.FlatList}
                    renderItem={({ item }) => <ItemCast data={item} />}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false} />
                <View style={styles.Group3}>
                    <Text style={styles.text5}>fdgfdghfhfghfghdfsdfsdfsdfdsfdfd</Text>
                </View>
                {/* btn BooKing */}
                <View style={styles.Group4}>
                    <TouchableOpacity style={styles.buttonBooking}>
                        <View style={styles.fixToText2}>
                            <Text style={styles.text6}>BooKing</Text>
                            <Image source={require('../image/arrowleft.png')} style={styles.boxImage4} />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default DetailMovie

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#130B2B',
    },
    boxImage1: {
        width: 40,
        height: 40,
        marginStart: 15,
        marginTop: 10,
    },
    boxImage2: {
        width: '100%',
        height: 350,
    },
    boxImage3: {
        width: 30,
        height: 30,
    },
    boxImage4: {
        width: 15,
        height: 15,
    },
    fixToText: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fixToText2: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    Group1: {
        position: 'absolute',
    },
    Group2: {
        width: '100%',
        position: 'absolute',
        height: 350,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    Group3: {
        width: '100%',
        alignItems: 'center'
    },
    Group4: {
        width: '100%',
        alignItems: 'center',
        marginTop:30,
    },
    text1: {
        width: '100%',
        color: '#DA004E',
        fontSize: 23,
        fontWeight: '600',
        marginStart: 10
    },
    text2: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginStart: 15,

    },
    text3: {
        color: '#F74346',
        fontSize: 18,
        fontWeight: '600',
        marginStart: 15
    },
    text4: {
        color: '#fff',
        fontSize: 18,
        marginStart: 10,
    },
    text5: {
        color: '#fff',
        fontSize: 15,
    },
    text6: {
        color: '#fff',
        fontSize: 22,
        fontWeight:'bold'
    },
    buttonTrailer: {
        width: 150,
        height: 48,
        backgroundColor: '#F74346',
        borderRadius: 15,
        marginEnd: 30,
        marginBottom: 20
    },
    buttonBooking: {
        width: 225,
        height: 48,
        backgroundColor: '#F74346',
        borderRadius: 15,
        
    },
    FlatList: {
        margin: 15
    }
})
const data =
    [
        {
            "_id": "1",

        },
        {
            "_id": "2",

        },
        {
            "_id": "3",

        },
        {
            "_id": "4",

        },
    ]
