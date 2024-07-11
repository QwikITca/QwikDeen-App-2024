import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import axios from "axios";
import Navbar from "./Navbar";

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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [currentHijriMonth, setCurrentHijriMonth] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchCurrentHijriMonth(currentMonth);
    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchHijriDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchHijriDate = async (date) => {
    try {
      const response = await axios.get("https://api.aladhan.com/v1/gToH", {
        params: {
          date: date.split("-").reverse().join("-"), // Convert YYYY-MM-DD to DD-MM-YYYY
        },
      });

      const hijri = response.data.data.hijri;
      const monthName = arabicMonthMap[hijri.month.en] || hijri.month.en;
      const formattedHijriDate = `${hijri.day} ${monthName} ${hijri.year}`;

      setHijriDate(formattedHijriDate);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentHijriMonth = async (date) => {
    try {
      const response = await axios.get("https://api.aladhan.com/v1/gToH", {
        params: {
          date: date.split("-").reverse().join("-"), // Convert YYYY-MM-DD to DD-MM-YYYY
        },
      });

      const hijri = response.data.data.hijri;
      const monthName = arabicMonthMap[hijri.month.en] || hijri.month.en;
      const currentHijriMonth = `${monthName} ${hijri.year}`;

      setCurrentHijriMonth(currentHijriMonth);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await axios.get("https://api.aladhan.com/v1/hToG", {
        params: {
          year: 1445, // Example Hijri year
          month: 12, // Example Hijri month (Dhul-Hijjah)
        },
      });

      console.log("Upcoming events API response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        const formattedEvents = response.data.data.map((event) => ({
          name: event.name,
          hijriDate: `${event.hijri.day} ${
            arabicMonthMap[event.hijri.month.en] || event.hijri.month.en
          } ${event.hijri.year}`,
          gregorianDate: `${event.gregorian.day} ${event.gregorian.month.en} ${event.gregorian.year}`,
        }));
        setEvents(formattedEvents);
      } else {
        console.warn(
          "No events data found in response or response structure is incorrect."
        );
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      setEvents([]); // Set events as an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const onMonthChange = (month) => {
    const newMonth = `${month.year}-${String(month.month).padStart(2, "0")}-01`;
    setCurrentMonth(newMonth);
    fetchCurrentHijriMonth(newMonth);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B5E20" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Islamic Calendar</Text>
      <RNCalendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "blue",
          },
        }}
        onMonthChange={onMonthChange}
        theme={{
          backgroundColor: "#FFFFFF",
          calendarBackground: "#F3F4F6",
          textSectionTitleColor: "#2E7D32",
          selectedDayBackgroundColor: "#2E7D32",
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: "#2E7D32",
          dayTextColor: "#2E7D32",
          textDisabledColor: "#BDBDBD",
          arrowColor: "#2E7D32",
          monthTextColor: "#2E7D32",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "500",
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        renderHeader={(date) => {
          return (
            <View>
              <Text style={styles.headerText}>{currentHijriMonth}</Text>
            </View>
          );
        }}
      />
      <View style={styles.eventContainer}>
        <Text style={styles.hijriDate}>Selected Hijri Date: {hijriDate}</Text>
        <Text style={styles.upcomingEventsTitle}>Upcoming events:</Text>
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event, index) => (
            <View key={index} style={styles.event}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDetails}>{event.hijriDate}</Text>
              <Text style={styles.eventDetails}>{event.gregorianDate}</Text>
            </View>
          ))
        ) : (
          <Text>No upcoming events found.</Text>
        )}
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#117E2A",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    marginTop: 25,
    textAlign: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
  },
  eventContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  hijriDate: {
    fontSize: 18,
    marginBottom: 16,
    color: "white",
  },
  upcomingEventsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  event: {
    backgroundColor: "#A5D6A7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default Calendar;
