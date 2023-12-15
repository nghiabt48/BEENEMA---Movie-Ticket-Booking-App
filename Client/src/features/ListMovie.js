import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ItemMovie from "../Item/ItemMovie";
import { SafeAreaView } from "react-native-safe-area-context";
import AxiosIntance from "./AxiosIntance";
import ItemTop5 from "../Item/ItemTop5";
import { AppConText } from "./AppConText";
import Swiper from 'react-native-swiper';

const ListMovie = (props) => {
  const { navigation } = props;
  const [data, setdata] = useState([]);
  const [top5, SetTop5] = useState([]);
  const [isLoading, setisLoading] = useState(null);
  const { isLogin } = useContext(AppConText);
  //get all movie
  useEffect(() => {
    const getAllMovie = async () => {
      setisLoading(true);
      const response = await AxiosIntance().get("/movies");
      // console.log(response.data.data[0].status)
      if (response.data.data[0].status) {
        setdata(response.data.data);
        // console.log(response.data.data)
        setisLoading(false);
      } else {
        setisLoading(false);
        setdata(null);
      }
    };
    getAllMovie();
    top5Movie();
    return () => {};
  }, []);

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
    const respone = await AxiosIntance().get(
      "/movies/search?title=" + searchText
    );
    if (respone.status == "success") {
      setdata(respone.movie);
      setisLoading(false);
    } else {
    }
  };

  const top5Movie = async () => {
    setisLoading(true);
    const response = await AxiosIntance().get("/movies/top-5");
    if (response.status === "success") {
      SetTop5(response.data.data);
      setisLoading(false);
    } else {
      setisLoading(false);
      setdata(null);
    }
  };

  const SearchClik = function () {
    navigation.navigate("Search");
  };
  const login = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={SearchClik}>
          <View style={styles.Search}>
            <Image source={require("../image/Layer3.png")} />
            <TextInput
              placeholder="Tìm kiếm..."
              placeholderTextColor={"#ffff"}
              onChangeText={(text) => down(text)}
              style={styles.TextInputSearch}
              editable={false}
            ></TextInput>
            {!isLogin && (
              <View>
                <TouchableOpacity onPress={login}>
                  <Text>Login</Text>
                  <Image
                    style={{marginBottom:15, marginStart: 10}}
                    source={require("../image/user1.png")}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* <Text style={styles.textTop}>Top 5 bộ phim có Rating cao nhất:</Text> */}
        <View style={{height:280}}>
          {isLoading === true ? (
            <ActivityIndicator size="large" />
          ) : (
            // <FlatList
            //   data={top5}
            //   horizontal={true}
            //   renderItem={({ item }) => (
            //     <ItemTop5 data={item} navigation={navigation} />
            //   )}
            //   keyExtractor={(item) => item._id}
            // />
            <Swiper autoplay={true} dotColor="#fff" activeDotColor="#F74346">
                {top5.map((item, _id) => (
                    <ItemTop5 key={_id} data={item} navigation={navigation}/>
                ))}
            </Swiper>
          )}
        </View>

        <View>
          <Text style={styles.textTop}>Danh sách phim:</Text>
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
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListMovie;

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
  containertop5: {
    marginTop: 5,
    marginStart: 10,
    fontSize: 14,
    fontWeight: "700",
  },
  textTop: {
    color: "white",
    marginTop: 5,
    marginStart: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
