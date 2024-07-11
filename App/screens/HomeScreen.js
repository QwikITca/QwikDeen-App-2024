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
  SafeAreaView,StatusBar,
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
    }, 6000); // update time every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchArabicDate();
  }, []);

  const arabicMonthMap = {
    Muharram: "Muharram",
    Safar: "Safar",
    "Rabi' al-awwal": "Rabi' al-Awwal",
    "Rabi' al-Thani": "Rabi' al-Thani",
    "Jumada al-awwal": "Jumada al-Awwal",
    "Jumada al-Thani": "Jumada al-Thani",
    Rajab: "Rajab",
    "Sha'ban": "Sha'ban",
    Ramadan: "Ramadan",
    Shawwal: "Shawwal",
    "Dhu al-Qi'dah": "Dhu al-Qi'dah",
    "Dhu al-Hijjah": "Dhu al-Hijjah",
  };

  const fetchArabicDate = async () => {
    try {
      const formattedDate = currentTime.format("DD-MM-YYYY");
      const response = await axios.get(
        `https://api.aladhan.com/v1/gToH/${formattedDate}`
      );
      const hijriDate = response.data.data.hijri;
      const monthName =
        arabicMonthMap[hijriDate.month.en] || hijriDate.month.en;
      const arabicDateStr = `${hijriDate.day} ${monthName} ${hijriDate.year} AH`;
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
     if (label == "Halal Restaurant Finder") {
       navigation.navigate("HalalRestaurant");
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar animated={true} backgroundColor="green" />
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
          {renderCard(
            "Miracles of Qur'an",
            require("../assets/magic-wand.png")
          )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
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
    height: "85%",
    resizeMode: "fit",
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
    top: Platform.OS === "ios" ? screenHeight * 0.05 : screenHeight * 0.05,
    left: screenWidth * 0.05,
    alignSelf: "flex-start",
  },
  timeInfo: {
    alignItems: "center",
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02,
  },
  time: {
    color: "white",
    fontSize: screenWidth * 0.12,
    fontWeight: "bold",
  },
  date: {
    color: "white",
    fontSize: screenWidth * 0.04,
  },
  arabicDate: {
    color: "white",
    fontSize: screenWidth * 0.04,
  },
  timePeriod: {
    color: "white",
    fontSize: screenWidth * 0.03,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
    padding: screenWidth *0.0,
    padding: screenHeight * 0.0,
    paddingVertical: screenHeight * 0.00,
   
  },
  card: {
    width: screenWidth * 0.28,
    margin: screenWidth * 0.02,
    alignItems: "center",
    padding: screenWidth * 0.01,
    backgroundColor: "#FAE8BB",
    borderRadius: 10,
  },
  cardText: {
    marginTop: screenWidth * 0.01,
    fontSize: screenWidth * 0.03,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "black",
    fontWeight:"condensedBold",
  },
  cardContent: {
    alignItems: "center",
  },
});

export default HomeScreen;
