import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io } from 'socket.io-client';
import { AppConText } from './AppConText';
const host = "http://10.10.10.226:3000";
const seats = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
    'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8',
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8',
    'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8',
    'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8',
    'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8',
    'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8',
];
const specialSeats = ['D4', 'A5', 'C1'];
const SeatCinemaSocket = (props) => {
    const { route } = props
    const { navigation } = props;
    const { params } = route
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef();
    const [id, setId] = useState();
    const { infoUser } = useContext(AppConText)
    const showtimeId = params._id

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [mySeats, setMySeats] = useState();
    useEffect(() => {
        
        socketRef.current = io.connect(host)
        
        socketRef.current.on('seat_changed', dataGot => {
           setSelectedSeats(dataGot.map(item => item.seat_number))
        }) // 
        
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    const handleSeatPress = (seatNumber) => {
        const seat_obj = {
            showtime: showtimeId, // showtime id
            seat_number: seatNumber,
            user: infoUser._id,
            // status: 'selected' // available || selected
        };
        socketRef.current.emit('showtime:modify', seat_obj);
    };
    const renderSeats = () => {
        const seatLayout = [];

        for (let column = 1; column <= 6; column++) {
            const rowSeats = [];
            for (let seat = 1; seat <= 8; seat++) {
                const seatIndex = (column - 1) * 8 + seat - 1;
                const seatNumber = seats[seatIndex];
                const isSelected = selectedSeats ? selectedSeats.includes(seatNumber) : false;
                const isSpecialSeat = specialSeats.includes(seatNumber);

                rowSeats.push(
                    <TouchableOpacity
                        key={seatNumber}
                        onPress={() => handleSeatPress(seatNumber)}
                    >
                        {
                            isSpecialSeat ? <Image style={styles.seat} source={require('../image/seat2.png')}></Image> : isSelected ? <Image style={styles.seat} source={require('../image/seat3.png')}></Image> : <Image style={styles.seat} source={require('../image/seat1.png')}></Image>
                        }
                    </TouchableOpacity>
                );
            }

            seatLayout.push(
                <View key={column} style={styles.row}>
                    {rowSeats}
                </View>
            );
        }
        return seatLayout;
    };
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container2}>
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
                <View style={styles.viewGroup5}>
                    <View style={styles.Group5}>
                        <View style={styles.viewwhite}></View>
                        <Text style={styles.textAvailable}>Available</Text>
                    </View>
                    <View style={styles.Group5}>
                        <View style={styles.viewred}></View>
                        <Text style={styles.textAvailable}>Resered</Text>
                    </View>
                    <View style={styles.Group5}>
                        <View style={styles.viewgreen}></View>
                        <Text style={styles.textAvailable}>Selected</Text>
                    </View>
                </View>
                {/* btn booking */}
                <Text style={styles.selectedSeatsText}>
                    Selected Seats: 1
                </Text>
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default SeatCinemaSocket

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#130B2B',

    },
    container2: {
        padding: 15,

    },
    row: {
        flexDirection: 'row'
    },
    seat: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,

    },
    selectedSeatsText: {
        marginTop: 20,
        fontSize: 16,
        color: '#fff'
    },
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
    viewGroup5: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
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
        marginTop: '10%',
        paddingBottom: '10%'
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
    Group3: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textPice: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '400',
        marginLeft: 5
    },
    textAvailable: {
        color: 'white',
        fontSize: 12,
        fontWeight: '300',
        marginLeft: '7%'
    },
    Group5: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewwhite: {
        backgroundColor: 'white',
        width: 12,
        height: 12,
        borderRadius: 100,
    },
    viewred: {
        backgroundColor: '#DA004E',
        width: 12,
        height: 12,
        borderRadius: 100,
    },
    viewgreen: {
        backgroundColor: '#6AFF70',
        width: 12,
        height: 12,
        borderRadius: 100,
    }
})