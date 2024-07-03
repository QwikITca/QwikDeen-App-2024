// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import "moment-hijri";
import axios from "axios";
import Navbar from "./Navbar";
import MenuModal from "./MenuModal";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [arabicDate, setArabicDate] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // update time every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchArabicDate();
  }, []);

  const fetchArabicDate = async () => {
    try {
      const formattedDate = currentTime.format("MM-DD-YYYY");
      const response = await axios.get(
        `http://api.aladhan.com/v1/gToH/${formattedDate}`
      );
      const hijriDate = response.data.data.hijri;
      const arabicDateStr = `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`;
      setArabicDate(arabicDateStr);
    } catch (error) {
      console.error("Error fetching Arabic date:", error);
    }
  };

  const handleCardPress = (label) => {
    if (label === "Hadith") {
      navigation.navigate("Homepage");
    }
    if (label == "99 names of Allah") {
      navigation.navigate("NameofAllah");
    }
    if (label == "Quran") {
      navigation.navigate("QuranScreen");
    } else {
      console.log("Navigate to", label);
    }
    if (label == "Islamic Baby Names") {
      navigation.navigate("IslamicName");
    } else {
      console.log("Navigate to", label);
    }
    if (label == "Dua-Zikr") {
      navigation.navigate("DuaCatagories");
    } else {
      console.log("Navigate to", label);
    }
    if (label == "calendar") {
      navigation.navigate("Calendar");
    } else {
      console.log("Navigate to", label);
    }
    if (label == "Islamic-History") {
      navigation.navigate("IslamicHistory");
    } else {
      console.log("Navigate to", label);
    }
     if (label == "Miracles of Qur'an") {
       navigation.navigate("MiraclesQuran");
     } else {
       console.log("Navigate to", label);
     }
  };

  const renderCard = (label, imagePath) => (
    <TouchableWithoutFeedback onPress={() => handleCardPress(label)}>
      <Card style={styles.card} key={label}>
        <View style={styles.cardContent}>
          <Image source={imagePath} style={styles.cardImage} />
          <Text style={styles.cardText}>{label}</Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );

  const time = currentTime.format("hh:mm");
  const timePeriod = currentTime.format("A");
  const date = currentTime.format("dddd, D MMMM");
  const hijriDate = currentTime.locale("en").format("iD iMMMM iYYYY") + " AH";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/islamic-background-design-template-free_613258-61 1.png")}
          style={styles.headerImage}
        />
        <View style={styles.headerContent}>
          <Icon
            name="menu"
            size={screenWidth * 0.06}
            color="white"
            style={styles.menuIcon}
            onPress={() => setMenuVisible(true)}
          />
          <View style={styles.timeInfo}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.timePeriod}>{timePeriod}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.arabicDate}>{arabicDate}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {renderCard("Quran", require("../assets/quran 1.png"))}
        {renderCard("Hadith", require("../assets/islamic.png"))}
        {renderCard("Dua-Zikr", require("../assets/praying 1.png"))}
        {renderCard("calendar", require("../assets/ramadan.png"))}
        {renderCard("Miracles of Qur'an", require("../assets/magic-wand.png"))}
        {renderCard("Islamic-History", require("../assets/original.png"))}
        {renderCard("Islamic Baby Names", require("../assets/baby.png"))}
        {renderCard("99 names of Allah", require("../assets/allah.png"))}
        {renderCard(
          "Halal Restaurant Finder",
          require("../assets/market 1.png")
        )}
      </View>
      <Navbar />
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    position: "relative",
    height: screenHeight * 0.5,
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  headerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: screenWidth * 0.04,
  },
  menuIcon: {
    position: "absolute",
    top: Platform.OS === "ios" ? screenHeight * 0.2 : 25,
    left: 3,
    alignSelf: "flex-start",
  },
  timeInfo: {
    alignItems: "center",
    marginTop: screenHeight * 0.04,
    marginBottom: screenHeight * 0.09,
  },
  time: {
    color: "white",
    fontSize: screenWidth * 0.1,
    fontWeight: "bold",
  },
  timePeriod: {
    color: "white",
    fontSize: screenWidth * 0.03,
  },
  date: {
    color: "white",
    fontSize: screenWidth * 0.035,
  },
  arabicDate: {
    color: "white",
    fontSize: screenWidth * 0.035,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: screenWidth * 0.02,
    padding: screenWidth * 0.01,
    padding: screenHeight * 0.014,
    paddingVertical: screenHeight * 0.06,
  },
  card: {
    width: screenWidth * 0.25,
    margin: screenWidth * 0.03,
    alignItems: "center",
    padding: "1%",
    backgroundColor: "#FAE8BB",
    borderRadius: 7,
  },
  cardContent: {
    alignItems: "center",
  },
  cardText: {
    marginTop: screenWidth * 0.02,
    fontSize: 8,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#6E7697",
  },
});

export default HomeScreen;
