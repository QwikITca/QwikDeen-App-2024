import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstScreen from "../App/screens/FirstScreen";
import Homepage from "../App/screens/homepage";
import Hadith_Chapter from "../App/screens/Hadith_Chapter";
import Chapeter_Details from "../App/screens/Chapeter_Details";
import BookMark from "../App/screens/Bookmark";
import  Settings  from "../App/screens/settings";
import HomeScreen from "../App/screens/HomeScreen";
import NameofAllah from "../App/screens/NameofAllah";
import QuranScreen from "../App/screens/QuranScreen";
import SurahDetailScreen from "../App/screens/SurahDetailScreen";
import IslamicName from "../App/screens/IslamicName";
import DuaList from "../App/screens/DuaList";
import DuaCatagories from "../App/screens/DuaCatagories";
import Calendar from "../App/screens/Calendar";
import IslamicHistory from "../App/screens/IslamicHistory";
import HistoryDetails from "../App/screens/HistoryDetails";
import MiraclesQuran from "../App/screens/MiraclesQuran";
import MiracleDetails from "../App/screens/MiraclesDetails";
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="NameofAllah" component={NameofAllah} />
        <Stack.Screen name="QuranScreen" component={QuranScreen} />
        <Stack.Screen name="IslamicName" component={IslamicName} />
        <Stack.Screen name="SurahDetailScreen" component={SurahDetailScreen} />
        <Stack.Screen name="Hadith_Chapter" component={Hadith_Chapter} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Chapter_Details" component={Chapeter_Details} />
        <Stack.Screen name="DuaCatagories" component={DuaCatagories} />
        <Stack.Screen name="DuaList" component={DuaList} />
        <Stack.Screen name="IslamicHistory" component={IslamicHistory} />
        <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
        <Stack.Screen name="MiraclesQuran" component={MiraclesQuran} />
        <Stack.Screen name="MiracleDetails" component={MiracleDetails} />
        <Stack.Screen name="Bookmark" component={BookMark} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
