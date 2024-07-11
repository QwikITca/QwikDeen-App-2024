import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";
import SahihalBukhari from "../../Hadis_Chapter_Collections/Bukhari.json";
import SahihMuslim from "../../Hadis_Chapter_Collections/Muslim.json";
import SunanNasai from "../../Hadis_Chapter_Collections/Nasai.json";
import Sahih_Abi_Daud from "../../Hadis_Chapter_Collections/Abi_Dawud.json";
import Jamih_Tirmidhi from "../../Hadis_Chapter_Collections/Tirmidhi.json";
import subh_ibne_majah from "../../Hadis_Chapter_Collections/Majah.json";
import Navbar from "./Navbar";

const Hadith_Chapter = ({ navigation, route }) => {
  const [lan, setLan] = useState(true); // false = bangla , true = eng
  const [chapter, setChapter] = useState(route.params.chapter);
  const [chapter1, setChapter1] = useState(route.params.chapter);
  const [load, setLoad] = useState(true);
  const [HadithName, setHadithName] = useState(route.params.HadithName);
  const [arbi, setArbi] = useState(route.params.arbi);
  const [Intro, setIntro] = useState(route.params.Intro);
  const { name } = route.params;

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
      marginBottom: 9,
    },
    navbar: {
      backgroundColor: "#117E2A",
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 1.5, height: 1.5 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 6,
    },
    input: {
      width: "100%",
      borderColor: "#117E2A",
      fontSize: 11,
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 30,
      borderRadius: 15,
      backgroundColor: "white",
      letterSpacing: 0.5,
      fontFamily: "Poppins_400Regular",
      color: "#0E1B51",
    },
    card: {
      width: "95%",
      borderRadius: 10,
      borderWidth: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#FEFAEE",
      marginBottom: 10,
      paddingVertical: 20,
      marginTop: 0,
    },
    cardText: {
      fontSize: 11,
      letterSpacing: 0.7,
      fontFamily: "Poppins_400Regular",
      color: colors.text,
    },
   
  });

  const Header_Max_Height = 110;
  const Header_Min_Height = 100;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const Scroll_Distance = Header_Max_Height - Header_Min_Height;
  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });
  const animateHeaderBackgroundColor = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ["#F4F1E8", "#F4F1E8"],
    extrapolate: "clamp",
  });

  const [inputValue, setInputValue] = useState("");

  const back = () => {
    const { goBack } = navigation;
    goBack();
  };

  const searchFilter = (text) => {
    if (text) {
      const filteredData = chapter1.filter((item) => {
        const itemData = item.bookname_english
          ? item.bookname_english.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setChapter(filteredData);
      setInputValue(text);
    } else {
      setChapter(chapter1);
      setInputValue(text);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{ paddingHorizontal: 0, backgroundColor: "#117E2A" }}
      >
        <View style={[styles.container]}>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 15,
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
              <Pressable style={{ right: 10 }} onPress={() => back()}>
                <Text>
                  <Ionicons
                    name="chevron-back-outline"
                    size={28}
                    color="#FEFAEE"
                  />
                </Text>
              </Pressable>
              <Text
                style={{
                  right: 10,
                  fontSize: 12,
                  color: "#FEFAEE",
                  letterSpacing: 0.7,
                  fontFamily: "Poppins_400Regular",
                }}
                onPress={() => back()}
              >
                {HadithName}
              </Text>
            </View>
            <View
              style={{
                width: "15%",
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
                width: "45%",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "row",
                borderWidth: 0,
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Search here..."
                value={inputValue}
                defaultValue={inputValue}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 5,
            marginVertical: screenWidth * 0.01,
            paddingHorizontal: 8,
            paddingVertical: 10,
            backgroundColor: "#FEFAEE",
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: screenWidth * 0.0001,
              color: "#0E1B51",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                letterSpacing: 0.7,
                fontFamily: "Poppins_400Regular",
              }}
            >
              {HadithName}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                color: "#0E1B51",
                fontSize: 12,
              }}
            >
              {arbi}
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontSize: 11,
              letterSpacing: 0.5,
              fontFamily: "Poppins_400Regular",
              lineHeight: 18,
              color: "#0E1B51",
            }}
          >
            {Intro}
          </Text>
        </View>

        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
          style={{ marginBottom: 20 }}
        >
          {chapter.map((index, index2) => (
            <View key={index.serial_no}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate("Chapter_Details", {
                      page: index.hadith_serial_start,
                      name: name,
                      book: index.bookname_english,
                    });
                  }}
                >
                  <Text style={[styles.cardText, { flex: 10, marginLeft: 8 }]}>
                    {index2 + 1}.
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      {
                        flex: 30,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingBottom: 20,
                        paddingTop: 20,
                      },
                    ]}
                  >
                    {index.bookname_english}
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      { fontSize: 14, flex: 30, color: colors.ash },
                    ]}
                  >
                    {index.bookname_arabic}
                  </Text>
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="chevron-forward-outline"
                      size={18}
                      color="rgba(51, 145, 95, 1)"
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <Navbar />
    </>
  );
};

export default Hadith_Chapter;
