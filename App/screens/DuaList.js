import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import dua from "../../Dua/dua.js"; 
import Navbar from "./Navbar.js";


const DuaList = () => {
  const route = useRoute();
  const { category } = route.params;

  const categoryData = dua.find((item) => item.name === category);

  const renderDua = ({ item }) => (
    <View style={styles.duaItem}>
      <Text style={styles.duaTitle}>{item.title}</Text>
      <Text style={styles.duaArabic}>{item.arabic}</Text>
      <Text style={styles.duaLatin}>{item.latin}</Text>
      <Text style={styles.duaTranslation}>{item.translation}</Text>
      {item.notes && <Text style={styles.duaNotes}>Notes: {item.notes}</Text>}
      {item.fawaid && (
        <Text style={styles.duaFawaid}>Fawaid: {item.fawaid}</Text>
      )}
      {item.source && (
        <Text style={styles.duaSource}>Source: {item.source}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={categoryData.duas}
        renderItem={renderDua}
        keyExtractor={(item) => item.title}
      />
      <Navbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  duaItem: {
    backgroundColor: "#FAE8BB",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  duaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  duaArabic: {
    fontSize: 20,
    textAlign: "right",
    marginBottom: 5,
  },
  duaLatin: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  duaTranslation: {
    marginBottom: 10,
  },
  duaNotes: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  duaFawaid: {
    marginBottom: 5,
  },
  duaSource: {
    fontSize: 12,
    color: "#666",
  },
});

export default DuaList;