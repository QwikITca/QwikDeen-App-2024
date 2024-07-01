import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import muhammad from "../../History/muhammad.json";
import sahaba from "../../History/sahaba.json";

const HistoryDetails = ({ route }) => {
  const { id } = route.params || {};
  console.log("Received id in HistoryDetails:", id);

  let data;
  if (id === "Prophet Muhammad(PBUH)") {
    data = muhammad;
  } else if (id === "Shahaba Abu Hurayrah") {
    data = sahaba;
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Data not found</Text>
      </View>
    );
  }

  const renderContent = () => {
    if (id === "Prophet Muhammad(PBUH)") {
      return data.sections.map((section, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.subtitle}>{section.heading}</Text>
          <Text style={styles.content}>{section.content}</Text>
        </View>
      ));
    } else if (id === "Shahaba Abu Hurayrah") {
      return (
        <View>
          <Text style={styles.personTitle}>{data.person}</Text>
          {data.biography.map((section, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.subtitle}>{section.section}</Text>
              <Text style={styles.content}>{section.content}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{data.title}</Text>
      </View>
      {renderContent()}
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
    margin:20,
  },
  personTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b5e20",
    textAlign: "center",
    marginBottom: 16,
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#424242",
  },
});

export default HistoryDetails;
