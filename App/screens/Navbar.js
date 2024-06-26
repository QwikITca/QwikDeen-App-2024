import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Navbar = () => {
  return (
    <View style={styles.bottomNav}>
      <Image
        source={require("../assets/Favourite.png")}
        style={styles.navIcon}
      />
      <Image source={require("../assets/Quran.png")} style={styles.navIcon} />
      <Image source={require("../assets/Home.png")} style={styles.navIcon} />
      <Image
        source={require("../assets/Hadith.png")} // Replace with your own icon
        style={styles.navIcon}
      />
      <Image
        source={require("../assets/Settings.png")} // Replace with your own icon
        style={styles.navIcon}
      />
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
    width: screenWidth * 0.7,
    height: screenWidth * 0.1,
    resizeMode: "contain",
  },
});

export default Navbar;
