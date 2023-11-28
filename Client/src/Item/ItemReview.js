import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
const ItemReview = (props) => {
    const { item, _id } = props;
    const ImageURL = `http://149.28.159.68:3000/img/users/${item.user.avatar}`
    return (
        <View key={_id} style={styles.container}>
            <Image source={{ uri: ImageURL }} style={styles.Image} />
            <View style={styles.Group}>
                <Text style={styles.Text1}>{item.user.username}</Text>
                
                <View style={styles.stars}>
                    {
                        item.rating >= 1 ? <MaterialIcons
                            name={'star'}
                            size={16}
                            style={styles.starSelected} />
                            : <MaterialIcons
                                name={'star-border'}
                                size={16}
                                style={styles.starUnselected} />
                    }
                    {
                        item.rating >= 2 ? <MaterialIcons
                            name={'star'}
                            size={16}
                            style={styles.starSelected} />
                            : <MaterialIcons
                                name={'star-border'}
                                size={16}
                                style={styles.starUnselected} />
                    }
                    {
                        item.rating >= 3 ? <MaterialIcons
                            name={'star'}
                            size={16}
                            style={styles.starSelected} />
                            : <MaterialIcons
                                name={'star-border'}
                                size={16}
                                style={styles.starUnselected} />
                    }
                    {
                        item.rating >= 4 ? <MaterialIcons
                            name={'star'}
                            size={16}
                            style={styles.starSelected} />
                            : <MaterialIcons
                                name={'star-border'}
                                size={16}
                                style={styles.starUnselected} />
                    }
                    {
                        item.rating >= 5 ? <MaterialIcons
                            name={'star'}
                            size={16}
                            style={styles.starSelected} />
                            : <MaterialIcons
                                name={'star-border'}
                                size={16}
                                style={styles.starUnselected} />
                    }
                </View>
                <Text style={styles.Text2}>{item.review}</Text>
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
        fontSize: 14,
        fontWeight: '600',
        color: '#ffff',
    },
    Text2: {
        
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
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
    starSelected: {
        color: '#FFD700'
    },
        starUnselected: {
        color: '#fff'
    },
})