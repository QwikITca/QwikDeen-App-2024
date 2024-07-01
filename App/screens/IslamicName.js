import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import muslim_boy_names from "../../Muslim names/muslim_boy_names.json";
import muslim_girl_names from "../../Muslim names/muslim_girl_names.json";
import Navbar from "./Navbar";

const IslamicName = () => {
  const [gender, setGender] = useState("boy");
  const [searchQuery, setSearchQuery] = useState("");
  const [names, setNames] = useState({});
  const [selectedName, setSelectedName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setNames(gender === "boy" ? muslim_boy_names : muslim_girl_names);
  }, [gender]);

  const renderNameItem = ({ item }) => (
    <TouchableOpacity
      style={styles.nameItem}
      onPress={() => {
        setSelectedName(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.nameText}>{item.name}</Text>
      <Icon name="expand-more" size={24} color="#888" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>                          Islamic Baby Names</Text>
      </View>

      <View style={styles.genderToggle}>
        <TouchableOpacity
          style={[styles.genderButton, gender === "boy" && styles.activeGender]}
          onPress={() => setGender("boy")}
        >
          <Text style={styles.genderButtonText}>Boy Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "girl" && styles.activeGender,
          ]}
          onPress={() => setGender("girl")}
        >
          <Text style={styles.genderButtonText}>Girls Name</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Describe what you need"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.entries(names).flatMap(([letter, nameList]) =>
          nameList.filter((name) =>
            name.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )}
        renderItem={renderNameItem}
        keyExtractor={(item) => item.name}
        style={styles.nameList}
        numColumns={2}
        columnWrapperStyle={styles.nameRow}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color="#888" />
            </TouchableOpacity>
            {selectedName && (
              <>
                <View style={styles.nameDetailHeader}>
                  <Text style={styles.selectedNameText}>
                    {selectedName.name}
                  </Text>
                  <Icon name="expand-less" size={24} color="#888" />
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Meaning:</Text>
                  <Text style={styles.detailText}>{selectedName.meaning}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gender:</Text>
                  <Text style={styles.detailText}>
                    {gender === "boy" ? "Boy" : "Girl"}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Origin:</Text>
                  <Text style={styles.detailText}>Quranic, Urdu</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Significance:</Text>
                  <Text style={styles.detailText}>
                    The name reflects religious devotion and worship, making it
                    popular among Muslim families.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.navbar}>
        <Icon name="favorite-border" size={24} color="#888" />
        <Icon name="book" size={24} color="#888" />
        <Icon name="home" size={24} color="#888" />
        <Icon name="chat" size={24} color="#888" />
        <Icon name="settings" size={24} color="#888" />
      </View>
      <Navbar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "white",
    marginBottom: 13,
    marginTop: 40,
    alignSelf: "center",
  },
  genderToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  genderButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#0D5C1F",
    marginHorizontal: 5,
  },
  activeGender: {
    backgroundColor: "#FFD700",
  },
  genderButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    margin: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#117E2A",
    fontWeight: "bold",
  },
  nameList: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  nameRow: {
    justifyContent: "space-between",
  },
  nameItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "48%",
  },
  nameText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FAE8BB",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  nameDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedNameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 14,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
  },
});

export default IslamicName;
