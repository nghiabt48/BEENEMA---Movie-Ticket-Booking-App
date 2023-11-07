import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const SeatCinema = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatPress = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };
    const renderSeats = () => {
        const seatLayout = [];

        for (let row = 1; row <= 7; row++) {
            const rowSeats = [];
            for (let seat = 1; seat <= 9; seat++) {
                const seatNumber = row * 10 + seat;
                const isSelected = selectedSeats.includes(seatNumber);

                rowSeats.push(
                    <TouchableOpacity
                        key={seatNumber}

                        onPress={() => handleSeatPress(seatNumber)}
                    >
                        {
                            isSelected ? <Image style={styles.seat} source={require('../image/seat3.png')}></Image> : <Image style={styles.seat} source={require('../image/seat1.png')}></Image>
                        }

                    </TouchableOpacity>
                );
            }

            seatLayout.push(
                <View key={row} style={styles.row}>
                    {rowSeats}
                </View>
            );
        }



        return seatLayout;
    };
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.viewGroup1}>
                <TouchableOpacity >
                    <Image style={styles.ImageBack} source={require('../image/back3.png')}></Image>
                </TouchableOpacity>
                <Text style={styles.textseat}>Choose seats</Text>
            </View>
            <View style={styles.viewGroup2}>
                <Image style={styles.ImageMovies} source={require('../image/image3.png')}></Image>
                <View>
                    <View style={styles.viewGroup4}>
                        <Image style={styles.ImageIcon} source={require('../image/layoutseat1.png')}></Image>
                        <Text style={styles.textTitile}>Ten Phim</Text>
                    </View>
                    <View style={styles.viewGroup4}>
                        <Image style={styles.ImageIcon} source={require('../image/layoutseat3.png')}></Image>
                        <Text style={styles.textTitile}>Cinema</Text>
                    </View>
                    <View style={styles.viewGroup4}>
                        <Image style={styles.ImageIcon} source={require('../image/layoutseat2.png')}></Image>
                        <Text style={styles.textTitile}>Date</Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewGroup3}>
                {renderSeats()}
            </View>
            <View style={styles.Group4}>
                <TouchableOpacity style={styles.buttonBooking}>
                    <LinearGradient
                        colors={['#F34C30', '#DA004E']}
                        style={styles.gradient}
                        end={{ x: 0.01, y: 1 }}
                    >
                        <View style={styles.fixToText}>
                            <View style={styles.Group3}>
                                <Image source={require('../image/cart.png')} style={styles.boxImage5} />
                                <Text style={styles.textPice}>200.000VND</Text>
                            </View>

                            <Text style={styles.text6}>Continue</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default SeatCinema

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#130B2B',
        padding: 15
    },
    row: {
        flexDirection: 'row'
    },
    seat: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

    },
    // selectedSeat: {
    //     backgroundColor: 'blue',

    // },
    // selectedSeatsText: {
    //     marginTop: 20,
    //     fontSize: 16,
    //     color: '#fff'
    // },
    textseat: {
        color: '#F74346',
        fontSize: 23,
        fontWeight: '400',
        flex: 1,
        textAlign: 'center'
    },
    viewGroup1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    ImageBack: {
        width: 30,
        height: 30,

    },
    viewGroup2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    viewGroup3: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    viewGroup4: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    textTitile: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '300'
    },
    ImageMovies: {
        width: 100,
        height: 180,
        borderRadius: 10,
    },
    ImageIcon: {

    },
    Group4: {
        paddingStart: '5%',
        paddingEnd: '5%',
        alignItems: 'center',
        marginTop: '15%',
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    fixToText: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    text6: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '300'
    },
    boxImage5: {
        width: 30,
        height: 25,
    },
    Group3:{
        flexDirection:'row',
        alignItems:'center'
    },
    textPice:{
        color:'#fff',
        fontSize:17,
        fontWeight:'400',
        marginLeft: 5
    }
})