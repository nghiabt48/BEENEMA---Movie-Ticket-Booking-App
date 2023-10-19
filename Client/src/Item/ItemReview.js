import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemReview = () => {
    return (
        <View style={styles.container}>

            <Image source={require('../image/Code.png')} style={styles.Image} />
            <View style={styles.Group}>
                <Text style={styles.Text1}>dfgdg</Text>
                <Text style={styles.Text2}>dfgdg</Text>
            </View>

        </View>
    )
}

export default ItemReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 10,
        flexDirection: 'row',
        paddingBottom:10,
        paddingEnd:10,
        paddingStart:10,
    },
    Text1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffff',
    },
    Text2: {
        fontSize: 15,
        color: '#ffff',
    },
    Image: {
        borderRadius: 100,
        height: 50,
        width: 50,
    },
    Group:{
        marginLeft:10
    }
})