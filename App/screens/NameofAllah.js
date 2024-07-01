import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import asmaAlHusna from "../../asmaAlHusna.json";
import Navbar from "./Navbar";
import MenuModal from "./MenuModal";

const NameofAllah = () => {
  const renderNameItem = ({ item }) => (
    <View style={styles.nameItem}>
      <Text style={styles.number}>{item.number}</Text>
      <View style={styles.nameContent}>
        <Text style={styles.arabicName}>{item.name}</Text>
        <Text style={styles.transliteration}>{item.transliteration}</Text>
        <Text style={styles.meaning}>{item.en.meaning}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>99 Names of Allah</Text>

      <FlatList
        data={asmaAlHusna.data}
        renderItem={renderNameItem}
        keyExtractor={(item) => item.number.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <Navbar />
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F8A4D",
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "white",
    marginBottom: 16,
    marginTop: 16, // Adjust this value as needed
    alignSelf: "center",
  },
  row: {
    justifyContent: "space-between",
  },
  nameItem: {
    backgroundColor: "#FCF3DD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 13,
    width: "48%",
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
  },
  nameContent: {
    alignItems: "center",
  },
  arabicName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  transliteration: {
    fontSize: 13,
    marginBottom: 4,
  },
  meaning: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NameofAllah;
