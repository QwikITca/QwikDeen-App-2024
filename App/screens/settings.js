import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Switch,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";

function Settings({ navigation }) {
  const screenWidth = Dimensions.get("window").height;
  const [lan, setLan] = useState(true); // false = bangla , true = eng
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    // console.log("Settings")
  }, []);

  return (
    <>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <View style={[styles.navbar, { flexDirection: "row" }]}>
          <Pressable
            style={{ width: "5%", height: 25, left: 10, top: 15 }}
          ></Pressable>
          <View style={styles.navbarContent}>
            <Text
              style={{
                top: 17,
                color: colors.black,
                fontSize: 14,
                display: lan ? "none" : "flex",
              }}
            >
              {" "}
              বিস্তারিত
            </Text>
            <Text style={styles.navbarTitle}>Settings</Text>
            <View style={styles.navbarIcons}>
              <Pressable
                style={{ marginRight: 20 }}
                onPress={() =>
                  navigation.navigate("HomeScreen", { reminder: true })
                }
              >
                <Ionicons name="home-sharp" size={20} color="white" />
              </Pressable>
              <Pressable
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate("BookMark", {})}
              >
                <Ionicons name="bookmarks-outline" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* All Settings Options */}
        <View style={styles.container}>
          {/* Communication Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Communication Preferences</Text>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Push Notification</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </Pressable>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Prayer Time Zone</Text>
              <Text style={styles.listText}>Dhaka, Bangladesh</Text>
            </Pressable>
          </View>

          {/* General */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>About</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Terms & Conditions</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Feedback</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Rate our App</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Share This App</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
            <Pressable style={styles.listItem}>
              <Text style={styles.listText}>Get Our More Apps</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#117E2A",
    width: "100%",
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
    alignItems:"center"
  },
  navbarContent: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    left: 10,
  },
  navbarTitle: {
    color: colors.white,
    fontSize: 14,
    display: "flex",
    letterSpacing: 0.9,
    fontFamily: "Poppins_400Regular",
    marginTop:25,
    alignContent:"center",
  },
  navbarIcons: {
    width: "60%",
    height: "100%",
    top: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 50,
  },
  container: {
    padding: 20,
    backgroundColor: "#117E2A",
    flex: 1,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#117E2A",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  listText: {
    fontSize: 16,
    color: "gray",
  },
});

export default Settings;
