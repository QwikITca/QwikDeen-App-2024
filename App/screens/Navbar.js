import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("QuranScreen")}>
        <Icon name="book" size={24} color="green" />
        <Text>Quran</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Icon name="home" size={25} color="green" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
        <Icon name="newspaper" size={24} color="green" />
        <Text>Hadith</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: screenHeight * 0.0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },

  navIcon: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.1,
    resizeMode: "contain",
  },
});

export default Navbar;
