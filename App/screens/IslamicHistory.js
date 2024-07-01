import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import muhammad from "../../History/muhammad.json";
import sahaba from "../../History/sahaba.json";
import Navbar from "./Navbar";

const IslamicHistory = () => {
  const navigation = useNavigation();

  const historyItems = [
    {
      id: "Prophet Muhammad(PBUH)",
      title: muhammad.title,
      image: require("../assets/prayer2.png"),
    },
    {
      id: "Shahaba Abu Hurayrah",
      title: sahaba.name,
      image: require("../assets/GhareHira.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <ImageBackground source={item.image} style={styles.imageBackground}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>Description preview...</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            console.log("Navigating to HistoryDetails with id:", item.id);
            navigation.navigate("HistoryDetails", { id: item.id });
          }}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Islamic History</Text>
      <FlatList
        data={historyItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
      <Navbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 30,
    backgroundColor: "#4CAF50",
    color: "white",
    marginBottom:0,
    marginTop:0,
  },
  listContainer: {
    padding: 8,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
    margin: 8,
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  
  detailsButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default IslamicHistory;
