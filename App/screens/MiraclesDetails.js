import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const MiracleDetails = ({ route }) => {
  const { content } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Miracle of Quran</Text>
      </View>
      {Object.keys(content).map((key, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.sectionTitle}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Text style={styles.sectionContent}>{content[key]}</Text>
          {index === Math.floor(Object.keys(content).length / 2) && (
            <Image
              source={require("../assets/Coin.png")}
              style={styles.image}
            />
          )}
          <Text>Paper money was first used in China in the 11th century.</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e8f5e9",
    padding: 18,
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b5e20",
    textAlign: "center",
    margin: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: "#424242",
  },
  image: {
    width: "100%",
    height: 150,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default MiracleDetails;
