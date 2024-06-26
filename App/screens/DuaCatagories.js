import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DuaCatagories = () => {
  const navigation = useNavigation();

  // Define categories with local images
  const categories = [
    {
      name: "Dhikr After Salah",
      image: require("../assets/submission.png"),
    },
    {
      name: "Daily Dua",
      image: require("../assets/salah.png"),
    },
    {
      name: "Morning Dhikr",
      image: require("../assets/sun.png"),
    },
    {
      name: "Evening Dhikr",
      image: require("../assets/moon.png"),
    },
    // Add more categories as neededgi
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("DuaList", { category: item.name })}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dua And Zikr</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.name}
        numColumns={1} // Set to 1 to arrange items vertically
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
    padding:40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 8, 
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 1,
    marginBottom: 50,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DuaCatagories;
