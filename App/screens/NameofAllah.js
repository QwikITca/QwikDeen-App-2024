import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import asmaAlHusna from "../../asmaAlHusna.json";
import Navbar from "./Navbar";
import MenuModal from "./MenuModal";

const NameofAllah = () => {
  const renderNameItem = ({ item }) => (
    <View style={styles.nameItem}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{item.number}</Text>
      </View>
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
        contentContainerStyle={styles.listContentContainer}
      />

      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F8A4D",
    padding: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "white",
    marginBottom: 10,
    marginTop: 10, // Adjust this value as needed
    alignSelf: "center",
  },
  row: {
    justifyContent: "space-between",
  },
  nameItem: {
    backgroundColor: "#FCF3DD",
    borderRadius: 8,
    padding: 11,
    marginBottom: 12,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  numberBox: {
    backgroundColor: "#FCF3DD",
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -10,
    left: -2,
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  nameContent: {
    alignItems: "center",
  },
  arabicName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  transliteration: {
    fontSize: 14,
    marginBottom: 4,
    color: "#0E1B51",
    fontWeight: "condensedBold",
  },
  meaning: {
    fontSize: 14,
    textAlign: "center",
    color: "#6E7697",
  },
  listContentContainer: {
    paddingBottom: 60, // Add padding at the bottom to prevent the last item from being hidden
    paddingTop: 20, // Add padding at the top to prevent the first items from being hidden
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
