import React, { useState, useEffect, useCallback } from "react";
import { Platform, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Audio } from "expo-av";

import { Button, View, StyleSheet, Text } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

import { PermissionsAndroid } from "react-native";
//react navigator
import RootStack from "./navigator/RootStack";
import Homepage from "./App/screens/homepage";
import Firstslider from "./App/screens/firstslide";

//Async-Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentailcontex
import { CredentialsContext } from "./components/CredintailsContext";

//WellcomeContext
import { WellcomeContext } from "./components/CredintailsContext";

//UserContext
import { UserContext } from "./components/CredintailsContext";

import * as SplashScreen from "expo-splash-screen";



import {
  useFonts,
  Poppins_400Regular,
  Poppins_100Thin,
  // Poppins_100ExtraLight ,
  // Poppins_100Light,
  Poppins_500Medium,
  // Poppins_600SemiBold,
  Poppins_700Bold,
  // Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted["android.permission.RECORD_AUDIO"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.CAMERA"] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      // console.log("You can use the cameras & mic");
    } else {
      // console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const BACKGROUND_TASK_NAME = "myBackgroundTask";

export default function App() {
  const [noficationtoken, setNoficationtoken] = useState("");

  const [noficationid, setNoficationid] = useState("");
  const [sound, setSound] = useState("");

  const [appIsReady, setAppIsReady] = useState(false);

  const [storeCredentials, setStoreCredentials] = useState("");

  const [storeWellcome, setStoreWellcome] = useState("");

  const [testCredentials, setTestCredentials] = useState("");

  // const [getProduct,setGetProduct] =useState(true);
  // const [getProductdata1,setGetProductdata1] =useState([]);
  // const [getdiscount, setGetdiscount]= useState("5")
  // const [getdiscountproduct, setGetdiscountproduct]= useState("5")

  // const [getProduct1,setGetProduct1] =useState(true);
  // const [getProductdata,setGetProductdata] =useState([]);

  // const [getDis,setGetDis] =useState(true);

  // const [getall,setGetall] =useState([]);
  // const [getallf,setGetallf] =useState([]);

  // const [getpromo,setGetpromo] =useState(true);
  // const [promo,setPromo] =useState([]);

  // do you task here

  TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    try {
      const sendNotification = async () => {
        const message = {
          to: noficationtoken,
          //   sound: 'default',
          //   sound: 'object',
          //   sound: ['custom_sound.wav'],
          title: "Test Notification",
          body: "This is a test notification",
          //   data: {objectId: '1', sound: 'custom_sound.mp3'},
          data: {
            objectId: "6",
            sound:
              "http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
          },
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      };
    } catch (error) {
      console.log("Background task error:", error);
    }

    console.log(
      "ia ma hereereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  noficationtoken",
      noficationtoken,
      "testCredentials.userid : ",
      testCredentials.userid
    );
  });

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    // Poppins_100ExtraLight ,
    // Poppins_100Light,
    Poppins_500Medium,
    // Poppins_600SemiBold,
    Poppins_700Bold,
    // Poppins_800ExtraBold,
    Poppins_900Black,
  });

  SplashScreen.preventAutoHideAsync();

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("qwikmedicLogin")
      .then((result) => {
        if (result !== null) {
          setStoreCredentials(JSON.parse(result));
        } else {
          setStoreCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  const checkWelcome3page = () => {
    AsyncStorage.getItem("qwikmedicwellcome3page")
      .then((result) => {
        if (result !== null) {
          setStoreWellcome(JSON.parse(result));
        } else {
          setStoreWellcome(null);
        }
      })
      .catch((error) => console.log(error));
  };

  const checkuser = () => {
    AsyncStorage.getItem("checkuserid")
      .then((result) => {
        if (result !== null) {
          setTestCredentials(JSON.parse(result));
        } else {
          setTestCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  // for push notifications

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice && Platform.OS !== "web") {
      // if (Device.isDevice) {

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notifications!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setNoficationtoken(token);

      // console.log('Push token:', token);

      // Save the token for later use or send to server
    } else {
      // console.log('Must use physical device for push notifications');
    }
  };

  const handleNotification = (notification) => {
    console.log("Received notification:", notification);
    // Handle the received notification in your app
  };

  Notifications.addNotificationReceivedListener((notification) => {
    const { objectId, sound1 } = notification.request.content.data;
    setNoficationid(objectId);
    setSound(sound1);
    if (objectId == "6") {
      const soundStatus = {
        shouldPlay: true,
        isPlaying: false,
      };

      const soundObject = new Audio.Sound();

      const playSound = async () => {
        try {
          await soundObject.loadAsync({ uri: sound1 });
          // await soundObject.loadAsync(require(`./assets/${sound}`));
          await soundObject.playAsync();
          soundStatus.isPlaying = true;
        } catch (error) {
          console.log("Error playing sound:", error);
          await soundObject.playAsync();
          soundStatus.isPlaying = true;
        }
      };

      playSound();

      // Notifications.setNotificationOpenedListener(() => {
      //   stopSound();
      // });
    }
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    const { objectId, sound1 } = response.notification.request.content.data;

    setNoficationid(objectId);
    setSound(sound1);
    if (objectId == "6") {
      const soundObject = new Audio.Sound();

      const soundStatus = {
        shouldPlay: true,
        isPlaying: false,
      };

      const stopSound = async () => {
        if (soundStatus.isPlaying) {
          await soundObject.stopAsync();
          soundStatus.isPlaying = false;
        }
      };

      stopSound();
      setSound("");
    }
  });

  const handleNotificationResponse = (response) => {
    const { page, objectId } = response.notification.request.content.data;

    console.log("page: ", page);
    console.log("objectId: ", objectId);

    // Handle the user's interaction with the notification
  };

  useEffect(() => {
    // requestCameraAndAudioPermission()

    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources

        checkLoginCredentials();
        checkWelcome3page();
        checkuser();

        // registerForPushNotificationsAsync();

        await SplashScreen.hideAsync();
        // Pre-load fonts, make any API calls you need to do here
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();

    const registerBackgroundTask = async () => {
      try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(
          BACKGROUND_TASK_NAME
        );

        if (isRegistered) {
          console.log("Background task is already registered.");
          // return;
        }

        await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
          minimumInterval: 10, // Minimum interval in seconds (1 minute)
          stopOnTerminate: false, // Keep running the background task even when the app is closed
          startOnBoot: true, // Start the background task when the device boots up
        });

        console.log("Background task registered.");
      } catch (error) {
        console.log("Background task registration error:", error);
      }
    };

    // registerBackgroundTask();

    return () => {
      // Clean up listeners
      Notifications.removeNotificationReceivedListener(handleNotification);
      Notifications.removeNotificationResponseReceivedListener(
        handleNotificationResponse
      );
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    // return <AppLoading />;
  } else {
    return (
      <WellcomeContext.Provider value={{ storeWellcome, setStoreWellcome }}>
        <CredentialsContext.Provider
          value={{ storeCredentials, setStoreCredentials }}
        >
          <UserContext.Provider value={{ testCredentials, setTestCredentials }}>
            {/* <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
          
          </View> */}
            <RootStack />
          </UserContext.Provider>
        </CredentialsContext.Provider>
      </WellcomeContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
