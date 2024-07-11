import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";

const BookMark = () => {
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState([]);
  const [bookmarkedHadith, setBookmarkedHadith] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();

useEffect(() => {
  const fetchBookmarks = async () => {
    try {
      const savedSurahs = await AsyncStorage.getItem("bookmarkedSurahs");
      const savedHadith = await AsyncStorage.getItem("bookmark");

      if (savedSurahs) {
        setBookmarkedSurahs(JSON.parse(savedSurahs));
      }

      if (savedHadith) {
        setBookmarkedHadith(JSON.parse(savedHadith));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  fetchBookmarks();
}, []);

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookmarkItem}
      onPress={() => navigation.navigate("SurahDetailScreen", { surah: item })}
    >
      <Text style={styles.bookmarkText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderHadithItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookmarkItem}
      onPress={() =>
        navigation.navigate("Chapter_Details", {
          page: item.id,
          name: item.HadisBookName,
          book: item.BookName,
          fromBookmark: true,
        })
      }
    >
      <Text style={styles.bookmarkText}>{item.Narrated}</Text>
      <Text style={styles.bookmarkSubText}>{item.BookName}</Text>
    </TouchableOpacity>
  );

  const renderItems = () => {
    if (selectedCategory === "Sura" || selectedCategory === "All") {
      return (
        <FlatList
          data={bookmarkedSurahs}
          renderItem={renderSurahItem}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Surah bookmarks available.</Text>
          }
        />
      );
    }

    if (selectedCategory === "Hadith" || selectedCategory === "All") {
      return (
        <FlatList
          data={bookmarkedHadith}
          renderItem={renderHadithItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Hadith bookmarks available.</Text>
          }
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryBar}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "All" && styles.selectedCategoryButton,
          ]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text style={styles.categoryButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Sura" && styles.selectedCategoryButton,
          ]}
          onPress={() => setSelectedCategory("Sura")}
        >
          <Text style={styles.categoryButtonText}>Sura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Hadith" && styles.selectedCategoryButton,
          ]}
          onPress={() => setSelectedCategory("Hadith")}
        >
          <Text style={styles.categoryButtonText}>Hadith</Text>
        </TouchableOpacity>
      </View>
      {renderItems()}
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
  },
  categoryBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#FFD700",
  },
  categoryButtonText: {
    color: "#117E2A",
    fontWeight: "bold",
  },
  bookmarkItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#FAE8BB",
    paddingTop: 20,
    paddingBottom: 30,
  },
  bookmarkText: {
    fontSize: 16,
    color: "#117E2A",
    fontWeight: "bold",
  },
  bookmarkSubText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    paddingBottom: 29,
    paddingTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#FFF",
    fontSize: 16,
    paddingTop: 20,
  },
  listContentContainer: {
    paddingBottom: 60, // Add padding at the bottom to prevent the last item from being hidden
    paddingTop: 20, // Add padding at the top to prevent the first items from being hidden
  },
});

export default BookMark;
