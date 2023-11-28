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

  
  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    handleCloseModal();
    // Gọi hàm để lấy danh sách phim theo thể loại từ API khi thể loại được chọn
    getMoviesByGenre(genre);
  };

  const getMoviesByGenre = async (selectedGenre) => {
     try {
      setisLoading2(true);
      const respone = await AxiosIntance().get(`/movies?category=${selectedGenre}`)
      if(respone.status === "success"){
        setMovies(respone.data.data);
        setisLoading2(false);
      }
     } catch (error) {
      console.log(error)
      setisLoading2(false);
     }
  };
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
      if (searchText == "") {
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
        <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={{color:"white", marginStart:10}}>{selectedGenre || 'Select a genre'}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={genres}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.genreItem}
                  onPress={() => handleSelectGenre(item)}
                >
                  <Text style={{ color: '#F74346', fontSize:14,fontWeight:"600", padding:10}}>{item}</Text>
                  <Image source={require("../image/line.png")} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
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
});
