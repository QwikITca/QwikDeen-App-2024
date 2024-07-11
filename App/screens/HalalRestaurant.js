// HalalRestaurant.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Navbar from "./Navbar";

const GOOGLE_API_KEY = "AIzaSyCV1vFY2MKxyoyVPbxbCBEIOP87K7BE7uQ"; // Replace with your Google API key

const HalalRestaurant = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchNearbyRestaurants(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (error) {
      console.log("Error getting current location:", error);
    }
  };

  const fetchNearbyRestaurants = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&keyword=halal&key=${GOOGLE_API_KEY}`;
    try {
      const response = await axios.get(url);
      console.log("Google Places API response:", response.data); // Log the result for debugging
      if (response.data.results) {
        setRestaurants(response.data.results);
      } else {
        console.log("No businesses found");
      }
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  const renderRestaurantItem = ({ item }) => (
    <View style={styles.restaurantCard}>
      <Image
        source={{
          uri: item.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
            : "https://via.placeholder.com/80",
        }}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDescription}>{item.vicinity}</Text>
        <Text style={styles.restaurantDistance}>500 m</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Icon name="heart-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>                   Halal Restaurant</Text>

      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Location... or"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <Icon name="location-outline" size={24} color="#fff" />
          <Text style={styles.locationButtonText}>Your Live Location</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>
        Find Halal Food and Restaurants Near You
      </Text>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item.place_id}
        style={styles.restaurantList}
      />
      <Navbar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F3F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2E7D32",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  menuIcon: {
    color: "#fff",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    flex: 1,
    backgroundColor: "#fff",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFA000",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  locationButtonText: {
    color: "#fff",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
  },
  restaurantList: {
    paddingHorizontal: 16,
  },
  restaurantCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF8E1",
    borderRadius: 8,
    marginBottom: 16,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantDescription: {
    fontSize: 14,
    color: "#666",
  },
  restaurantDistance: {
    fontSize: 12,
    color: "#FFA000",
    marginTop: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 8,
    backgroundColor: "#2E7D32",
  },
  footerItem: {
    alignItems: "center",
  },
});

export default HalalRestaurant;
