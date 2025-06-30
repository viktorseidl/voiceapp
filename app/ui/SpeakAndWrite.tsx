import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
interface Params {
  show: boolean;
  textParam: string;
  casenum: number;
  onComplete: (num: number, txt: string) => void; //callback when done if needed
}
const SpeakAndWrite: React.FC<Params> = ({
  textParam,
  onComplete,
  show,
  casenum,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [typingDone, setTypingDone] = useState<boolean>(false);
  const [speakingDone, setSpeakingDone] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      Speech.stop();
    };
  }, []);
  const checkIfComplete = () => {
    if (typingDone && speakingDone && onComplete) {
      onComplete(casenum, ""); // Notify parent
    }
  };
  useEffect(() => {
    checkIfComplete();
  }, [typingDone, speakingDone]);
  useEffect(() => {
    if (!show || !textParam) {
      Speech.stop();
      return;
    }

    setTypingDone(false);
    setSpeakingDone(false);

    // Clear text first, then type
    setDisplayedText("");
  }, [textParam, show]);
  useEffect(() => {
    if (show && textParam && displayedText === "") {
      // Start typing
      let index = 0;
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => {
          const next = prev + textParam.charAt(index);
          index++;
          if (index >= textParam.length && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setTypingDone(true);
          }
          return next;
        });
      }, 45);

      // Start speaking
      Speech.speak(textParam, {
        onDone: () => {
          setSpeakingDone(true);
        },
        language: "de-DE",
        voice: "de-de-x-deb-local",
        rate: 1.2,
      });
    }
  }, [displayedText, show, textParam]);

  // Watch both completion states

  return show ? (
    <View>
      <Text
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          fontSize: 24,
          color: "#FFF",
          marginBottom: 10,
        }}
      >
        {displayedText}
      </Text>
    </View>
  ) : (
    ""
  );
};

export default SpeakAndWrite;
