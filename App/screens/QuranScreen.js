import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,Platform,Dimensions,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import quranlist from "../../Quran/quranlist.json"; // Replace with your Quran data
import Navbar from "./Navbar"; // Adjust the path as needed
import MenuModal from "./MenuModal";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const QuranScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuranList, setFilteredQuranList] = useState(quranlist);
  const [menuVisible, setMenuVisible] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredQuranList(quranlist);
    }
  };

  const onSearch = () => {
    const filteredList = quranlist.filter((surah) => {
      const name = surah.name ? surah.name.toLowerCase() : "";
      const englishName = surah.englishName
        ? surah.englishName.toLowerCase()
        : "";
      const meaning = surah.meaning ? surah.meaning.toLowerCase() : "";

      return (
        name.includes(searchQuery.toLowerCase()) ||
        englishName.includes(searchQuery.toLowerCase()) ||
        meaning.includes(searchQuery.toLowerCase())
      );
    });

    setFilteredQuranList(filteredList);
  };

  const handleSurahSelect = (surah) => {
    navigation.navigate("SurahDetailScreen", { surah });
  };

  const renderSurahItem = ({ item }) => (
    <View style={styles.surahContainer}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{item.number}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleSurahSelect(item)}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <View style={styles.surahDetails}>
            <Text style={styles.surahName}>{item.name}</Text>
            <Text style={styles.englishName}>{item.englishName}</Text>
            <Text style={styles.meaning}>{item.meaning}</Text>
          </View>
          <Icon name="heart-outline" size={24} color="#999" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="menu"
          size={screenWidth * 0.06}
          color="white"
          style={styles.menuIcon}
          onPress={() => setMenuVisible(true)}
        />
        <Text style={styles.title}>Quran</Text>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Describe what you need"
            value={searchQuery}
            onChangeText={onChangeSearch}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Button
            mode="contained"
            onPress={onSearch}
            style={styles.searchButton}
          >
            Search
          </Button>
        </View>
      </View>

      <FlatList
        data={filteredQuranList}
        renderItem={renderSurahItem}
        keyExtractor={(item) => item.number.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
      <Navbar />
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
    padding: 14,
    paddingBottom: 2,
  },
  header: {
    backgroundColor: "#117E2A",
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 7,
    overflow: "hidden",
    width: "100%",
    marginTop: 10,
  },
  menuIcon: {
    position: "relative",
    top: Platform.OS === "ios" ? screenHeight * 0.05 : screenHeight * 0.01,
    left: screenWidth * 0.01,
    alignSelf: "flex-start",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
  },
  searchButton: {
    height: 40,
    justifyContent: "center",
    backgroundColor: "#FFC107",
  },
  surahContainer: {
    position: "relative",
    width: "48%",
    height: "50%",
    marginBottom: 23,
    marginTop: 6,
    paddingBottom: 2,
    paddingTop: 7,
  },
  numberBox: {
    position: "absolute",
    top: -9,
    left: -10,
    backgroundColor: "#FAE8BB",
    borderRadius: 8,
    padding: 8,
    zIndex: 1,
  },
  card: {
    backgroundColor: "#FCF3DD",
    borderRadius: 8,
    padding: 18,
    
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  number: {
    fontSize: 8,
    fontWeight: "bold",
  },
  surahDetails: {
    flex: 1,
  },
  surahName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  englishName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#888",
  },
  meaning: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },
  row: {
    justifyContent: "space-between",
  },
});

export default QuranScreen;
