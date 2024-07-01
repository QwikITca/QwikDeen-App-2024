import React, { useState, useEffect, useCallback } from "react";
import {
  Platform,
  Linking,
  View,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Audio } from "expo-av";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { PermissionsAndroid } from "react-native";

// React Navigator
import RootStack from "./navigator/RootStack";
import Homepage from "./App/screens/homepage";
import Firstslider from "./App/screens/firstslide";

// Async-Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Contexts
import {
  CredentialsContext,
  WellcomeContext,
  UserContext,
} from "./components/CredintailsContext";

// Splash Screen
import * as SplashScreen from "expo-splash-screen";

// Fonts
import {
  useFonts,
  Poppins_400Regular,
  Poppins_100Thin,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

// Request Camera and Audio Permissions
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
      console.log("You can use the cameras & mic");
    } else {
      console.log("Permission denied");
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

  TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    try {
      const sendNotification = async () => {
        const message = {
          to: noficationtoken,
          title: "Test Notification",
          body: "This is a test notification",
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
      await sendNotification();
      return BackgroundFetch.Result.NewData;
    } catch (error) {
      console.log("Background task error:", error);
      return BackgroundFetch.Result.Failed;
    }
  });

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    Poppins_500Medium,
    Poppins_700Bold,
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

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice && Platform.OS !== "web") {
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
    } else {
      console.log("Must use physical device for push notifications");
    }
  };

  const handleNotification = (notification) => {
    console.log("Received notification:", notification);
  };

  const handleNotificationResponse = (response) => {
    const { page, objectId } = response.notification.request.content.data;
    console.log("page: ", page);
    console.log("objectId: ", objectId);
  };

  useEffect(() => {
    async function prepare() {
      try {
        checkLoginCredentials();
        checkWelcome3page();
        checkuser();
        registerForPushNotificationsAsync();
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();

    const registerBackgroundTask = async () => {
      try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(
          BACKGROUND_TASK_NAME
        );
        if (!isRegistered) {
          await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
            minimumInterval: 10, // Minimum interval in seconds (1 minute)
            stopOnTerminate: false, // Keep running the background task even when the app is closed
            startOnBoot: true, // Start the background task when the device boots up
          });
          console.log("Background task registered.");
        } else {
          console.log("Background task is already registered.");
        }
      } catch (error) {
        console.log("Background task registration error:", error);
      }
    };

    registerBackgroundTask();

    const notificationListener =
      Notifications.addNotificationReceivedListener(handleNotification);
    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  } else {
    return (
      <WellcomeContext.Provider value={{ storeWellcome, setStoreWellcome }}>
        <CredentialsContext.Provider
          value={{ storeCredentials, setStoreCredentials }}
        >
          <UserContext.Provider value={{ testCredentials, setTestCredentials }}>
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
