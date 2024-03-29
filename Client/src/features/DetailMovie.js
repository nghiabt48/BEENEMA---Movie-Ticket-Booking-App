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
import { SafeAreaView } from "react-native-safe-area-context";
import ItemReview from "../Item/ItemReview";
import { LinearGradient } from "expo-linear-gradient";
import ItemActor from "../Item/ItemActor";
import AxiosIntance from "./AxiosIntance";
import { MaterialIcons } from "@expo/vector-icons";
import { AppConText } from "./AppConText";

const DetailMovie = (props) => {
  const { route } = props;
  const { navigation } = props;
  const { params } = route;
  const [reviews, setreviews] = useState([]);
  const [myreviews, setmyreviews] = useState([]);
  const [isLoading, setisLoading] = useState(null);
  const [isLoading2, setisLoading2] = useState(null);
  const [review, setreview] = useState("");
  const [rating, setrating] = useState("");
  const category = params.data.category;
  const categoryStrring = category.join(', ')
  const [showFullText, setShowFullText] = useState(false);
  const { infoUser, setinfoUser, movieId, setmovieId, isLogin } =
    useContext(AppConText);
  const data = params.data.actor;
  const [numberOfLines, setNumberOfLines] = useState(3);

  var ngayThang = new Date(myreviews.created_At);

  // Lấy thông tin ngày, tháng, năm
  var ngay = ngayThang.getUTCDate();
  var thang = ngayThang.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
  var nam = ngayThang.getUTCFullYear();

  // Định dạng lại thành chuỗi "dd/mm/yyyy"
  var chuoiNgayThang = ngay + '/' + thang + '/' + nam;

  const handleTextLayout = (event) => {
    const { lines } = event.nativeEvent;
    // Check if the number of lines exceeds the limit
    if (lines.length > 3) {
      setNumberOfLines(lines.length);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchmyReviews();
    }
    fetchReviews();
    return () => { };
  }, []);
  const fetchmyReviews = async () => {
    try {
      setisLoading2(true);
      const response = await AxiosIntance().get(
        `movies/${params.data._id}/reviews?user=${infoUser._id}`
      );
      if (response.data.length > 0) {
        setmyreviews(response.data[0]);
        setisLoading2(false);
      } else {
        setisLoading2(false);
      }
    } catch (error) {
      ToastAndroid.show("Something went wrong" + error, ToastAndroid.SHORT);
    }
  };
  const fetchReviews = async () => {
    try {
      setisLoading(true);
      const response = await AxiosIntance().get(
        `movies/${params.data._id}/reviews`
      );
      if (response.status == "success") {
        const reversedReview = response.data.reverse();
        setreviews(reversedReview);
        setisLoading(false);
      } else {
        setisLoading(false);
        setreview(null);
      }
    } catch (error) {
      ToastAndroid.show("Something went wrong" + error, ToastAndroid.SHORT);
      setisLoading(false);
      setreview(null);
    }
  };
  const Post = async () => {
    if (!isLogin) {
      ToastAndroid.show("Vui lòng đăng nhập để tiếp tục!", ToastAndroid.SHORT);
      navigation.navigate("Login");
      return;
    }
    try {
      setisLoading(true);
      const response = await AxiosIntance().post(
        `movies/${params.data._id}/reviews`,
        { review: review, rating: rating }
      );
      if (response.status == "success") {
        ToastAndroid.show("Đánh giá thành công", ToastAndroid.SHORT);
        fetchReviews();
        fetchmyReviews();
        setisLoading(false);
      }
    } catch (error) {
      ToastAndroid.show("Chỉ đánh giá được một lần", ToastAndroid.SHORT);
      setisLoading(false);
    }
  };
  const Back = () => {
    navigation.navigate("ListMovie");
  };
  const TrailerClick = () => {
    navigation.navigate("Trailer", {
      trailer: params.data.trailer,
      title: params.data.title,
    });
  };

  const showTimeClick = (async) => {
    navigation.navigate("ShowTime", { _id: params.data.id });
  };
  const showCinema = (async) => {
    if (!isLogin) {
      ToastAndroid.show("Vui lòng đăng nhập để tiếp tục!", ToastAndroid.SHORT);
      navigation.navigate("Login");
      return;
    }
    navigation.navigate("ChooseCinema", {
      _id: params.data.id,
      title: params.data.title,
    });
    setmovieId({ _id: params.data.id });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: params.ImageURL }} style={styles.boxImage2} />
        {/* btn Back */}
        <TouchableOpacity style={styles.Group1} onPress={Back}>
          <Image
            source={require("../image/Back.png")}
            style={styles.boxImage1}
          />
        </TouchableOpacity>
        {/* btn trailer */}
        <View style={styles.Group2}>
          <TouchableOpacity style={styles.buttonTrailer} onPress={TrailerClick}>
            <View style={styles.fixToText}>
              <Image
                source={require("../image/Play.png")}
                style={styles.boxImage3}
              />
              <Text style={styles.text4}>Trailer</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.Group3}>
          <Text style={styles.text2}>{params.data.title}</Text>
          <Text style={styles.text3}>{categoryStrring}</Text>
        </View>
        {/* get actor */}
        <FlatList
          data={data}
          horizontal={true}
          style={styles.FlatList}
          renderItem={({ item }) => <ItemActor data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.Group8}>
          <Text
            style={styles.text5}
            numberOfLines={showFullText ? undefined : 3}
            onTextLayout={handleTextLayout}
          >
            {params.data.description}
          </Text>
          {numberOfLines > 3 &&
            (!showFullText ? (
              <TouchableOpacity onPress={() => setShowFullText(true)}>
                <Text style={styles.text8}>Xem thêm</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowFullText(false)}>
                <Text style={styles.text8}>Thu gọn</Text>
              </TouchableOpacity>
            ))}
        </View>
        {/* btn BooKing */}
        <View style={styles.Group4}>
          <TouchableOpacity style={styles.buttonBooking} onPress={showCinema}>
            <LinearGradient
              colors={["#F34C30", "#DA004E"]}
              style={styles.gradient}
              end={{ x: 0.01, y: 1 }}
            >
              <View style={styles.fixToText2}>
                <Text style={styles.text6}>Đặt vé</Text>
                <Image
                  source={require("../image/arrowleft.png")}
                  style={styles.boxImage5}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {isLoading2 == true ? null : isLogin && !myreviews.review ? (
          <View>
            <View style={styles.container1}>
              <Text style={styles.heading}>Xếp hạng cho bộ phim này</Text>
              <View style={styles.stars}>
                <TouchableOpacity onPress={() => setrating(1)}>
                  <MaterialIcons
                    name={rating >= 1 ? "star" : "star-border"}
                    size={32}
                    style={
                      rating >= 1 ? styles.starSelected : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setrating(2)}>
                  <MaterialIcons
                    name={rating >= 2 ? "star" : "star-border"}
                    size={32}
                    style={
                      rating >= 2 ? styles.starSelected : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setrating(3)}>
                  <MaterialIcons
                    name={rating >= 3 ? "star" : "star-border"}
                    size={32}
                    style={
                      rating >= 3 ? styles.starSelected : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setrating(4)}>
                  <MaterialIcons
                    name={rating >= 4 ? "star" : "star-border"}
                    size={32}
                    style={
                      rating >= 4 ? styles.starSelected : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setrating(5)}>
                  <MaterialIcons
                    name={rating >= 5 ? "star" : "star-border"}
                    size={32}
                    style={
                      rating >= 5 ? styles.starSelected : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* edt review */}
            <View style={styles.Group5}>
              <TextInput
                placeholder="Mô tả trải nghiệm của bạn..."
                placeholderTextColor={"#ffff"}
                style={styles.TextInputReview}
                onChangeText={setreview}
              ></TextInput>
              {/* btn Post */}
              {rating >= 1 && review != "" ? (
                <TouchableOpacity onPress={Post}>
                  <Image
                    source={require("../image/plane48.png")}
                    style={styles.boxImage6}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.headingmy}>Đánh giá của tôi</Text>
            <View style={styles.container2}>
              {myreviews.user ? (
                <Image
                  style={styles.Image}
                  source={{
                    uri: `http://149.28.159.68:3000/img/users/${myreviews.user.avatar}`,
                  }}
                ></Image>
              ) : null}
              <View style={styles.Group9}>
                {myreviews.user ? (
                  <Text style={styles.textUser}>{myreviews.user.username}</Text>
                ) : null}
                <View style={{flexDirection:'row'}}>
                  <View style={styles.stars}>
                    {myreviews.rating >= 1 ? (
                      <MaterialIcons
                        name={"star"}
                        size={16}
                        style={styles.starSelected}
                      />
                    ) : (
                      <MaterialIcons
                        name={"star-border"}
                        size={16}
                        style={styles.starUnselected}
                      />
                    )}
                    {myreviews.rating >= 2 ? (
                      <MaterialIcons
                        name={"star"}
                        size={16}
                        style={styles.starSelected}
                      />
                    ) : (
                      <MaterialIcons
                        name={"star-border"}
                        size={16}
                        style={styles.starUnselected}
                      />
                    )}
                    {myreviews.rating >= 3 ? (
                      <MaterialIcons
                        name={"star"}
                        size={16}
                        style={styles.starSelected}
                      />
                    ) : (
                      <MaterialIcons
                        name={"star-border"}
                        size={16}
                        style={styles.starUnselected}
                      />
                    )}
                    {myreviews.rating >= 4 ? (
                      <MaterialIcons
                        name={"star"}
                        size={16}
                        style={styles.starSelected}
                      />
                    ) : (
                      <MaterialIcons
                        name={"star-border"}
                        size={16}
                        style={styles.starUnselected}
                      />
                    )}
                    {myreviews.rating >= 5 ? (
                      <MaterialIcons
                        name={"star"}
                        size={16}
                        style={styles.starSelected}
                      />
                    ) : (
                      <MaterialIcons
                        name={"star-border"}
                        size={16}
                        style={styles.starUnselected}
                      />
                    )}
                  </View>
                  <Text style={{ color: '#fff', marginStart: 20 }}>{chuoiNgayThang}</Text>
                </View>

                {myreviews.review ? (
                  <Text style={styles.textReview}>{myreviews.review}</Text>
                ) : null}
              </View>
            </View>
          </View>
        )}

        <Text style={styles.text7}>Đánh giá</Text>
        {/* get all review */}

        {isLoading == true ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          // reviews.map((item, _id) => <ItemReview item={item} key={_id} />)
          <FlatList
            data={reviews}
            renderItem={({ item }) => <ItemReview item={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130B2B",
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 15,
  },
  boxImage1: {
    width: 40,
    height: 40,
    marginStart: 15,
    marginTop: 10,
  },
  boxImage2: {
    width: "100%",
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
  boxImage5: {
    width: 15,
    height: 15,
  },
  boxImage6: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  fixToText: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fixToText2: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Group1: {
    position: "absolute",
  },
  Group2: {
    width: "100%",
    position: "absolute",
    height: 350,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  Group3: {
    width: "100%",
    alignItems: "center",
  },
  Group4: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  Group5: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#DA004E",
    marginTop: 15,
    marginStart: 15,
    marginEnd: 15,
    margin: 15,
  },
  Group6: {
    margin: 10,
    width: "100%",
  },
  Group7: {
    borderTopColor: "#DA004E",
    borderTopWidth: 0.5,
    marginTop: 20,
  },
  Group8: {},
  Group9: {
    marginLeft: 10,
  },
  text1: {
    width: "100%",
    color: "#DA004E",
    fontSize: 23,
    fontWeight: "600",
    marginStart: 10,
  },
  text2: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginStart: 15,
  },
  text3: {
    color: "#F74346",
    fontSize: 16,
    fontWeight: "600",
    marginStart: 15,
  },
  text4: {
    color: "#fff",
    fontSize: 18,
    marginStart: 10,
  },
  text5: {
    color: "#fff",
    fontSize: 15,
    marginStart: 15,
    marginEnd: 15,
  },
  text6: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  text7: {
    color: "#DA004E",
    fontSize: 24,
    alignSelf: "center",
  },
  text8: {
    color: "#DA004E",
    fontSize: 14,
    textDecorationLine: "underline",
    marginStart: 15,
  },
  buttonTrailer: {
    width: 150,
    height: 48,
    backgroundColor: "#F74346",
    borderRadius: 15,
    marginEnd: 30,
    marginBottom: 20,
  },
  buttonBooking: {
    width: 225,
    height: 48,
    backgroundColor: "#F74346",
    borderRadius: 15,
  },
  FlatList: {
    margin: 15,
  },
  TextInputReview: {
    flex: 1,
    padding: 8,
    color: "#ffff",
  },
  button: {
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 50,
  },
  gradient: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  starSelected: {
    color: "#FFD700",
  },
  starUnselected: {
    color: "#fff",
  },
  Image: {
    borderRadius: 100,
    height: 40,
    width: 40,
  },
  container2: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 20,
  },
  textUser: {
    fontSize: 14,
    color: "#ffff",
    fontWeight: "600",
  },
  textReview: {
    color: "#fff",
  },
  headingmy: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
