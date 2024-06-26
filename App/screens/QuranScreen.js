import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import quranlist from "../../Quran/quranlist.json"; // Replace with your Quran data
import Navbar from "./Navbar"; // Adjust the path as needed

const QuranScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuranList, setFilteredQuranList] = useState(quranlist);

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
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Find Surah"
          value={searchQuery}
          onChangeText={onChangeSearch}
          style={styles.input}
        />
        <Button mode="contained" onPress={onSearch} style={styles.button}>
          Search
        </Button>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
    padding: 14,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 9,
    alignItems: "center",
    marginTop: 24,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 4,
  },
  button: {
    height: 40,
    justifyContent: "center",
  },
  surahContainer: {
    position: "relative",
    width: "48%",
    height: "50%",
    marginBottom: 29,
    marginTop: 9,
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
