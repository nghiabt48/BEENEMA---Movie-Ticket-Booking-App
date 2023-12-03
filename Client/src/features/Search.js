import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemMovie from "../Item/ItemMovie";
import AxiosIntance from "./AxiosIntance";

const Search = (props) => {
  const { navigation } = props;
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(null);
  const [isLoading2, setisLoading2] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([
    "action",
    "comedy",
    "science-fiction",
    "drama",
    "fantasy",
    "tragedy",
  ]);
  const [movies, setMovies] = useState([]);
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [reset, setReset] = useState(false);

  //hàm này để reset dữ liệu đã chọn từ modal
  const handleReset = () => {
    // Đặt lại trạng thái reset bằng cách đảo ngược giá trị hiện tại
    setReset((prevReset) => !prevReset);

    // Đặt lại trạng thái của các trường dữ liệu cần reset
    setSelectedGenre(null);
    setMovies([]);
    setIsVisible(false);
    setSearchEnabled(true);
  };

  //mở modal
  const handleOpenModal = () => {
    setIsVisible(true);
  };

  //đóng modal
  const handleCloseModal = () => {
    setIsVisible(false);
  };

  //chọn thể loại từ modal
  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    handleCloseModal();
    // Gọi hàm để lấy danh sách phim theo thể loại từ API khi thể loại được chọn
    getMoviesByGenre(genre);
  };


  //hàm này dùng để lấy thể loại và search 
  const getMoviesByGenreAndTitle = async (selectedGenre, searchText) => {
    try {
      //tạo isloading2 vì để không bị trùng với search
      setisLoading2(true);
      const respone = await AxiosIntance().get(
        `/movies?category=${selectedGenre}&title=${searchText}`
      );
      if (respone.status === "success") {
        setMovies(respone.data);
        setisLoading2(false);

        //nếu search text null thì sẽ return lại thể loại đã chọn để load lại danh sách phim
        if (searchText === "") {
          return getMoviesByGenre(selectedGenre);
        }
      }
    } catch (error) {
      console.log(error);
      setisLoading2(false);
    }
  };

  //hàm này chỉ để lấy thể loại
  const getMoviesByGenre = async (selectedGenre) => {
    try {
      //nếu thể loại đã được chọn thì searchEnabled sẽ == false
      setSearchEnabled(false);
      setisLoading2(true);
      const respone = await AxiosIntance().get(
        `/movies?category=${selectedGenre}`
      );
      if (respone.status === "success") {
        setMovies(respone.data);
        setisLoading2(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading2(false);
    }
  };

  const handleSearch = (searchText) => {
    if (selectedGenre) {
      // Nếu đã chọn thể loại, thực hiện tìm kiếm với cả hai điều kiện
      getMoviesByGenreAndTitle(selectedGenre, searchText);
    } else {
      // Nếu chưa chọn thể loại, chỉ thực hiện tìm kiếm theo tiêu đề
      search(searchText);
    }
  };
  // set time out
  let timeOut = null;
  const down = (searchText) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      handleSearch(searchText);
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
      if (searchText == "") {
        setdata(null);
        setisLoading(false);
      }
    } else {
    }
  };

  //nếu searchEnabled == false thì sẽ trả về null
  const listSearch = function () {
    if (!searchEnabled) {
      return null;
    } else if (isLoading === true) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <ItemMovie data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      );
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
        <View>
          <TouchableOpacity onPress={handleOpenModal}>
            {selectedGenre == null ? (
              <Image
                style={{ marginStart: 10 }}
                source={require("../image/filter.png")}
              />
            ) : (
              <Text
                style={{
                  color: "white",
                  marginStart: 10,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {selectedGenre}
              </Text>
            )}
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={handleCloseModal}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPressOut={handleCloseModal}
            ></TouchableOpacity>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* nút reset */}
                <TouchableOpacity style={styles.reset} onPress={handleReset}>
                  <Image
                    style={{ alignSelf: "center", justifyContent: "center" }}
                    source={require("../image/undo.png")}
                  />
                  <Text
                    style={{
                      color: "#F74346",
                      fontSize: 14,
                      fontWeight: "600",
                      textAlign: "center",
                      alignSelf: "center",
                      marginStart: 5,
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
                {/* List thể loại */}
                <FlatList
                  data={genres}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.genreItem}
                      onPress={() => handleSelectGenre(item)}
                    >
                      <Text
                        style={{
                          color: "#F74346",
                          fontSize: 14,
                          fontWeight: "600",
                          padding: 10,
                        }}
                      >
                        {item}
                      </Text>
                      <Image source={require("../image/line.png")} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>

      {/* danh sach list cua search */}
      {listSearch()}

      {/* The loai */}
      {isLoading2 == true ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={movies}
          numColumns={2}
          renderItem={({ item }) => (
            <ItemMovie data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  option: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  reset: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: 100,
    height: 25,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
