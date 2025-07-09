import * as Speech from "@jamsch/expo-speech-recognition";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PulsingCircle from "./PulsingCircle";
interface Params {
  show: boolean;
  casenum: number;
  onComplete: (num: number, txt: string) => void;
}
const VoiceRecorder: React.FC<Params> = ({ show, onComplete, casenum }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPulsing, setIsPulsing] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>("");
  const transcriptRef = useRef<string>("");
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const updateTranscript = useCallback((text: string) => {
    transcriptRef.current = text;
    setTranscript((prev) => (prev !== text ? text : prev));
  }, []);

  useEffect(() => {
    const prepare = async () => {
      const available =
        await Speech.ExpoSpeechRecognitionModule.getStateAsync();
      if (!available) {
        //console.warn("Speech recognition not available on this device.");
        return;
      }

      const granted =
        await Speech.ExpoSpeechRecognitionModule.getPermissionsAsync();
      if (!granted) {
        //console.warn("Microphone permission not granted.");
        return;
      }
      setPermissionGranted(true);
    };
    prepare();
    setIsPulsing(true);
    // Add event listeners
    const resultListener = Speech.addSpeechRecognitionListener(
      "result",
      (event) => {
        const transcript = event.results?.[0]?.transcript ?? "";
        console.log("AUF1: " + JSON.stringify(transcript));
        console.log("AUF1: " + JSON.stringify(event));
        console.log("AUF1: " + casenum);

        if (event.isFinal) {
          updateTranscript(transcript);
          onComplete(casenum, transcriptRef.current);
          stopRecognition();
        }
      }
    );

    const errorListener = Speech.addSpeechRecognitionListener(
      "error",
      (event) => {
        stopRecognition();
        //console.error("Speech recognition error:", event.error);
        onComplete(casenum, "Aufnahme abgelehnt");
        setIsPulsing(false);
        setIsListening(false);
      }
    );

    const endListener = Speech.addSpeechRecognitionListener("end", () => {
      //console.log("Recognition ended.");
      setIsPulsing(false);
      //stopRecognition();
    });

    //Clean up listeners
    return () => {
      resultListener.remove();
      errorListener.remove();
      endListener.remove();
    };
  }, [casenum, show]);

  const startRecognition = async () => {
    if (!permissionGranted) return;

    try {
      const a = await Speech.ExpoSpeechRecognitionModule.start({
        lang: "de-DE",
        continuous: false,
        interimResults: true,
      });
      console.log(a);
      setIsListening(true);
    } catch (err) {
      //console.error("Error starting speech recognition:", err);
    }
  };

  const stopRecognition = async () => {
    try {
      await Speech.ExpoSpeechRecognitionModule.stop();
      setIsListening(false);
      setIsPulsing(false);
    } catch (err) {
      //console.error("Error stopping speech recognition:", err);
    }
  };
  const pauseRecognition = async () => {
    try {
      await Speech.ExpoSpeechRecognitionModule.stop();
    } catch (err) {
      //console.error("Error stopping speech recognition:", err);
    }
  };
  const resumeRecognition = async () => {
    try {
      const a = await Speech.ExpoSpeechRecognitionModule.start({
        lang: "de-DE",
        continuous: false,
        interimResults: true,
      });
    } catch (err) {
      //console.error("Error starting speech recognition:", err);
    }
  };
  return show ? (
    <View style={styles.container}>
      {show && isPulsing ? (
        <PulsingCircle
          casenum={casenum}
          show={true}
          onAction={startRecognition}
        />
      ) : (
        ""
      )}
    </View>
  ) : (
    ""
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
  },
  transcript: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 20,
  },
});
export default VoiceRecorder;
