import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Audio } from "expo-av"; // Ensure this import is present
import axios from "axios";

const Voice = ({ surah, playAudio }) => {
  const [sound, setSound] = useState(null);
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchReciters();
    return () => {
      // Clean up resources when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const fetchReciters = async () => {
    try {
      const response = await axios.get(
        "https://www.mp3quran.net/api/v3/reciters?language=eng"
      );

      if (response.status !== 200) {
        throw new Error(`Failed to fetch reciters. Status: ${response.status}`);
      }

      if (
        !response.data ||
        !response.data.reciters ||
        !Array.isArray(response.data.reciters)
      ) {
        throw new Error(
          `Reciters data not available or not in expected format.`
        );
      }

      setReciters(response.data.reciters);
      setSelectedReciter(response.data.reciters[0]);
    } catch (error) {
      console.error("Error fetching reciters:", error.message);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (
        !selectedReciter ||
        !selectedReciter.moshaf ||
        !selectedReciter.moshaf[0]
      ) {
        throw new Error("Reciter data not available");
      }

      const audioUrl = `${selectedReciter.moshaf[0].server}${String(
        surah.number
      ).padStart(3, "0")}.mp3`;

      if (sound) {
        await sound.unloadAsync();
      }

      playAudio(audioUrl); // Call playAudio function passed as prop
    } catch (error) {
      console.error("Error toggling play/pause:", error.message);
    }
  };

  const handleReciterSelection = (reciter) => {
    setSelectedReciter(reciter);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.voiceContainer}>
      <>
        <TouchableOpacity onPress={togglePlayPause} style={styles.speakerIcon}>
          <Icon name="play-arrow" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.reciterButton}
        >
          <Text style={styles.reciterButtonText}>
            {selectedReciter ? selectedReciter.name : "Select Reciter"}
          </Text>
        </TouchableOpacity>
      </>

      {/* Reciters Selection Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={reciters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.reciterItem}
                  onPress={() => handleReciterSelection(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  voiceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  speakerIcon: {
    marginHorizontal: 8,
  },
  reciterButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
  },
  reciterButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  reciterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F44336",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Voice;
