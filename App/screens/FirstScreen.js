import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FirstScreen = ({ navigation }) => {
  const handleBeginPress = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/adaptive-icon-png.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Qwik deen</Text>
      <Text style={styles.subtitle}>
        The Hadith of the Prophet Muhammad (صلى الله عليه وسلم) at your
        fingertips
      </Text>
      <Text style={styles.termsText}>
        By Continuing, you agree to the Terms & Conditions
      </Text>
      <Pressable style={styles.button} onPress={handleBeginPress}>
        <Text style={styles.buttonText}>Begin</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6D6E71",
  },
  subtitle: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 20,
    color: "#36A04E",
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    color: "#A9A9A9",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
  },
});

export default FirstScreen;
