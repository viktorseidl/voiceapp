import { useLogin } from "@/hooks/LoginProvider";
import { ExpoSpeechRecognitionModule } from "@jamsch/expo-speech-recognition";
import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface TypewriterProps {
  text: string;
  speed?: number; // in milliseconds per letter
}

const StartBewohnerCheck: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [recognizing, setRecognizing] = useState(true);
  const [transcript, setTranscript] = useState("");
  const { user } = useLogin();

  SpeechB.useSpeechRecognitionEvent("start", () => setRecognizing(true));
  SpeechB.useSpeechRecognitionEvent("end", () => setRecognizing(false));
  SpeechB.useSpeechRecognitionEvent("result", (event) => {
    console.log(event);
    // setTranscript(event.results[0].transcript);
  });
  SpeechB.useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });
  const startRecording = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Mikrofon Zugriffsrecht",
            message: "Die App benötigt Zugriff auf Ihr Mikrofon",
            buttonPositive: "OK",
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      }
      const onResultSubscription = SpeechB.addSpeechRecognitionListener(
        "result",
        (result) => {
          console.log("Result:", result);
        }
      );
    } finally {
    }
  };
  const handleStartBewohner = () => {
    ExpoSpeechRecognitionModule.requestPermissionsAsync().then((result) => {
      if (!result.granted) {
        console.warn("Permissions not granted", result);
        return;
      }
      // Start speech recognition
      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        requiresOnDeviceRecognition: false,
        addsPunctuation: false,
        contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
      });
    });
  };
  const startTyping = (fullText: string, speed: number = 45) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText("");
    let index = 0;

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, speed);
  };
  const speak1 = () => {
    const thingToSay =
      " Hallo " +
      (user === null ? "" : JSON.parse(user).Mitarbeitername.split(" ")[0]) +
      "! Schön, dass ich Dir helfen darf!";
    const thingToSay2 = "Ich bin dein MediBot-Sprachassistent.";
    const thingToSay3 =
      "Ich sehe, Du möchtest einen Bewohner auswählen! Bitte drücke den nachfolgenden Knopf und Spreche dann den Nachnamen des Bewohners ein.";
    startTyping(thingToSay + " " + thingToSay2 + " " + thingToSay3);
    Speech.speak(thingToSay, {
      language: "de-DE",
      voice: "de-de-x-deb-local", //de-de-x-deb-local ss
      rate: 1.1,
    });
    Speech.speak(thingToSay2, {
      language: "de-DE",
      voice: "de-de-x-deb-local",
    });
    Speech.speak(thingToSay3, {
      language: "de-DE",
      voice: "de-de-x-deb-local",
    });
  };
  const speak2 = () => {
    const thingToSay = "Ich habe den Namen 'Uwe' erkannt.";
    const thingToSay2 = "Ist der Name richtig?";
    const thingToSay3 =
      "Dann antworte mit 'JA', damit ich jetzt danach suchen kann. Oder antworte mit 'Nein' für einen neuen Versuch";
    Speech.speak(thingToSay, { language: "de-DE", voice: "de-de-x-deb-local" });
    Speech.speak(thingToSay2, {
      language: "de-DE",
      voice: "de-de-x-deb-local",
    });
    Speech.speak(thingToSay3, {
      language: "de-DE",
      voice: "de-de-x-deb-local",
    });
  };
  const speak3 = () => {
    const thingToSay =
      "Ich habe folgende Bewohner mit dem Namen 'Uwe' in der Datenbank finden können.";
    const thingToSay2 = "Wähle Bitte jetzt den entsprechenden Bewohner aus.";
    const thingToSay3 =
      "Es hat mich sehr gefreut, Dir helfen zu können! Vielen Dank!";
    Speech.speak(thingToSay, { language: "de-DE", voice: "de-de-x-deb-local" });
    Speech.speak(thingToSay2, {
      language: "de-DE",
      voice: "de-de-x-deb-local",
    });
    Speech.speak(thingToSay3, {
      language: "de-DE",
      voice: "de-de-x-deb-local",
    });
  };
  useEffect(() => {
    speak1();
    async function listVoices() {
      const voices = await Speech.getAvailableVoicesAsync();
      //console.log("Available voices:", voices);
      return voices;
    } //sds
    listVoices();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { flexWrap: "wrap", fontSize: 24 }]}>
        {displayedText}
      </Text>
      <Button title="Start" onPress={startRecording} />
      {recognizing ? (
        <Button title="Start" onPress={handleStartBewohner} />
      ) : (
        <Button title="Stop" onPress={ExpoSpeechRecognitionModule.stop} />
      )}
      <Button title="Press to hear some words" onPress={speak1} />
      <Text style={styles.heading}>Live Speech Input:</Text>
      <Button title="Press to hear some words" onPress={speak2} />
      <Button title="Press to hear some words" onPress={speak3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 20,
    color: "#ccc",
    marginBottom: 10,
  },
  transcript: {
    fontSize: 22,
    color: "#fff",
  },
});

export default StartBewohnerCheck;
