import {
  BuiltInKeyword,
  PorcupineManager,
} from "@picovoice/porcupine-react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WakeWordContextType = {
  listening: boolean;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  wakeWordDetected: boolean;
  resetWakeWordDetected: () => void;
};

/*
1. Install Porcupine (Wake-Word Engine)
npx expo install react-native-mmkv
npm install @picovoice/porcupine-react-native

2. Add Permissions app.json/app.config.js
"ios": {
  "infoPlist": {
    "NSMicrophoneUsageDescription": "This app uses the microphone to detect wake words."
  }
},
"android": {
  "permissions": ["RECORD_AUDIO"]
}
  4. Build App
  npx expo run:android
*/

const WakeWordContext = createContext<WakeWordContextType | undefined>(
  undefined
);

export const WakeWordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const porcupineRef = useRef<PorcupineManager | null>(null);
  const [listening, setListening] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);

  useEffect(() => {
    async function init() {
      porcupineRef.current = await PorcupineManager.fromBuiltInKeywords(
        [BuiltInKeyword.PICOVOICE], // or your custom keyword
        () => {
          console.log("Wake word detected!");
          setWakeWordDetected(true);
          stopListening();
        }
      );
      await startListening();
    }

    init();

    return () => {
      porcupineRef.current?.stop();
      porcupineRef.current?.delete();
    };
  }, []);

  const startListening = async () => {
    if (porcupineRef.current && !listening) {
      await porcupineRef.current.start();
      setListening(true);
      setWakeWordDetected(false);
    }
  };

  const stopListening = async () => {
    if (porcupineRef.current && listening) {
      await porcupineRef.current.stop();
      setListening(false);
    }
  };

  const resetWakeWordDetected = () => setWakeWordDetected(false);

  return (
    <WakeWordContext.Provider
      value={{
        listening,
        startListening,
        stopListening,
        wakeWordDetected,
        resetWakeWordDetected,
      }}
    >
      {children}
    </WakeWordContext.Provider>
  );
};

export const useWakeWord = (): WakeWordContextType => {
  const context = useContext(WakeWordContext);
  if (!context) {
    throw new Error("useWakeWord must be used within a WakeWordProvider");
  }
  return context;
};
