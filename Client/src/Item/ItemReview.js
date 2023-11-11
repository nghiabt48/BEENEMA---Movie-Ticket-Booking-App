import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemReview = (props) => {
    const { item, _id } = props;
    const ImageURL = `http://149.28.159.68:3000/img/users/${item.user.avatar}`
    return (
        <View key={_id} style={styles.container}>
            <Image source={{ uri: ImageURL }} style={styles.Image} />
            <View style={styles.Group}>
                <Text style={styles.Text1}>{item.user.username}</Text>
                <Text style={styles.Text2}>{item.review}</Text>
                <Text style={styles.rating}>Rating: {item.rating}⭐</Text>
            </View>

        </View>
    )
}

export default ItemReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        marginStart: 10,
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
    Group: {
        marginLeft: 10
    },
    rating: {
        fontSize: 12,
        color: 'gray',
        fontWeight: 'bold',
    
      },
})