import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import paper from "../../Miracles/paper.json";

const MiraclesQuran = () => {
  const navigation = useNavigation();
  const miracles = [
    {
      id: "PaperMoney",
      title: paper.title,
      image: require("../assets/Papermoney.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <ImageBackground source={item.image} style={styles.imageBackground}>
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            navigation.navigate("MiracleDetails", { content: paper.content });
          }}
        >
          <Text style={styles.detailsButtonText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Miracles of Quran</Text>
      <FlatList
        data={miracles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    paddingTop: 40, // Add padding here
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  imageBackground: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  detailsButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MiraclesQuran;
