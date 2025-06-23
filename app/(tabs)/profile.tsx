import { styles } from "@/constants/Colors";
import * as Speech from "@jamsch/expo-speech-recognition";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Appearance,
  Button,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from "react-native";
export default function Profile() {
  const colorScheme = Appearance.getColorScheme();
  const themeTextStyle =
    colorScheme === "light"
      ? styles.lightStandardText
      : styles.darkStandardText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const updateTranscript = useCallback((text: string) => {
    setTranscript((prev) => (prev !== text ? text : prev));
  }, []);
  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        if (Platform.OS === "android") {
          console.log("isandroid");
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: "Microphone Permission",
              message: "App needs access to your microphone",
              buttonPositive: "OK",
            }
          );
          console.log(granted);
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } else {
          // iOS - use the correct method name
          const { status } = await Speech.requestPermissionAsync();
          setHasPermission(status === "granted");
        }
      } catch (err) {
        console.error("Permission error:", err);
        setHasPermission(false);
      }
    };
    requestMicrophonePermission();

    const setupRecognition = async () => {
      console.log("started recognition");
      try {
        onResultSubscription =
          Speech.ExpoSpeechRecognitionModuleEmitter.addListener(
            "onResult",
            (result: { value: string }) => {
              updateTranscript(result.value);
              if (result.value?.toLowerCase().includes("hello medicare")) {
                console.log("Trigger phrase detected!");
                // Handle your trigger action here
              }
            }
          );

        onErrorSubscription =
          Speech.ExpoSpeechRecognitionModuleEmitter.addListener(
            "onError",
            (error: any) => {
              console.error("Recognition error:", error);
              Alert.alert("Error", "Speech recognition failed");
            }
          );
      } catch (error) {
        console.error("Setup error:", error);
        setHasPermission(false);
      }
    };

    setupRecognition();
    return () => {
      onResultSubscription?.remove();
      onErrorSubscription?.remove();
      try {
        Speech.ExpoSpeechRecognitionModule.stop();
      } catch (err) {
        console.warn;
      }
    };
  }, [updateTranscript]);

  const toggleListening = async () => {
    if (!hasPermission) {
      Alert.alert(
        "Permission required",
        "Please enable microphone permissions in settings",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      if (isListening) {
        await Speech.ExpoSpeechRecognitionModule.stop();
        setIsListening(false);
      } else {
        setTranscript("");
        await Speech.ExpoSpeechRecognitionModule.start({
          language: "de-DE",
          continuous: true,
        });
        setIsListening(true);
      }
    } catch (error) {
      console.error("Recognition error:", error);
      Alert.alert("Error", "Failed to toggle listening");
    }
  };

  // Render states
  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Requesting microphone permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Microphone permission was denied</Text>
        <Button title="Request Again" onPress={() => setHasPermission(null)} />
      </View>
    );
  }
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "top",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            themeTextStyle,
            {
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            },
          ]}
        >
          Sprach Screen
        </Text>

        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title={isListening ? "Stop Listening" : "Start Listening"}
            onPress={toggleListening}
          />
        </View>
        <Text
          style={[
            themeTextStyle,
            {
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            },
          ]}
        >
          {isListening ? "Say something..." : transcript}
        </Text>
      </View>
    </View>
  );
}
