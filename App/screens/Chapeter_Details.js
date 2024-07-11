import React, { useEffect, useState,useRef, } from "react";
import * as Speech from "expo-speech";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SahihalBukhari } from "../../hadith_Chapter.js";
import Sunnah_abi_dawd from "../../sunnah_abi_daud.json";
import Sunnah_ibn_mazah from "../../sunah_ibn_majah.json";
import SahihMuslim from "../../sahih_muslim.json";
import SunanNasai from "../../Sunnah_nasai.json";
import jamih_Tirmidhi from "../../Jamih_Trimidhi.json";
import sahihbukhari from "../../sahih_bukhari.json";
import { Share } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../config/colors.js";

const Chapeter_Details = ({ navigation, route }) => {
  const [shared, setShared] = useState("Hadith");
  const [pagesdata, setPagesdata] = useState([]);
  const [pagesdata1, setPagesdata1] = useState([]);
  const [bookmarked, setBookmark] = useState(null);
  const { page, name, book } = route.params;
  const [disable, setDisable] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState("English");
  const [inputValue, setInputValue] = useState("");
  const [voice, setVoice] = useState(true);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const scrollViewRef = useRef(null);

useEffect(() => {
  let mergedData = [];

  if (Sunnah_abi_dawd) {
    const filteredData = Sunnah_abi_dawd.filter(
      (index) => index.HadisBookName === name && index.BookName === book
    );
    mergedData = [...mergedData, ...filteredData];
  }

  if (sahihbukhari) {
    const filteredData = sahihbukhari.filter(
      (index) => index.HadisBookName === name && index.BookName === book
    );
    mergedData = [...mergedData, ...filteredData];
  }
  if (Sunnah_ibn_mazah) {
    const filteredData = Sunnah_ibn_mazah.filter(
      (index) => index.HadisBookName === name && index.BookName === book
    );
    mergedData = [...mergedData, ...filteredData];
  }

  if (SahihMuslim) {
    const filteredData = SahihMuslim.filter(
      (index) => index.HadisBookName === name && index.BookName === book
    );
    mergedData = [...mergedData, ...filteredData];
  }

  if (SunanNasai) {
    const filteredData = SunanNasai.filter(
      (index) => index.HadisBookName === name && index.BookName === book
    );
    mergedData = [...mergedData, ...filteredData];
  }

  if (jamih_Tirmidhi) {
    const filteredData = jamih_Tirmidhi.filter(
      (index) => index.HadisBookName === name && index.BookName === book
    );
    mergedData = [...mergedData, ...filteredData];
  }

  setPagesdata(mergedData);
  setPagesdata1(mergedData);

  // Add scrolling functionality for bookmarked hadith

  if (route.params?.fromBookmark) {
    const bookmarkedHadith = mergedData.find((h) => h.id === route.params.page);
    if (bookmarkedHadith) {
      const index = mergedData.indexOf(bookmarkedHadith);
      scrollViewRef.current?.scrollTo({ y: index * 200, animated: true }); // Adjust 200 based on your item height
    }
  }
}, [name, page, book, route.params]);

  
  const BOOKMARK_KEY = "bookmark";

  const setData = async (key, value) => {
    try {
      const jsonData = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getData = async (key) => {
    try {
      const res = await AsyncStorage.getItem(key);
      return JSON.parse(res);
    } catch (error) {
      return null;
    }
  };

  const bookmark = async (id) => {
    try {
      const exData = await getData(BOOKMARK_KEY);
      let newData = exData || [];

      const selectedHadith = pagesdata.find((index) => index.id === id);

      const dataIsExit = newData.find(
        (index) => index.id === selectedHadith.id
      );

      if (dataIsExit) {
        return;
      }

      newData.push({
        ...selectedHadith,
        book,
        name,
        
      });

      await setData(BOOKMARK_KEY, newData);
      setBookmark(id);
    } catch (error) {
      console.error(error);
    }
  };

  const onShare = async (data) => {
    try {
      const result = await Share.share({
        message: data,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message); // Log the error message to the console
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const searchFilter = (text) => {
    if (text) {
      const filteredData = pagesdata1.filter((item) => {
        const itemData = item.Narrated
          ? item.Narrated.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setPagesdata(filteredData);
      setInputValue(text);
    } else {
      setPagesdata(pagesdata1);
      setInputValue(text);
    }
  };

  const speak = (narration, hadith) => {
    setIsVoiceSpeaking(true);
    setVoice(!voice);

    const thingToSay = `${narration} + ${hadith}`;
    Speech.speak(thingToSay);
  };

  const stopVoice = () => {
    setVoice(!voice);
    setIsVoiceSpeaking(false);
    Speech.stop();
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (
          isVoiceSpeaking ||
          modal === "Arabic" ||
          modal === "Urdu" ||
          modal === "Banglas"
        ) {
          stopVoice();
        }
      };
    }, [isVoiceSpeaking])
  );

  const screenWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#117E2A",
      paddingHorizontal: 10,
      top: 0,
      height: 80,
      marginBottom: 2,
    },
    image: {
      width: screenWidth,
      height: undefined,
      aspectRatio: 3,
    },
    text: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateX: -30 }, { translateY: -10 }],
      fontSize: 20,
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#117E2A",
    },
    modalContent: {
      backgroundColor: "#117E2A",
      width: "55%",
      borderRadius: 10,
      padding: 20,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      top: -10,
      right: -10,
      backgroundColor:"#117E2A",
      borderRadius: 50,
      height: 30,
      width: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    translate_text: {
      padding: 5,
    },
    textHover: {
      backgroundColor: "#F4F1E8",
      color: "white",
    },
  });
  return (
    <>
      <SafeAreaView
        style={{ paddingHorizontal: 5, backgroundColor: "#117E2A" }}
      >
        <View style={[styles.container]}>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "40%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 0,
              }}
            >
              <Pressable style={{ right: 10 }}>
                <Text>
                  {" "}
                  <Ionicons
                    name="chevron-back-outline"
                    size={28}
                    color="white"
                  />
                </Text>
              </Pressable>
              <Text
                style={{
                  right: 10,
                  fontSize: 14,
                  color: "white",
                  letterSpacing: 0.7,
                  fontFamily: "Poppins_400Regular",
                }}
                onPress={() =>
                  navigation.navigate("Hadith_Chapter", { name: name })
                }
              >
                {book.length < 10 ? book : book.split("", 10)}{" "}
                {book.length > 10 ? "..." : ""}{" "}
              </Text>
            </View>

            <View
              style={{
                width: "20%",
                justifyContent: "space-around",
                alignItems: "flex-start",
                flexDirection: "row",
                borderWidth: 0,
                right: 2,
              }}
            >
              <Pressable onPress={() => navigation.navigate("BookMark")}>
                <Ionicons
                  name="star"
                  size={20}
                  style={{
                    paddingVertical: 5,
                    color: "#7FAFAF",
                    fontWeight: "bold",
                    marginRight: 5,
                  }}
                />
              </Pressable>
            </View>

            <View
              style={{
                width: "40%",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "row",
                borderWidth: 0,
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  borderColor: "white",
                  fontSize: 11,
                  borderWidth: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 30,
                  borderRadius: 15,
                  backgroundColor: "white",
                  letterSpacing: 0.7,
                  fontFamily: "Poppins_400Regular",
                  color: colors.text,
                }}
                placeholder="Search here..."
                // value={inputValue}
                // onChangeText={handleInputChange}
                value={inputValue}
                defaultValue={inputValue}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#7FAFAF",
              fontSize: 14,
              marginLeft: 20,
              paddingRight: 0,
            }}
          >
            {book}
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            backgroundColor: "#117E2A",
            paddingBottom: 110,
          }}
         
        >
          {pagesdata.map((index, idx) => (
            <View
              key={idx}
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#FAE8BB",
                  marginBottom: 15,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    color: "#33915F",
                    lineHeight: 18,
                    fontSize: 12,
                    letterSpacing: 0.7,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  {index.Book_Reference}
                </Text>
              </View>
              <View
                style={{ backgroundColor: "#FAE8BB", paddingHorizontal: 10 }}
              >
                <View
                  style={{
                    paddingVertical: 20,
                    flexDirection: "row",
                    flex: 100,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#33915F",
                      flex: 60,
                      letterSpacing: 0.7,
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    {index.Narrated || "Narrated Al-Bara' bin 'Azib:"}{" "}
                  </Text>
                  {disable ? (
                    ""
                  ) : voice ? (
                    <Pressable
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 5,
                        borderRadius: 5,
                        flex: 15,
                        justifyContent: "space-between",
                        backgroundColor: "#7FAFAF",
                      }}
                      onPress={() => {
                        speak(
                          index.Narrated,
                          modal === "English" && index.Hadisth_English
                        );
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          letterSpacing: 0.7,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Listen
                      </Text>
                      <Ionicons
                        name="volume-mute-outline"
                        size={12}
                        color="white"
                        style={{
                          paddingVertical: 5,
                          fontWeight: "bold",
                          marginRight: 5,
                        }}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={stopVoice}
                      style={{
                        flexDirection: "row",
                        flex: 15,
                        justifyContent: "space-between",
                        backgroundColor: "#7FAFAF",
                        paddingHorizontal: 5,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          letterSpacing: 0.7,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Listen
                      </Text>
                      <Ionicons
                        name="volume-medium-outline"
                        size={12}
                        color="white"
                        style={{
                          paddingVertical: 5,
                          fontWeight: "bold",
                          marginRight: 5,
                        }}
                      />
                    </Pressable>
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "left",
                    lineHeight: 25,
                    fontSize: 12,
                    letterSpacing: 0.7,
                    fontFamily: "Poppins_400Regular",
                    color: colors.text,
                  }}
                >
                  {modal === "English"
                    ? index.Hadisth_English
                    : modal === "Arabic"
                    ? index.Hadith_Arabic
                    : modal === "Urdu"
                    ? index.Hadith_Urdu || index.Hadisth_English
                    : modal === "Banglas"
                    ? index.Hadith_bangla || index.Hadisth_English
                    : index.Hadisth_English ||
                      "Allah's Messenger (ﷺ) ordered us to do seven (things): to visit the sick, to follow the funeral processions, to say Tashmit to a sneezer, to help the weak, to help the oppressed ones, to propagate As-Salam (greeting), and to help others to fulfill their oaths (if it is not sinful). He forbade us to drink from silver utensils, to wear gold rings, to ride on silken saddles, to wear silk clothes, Dibaj (thick silk cloth), Qassiy and Istabraq (two kinds of silk)"}
                </Text>
                {/* reference_part */}
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 100,
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{ flexDirection: "column", flex: 80, marginTop: 15 }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        letterSpacing: 0.7,
                        fontFamily: "Poppins_400Regular",
                        color: colors.ash,
                      }}
                    >
                      Reference:{" "}
                      <Text
                        style={{
                          fontSize: 11,
                          letterSpacing: 0.7,
                          fontFamily: "Poppins_400Regular",
                          color: colors.ash,
                        }}
                      >
                        {" "}
                        {index.Reference}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        letterSpacing: 0.7,
                        fontFamily: "Poppins_400Regular",
                        color: colors.ash,
                      }}
                    >
                      Book:{" "}
                      <Text
                        style={{
                          fontSize: 11,
                          letterSpacing: 0.7,
                          fontFamily: "Poppins_400Regular",
                          color: colors.ash,
                        }}
                      >
                        {" "}
                        {index.BookName}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        letterSpacing: 0.7,
                        fontFamily: "Poppins_400Regular",
                        color: colors.ash,
                      }}
                    >
                      Chapter:{" "}
                      <Text
                        style={{
                          fontSize: 11,
                          letterSpacing: 0.7,
                          fontFamily: "Poppins_400Regular",
                          color: colors.ash,
                        }}
                      >
                        {" "}
                        {index.Chapter_English || "The signs of a hypocrite"}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 20,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Pressable onPress={() => bookmark(index.id)}>
                      <Ionicons
                        name="star-outline"
                        size={18}
                        color="#7FAFAF"
                        style={{ paddingVertical: 5, fontWeight: "bold" }}
                      />
                    </Pressable>
                    <Pressable
                      style={{ marginLeft: 10 }}
                      onPress={() => {
                        onShare(
                          // modal === "Bengali" ? index.bengali_meaning :
                          modal === "English"
                            ? index.Hadisth_English
                            : modal === "Arabic"
                            ? index.Hadith_Arabic
                            : modal === "Urdu"
                            ? index.Hadith_Urdu || index.Hadith_English
                            : modal === "Banglas"
                            ? index.Hadith_bangla || index.Hadith_English
                            : // modal === "Urdu" ? index.urdu_meaning :
                              index.Hadisth_English
                        );
                      }}
                    >
                      <Ionicons
                        name="arrow-redo-sharp"
                        size={18}
                        color="#7FAFAF"
                        style={{ paddingVertical: 5, fontWeight: "bold" }}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Translate Part */}
      </SafeAreaView>
    </>
  );
};

export default Chapeter_Details;
