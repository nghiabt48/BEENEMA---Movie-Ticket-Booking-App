import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemMovie from '../Item/ItemMovie';
import AxiosIntance from './AxiosIntance';

const Search = (props) => {
    const { navigation } = props;
    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(null);

    // set time out
  let timeOut = null;
  const down = (searchText) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      search(searchText);
    }, 1000);
  };
  //get movie by title
  const search = async (searchText) => {
    setisLoading(true);
    const respone = await AxiosIntance().get("/movies/search?title=" + searchText);
    if (respone.status == "success") {
      setdata(respone.movie);
      setisLoading(false);
      if(searchText==''){
        setdata(null);
      setisLoading(false);
      }
    } else {
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Search}>
        <Image source={require("../image/Layer3.png")} />
        <TextInput
          placeholder="Tìm kiếm..."
          placeholderTextColor={"#ffff"}
          onChangeText={(text) => down(text)}
          style={styles.TextInputSearch}
        ></TextInput>
      </View>
      {isLoading == true ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <ItemMovie data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#130B2B",
        padding: 13,
      },
      TextInputSearch: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#FA6900",
        padding: 8,
        borderRadius: 20,
        color: "#ffff",
      },
      Search: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      },
})