import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import quran from "../../Quran/quran.json";
import quranEn from "../../Quran/quranEn.json";
import quranBN from "../../Quran/quranBN.json";
import quranFR from "../../Quran/quranFR.json";
import quranUR from "../../Quran/quranUR.json";
import Navbar from "./Navbar";
import Icon from "react-native-vector-icons/MaterialIcons";
import Voice from "./Voice";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import MenuModal from "./MenuModal";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const SurahDetailScreen = ({ route }) => {
  const { surah } = route.params;
  const [selectedTranslation, setSelectedTranslation] = useState("en");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState(null);

  const getTranslationData = () => {
    switch (selectedTranslation) {
      case "bn":
        return quranBN;
      case "fr":
        return quranFR;
      case "ur":
        return quranUR;
      case "en":
      default:
        return quranEn;
    }
  };

  const surahVerses = quran.find((data) => data[surah.number.toString()]);
  const surahTranslationVerses = getTranslationData().find(
    (data) => data[surah.number.toString()]
  );
  const [menuVisible, setMenuVisible] = useState(false);

  if (!surahVerses || !surahTranslationVerses) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No verses found for this Surah.</Text>
      </View>
    );
  }

  const verses = surahVerses[surah.number.toString()];
  const translationVerses = surahTranslationVerses[surah.number.toString()];

  const renderVerseItem = ({ item, index }) => (
    <View style={styles.verseContainer}>
      <View style={styles.verseHeader}>
        <Text style={styles.verseNumber}>{item.verse}</Text>
      </View>
      <Text style={styles.verseText}>{item.text}</Text>
      <Text style={styles.verseTranslation}>
        {translationVerses[index].text}
      </Text>
    </View>
  );

  const handleTranslationChange = (translation) => {
    setSelectedTranslation(translation);
    setIsModalVisible(false); // Close the modal after selecting a translation
  };

  const navigation = useNavigation();

  const handleFavoritePress = async () => {
    try {
      const bookmarkedSurahs = await AsyncStorage.getItem("bookmarkedSurahs");
      const bookmarks = bookmarkedSurahs ? JSON.parse(bookmarkedSurahs) : [];
      if (!bookmarks.some((s) => s.number === surah.number)) {
        bookmarks.push(surah);
        await AsyncStorage.setItem(
          "bookmarkedSurahs",
          JSON.stringify(bookmarks)
        );
      }
      //navigation.navigate("BookMark"); // Navigate to BookMark page
    } catch (error) {
      console.error("Error saving bookmark:", error);
    }
  };

  const playAudio = async (audioUrl) => {
    try {
      if (activeSound) {
        await activeSound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      setActiveSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Error playing audio:", error.message);
    }
  };

  const pauseAudio = async () => {
    if (activeSound) {
      await activeSound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await pauseAudio();
    } else {
      if (activeSound) {
        await activeSound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          name="menu"
          size={screenWidth * 0.06}
          color="white"
          style={styles.menuIcon}
          onPress={() => setMenuVisible(true)}
        />
        <Text style={styles.headerTitle}>Quran</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Icon
              name="translate"
              size={24}
              color="#FFF"
              style={styles.iconSpacing}
            />
          </TouchableOpacity>
          <Voice
            surah={surah}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
            style={styles.iconSpacing}
          />
          <TouchableOpacity onPress={handleFavoritePress}>
            <Icon name="favorite-border" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={verses}
        renderItem={renderVerseItem}
        keyExtractor={(item) => `${item.chapter}-${item.verse}`}
        ListHeaderComponent={
          <Text style={styles.surahTitle}>{surah.name}</Text>
        }
        contentContainerStyle={styles.scrollViewContent}
      />

      {/* Translation Selection Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Translation</Text>
              <TouchableOpacity onPress={() => handleTranslationChange("en")}>
                <Text style={styles.modalOption}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTranslationChange("bn")}>
                <Text style={styles.modalOption}>Bengali</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTranslationChange("fr")}>
                <Text style={styles.modalOption}>French</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTranslationChange("ur")}>
                <Text style={styles.modalOption}>Urdu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalOption}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Navbar />
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
  },
  scrollViewContent: {
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#117E2A",
    padding: 16,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft:50,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginHorizontal: 8,
  },
  surahTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 3,
    marginHorizontal: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  verseContainer: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: "#FAE8BB",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  verseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  verseNumber: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#33915F",
  },
  verseText: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "right",
    color: "#33915F",
  },
  verseTranslation: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    marginVertical: 10,
  },
  menuIcon: {
    position: "absolute",
    top: Platform.OS === "ios" ? screenHeight * 0.05 : screenHeight * 0.05,
    left: screenWidth * 0.05,
    alignSelf: "flex-start",
  },
});

export default SurahDetailScreen;
