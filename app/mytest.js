import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
// Achtung: Dieses Beispiel nutzt keine echte Speech-to-Text-Integration,
// sondern simuliert die Erkennung. Für echte Nutzung siehe unten.

export default function BlutdruckFormular() {
  const [input, setInput] = useState("");
  const [obererWert, setObererWert] = useState("");
  const [untererWert, setUntererWert] = useState("");
  const [auswertung, setAuswertung] = useState("");

  const handleSpeechResult = (spokenText) => {
    setInput(spokenText);

    const match = spokenText.match(
      /(\d{2,3})\s*(zu|und|\/|minus)?\s*(\d{2,3})/
    );
    if (match) {
      setObererWert(match[1]);
      setUntererWert(match[3]);
    }

    if (/ok|normal|in ordnung|geht|passable/i.test(spokenText)) {
      setAuswertung("OK");
    } else if (
      /hoch|kritisch|niedrig|schlecht|nicht gut|explodiert/i.test(spokenText)
    ) {
      setAuswertung("Abweichung");
    }

    if (/speichern|weiter/i.test(spokenText)) {
      handleSave();
    }
  };

  const handleRecord = async () => {
    const result = await startFakeSpeechToText();
    handleSpeechResult(result);
  };

  const handleSave = () => {
    Alert.alert(
      "Gespeichert",
      `Oberer Wert: ${obererWert}\nUnterer Wert: ${untererWert}\nAuswertung: ${auswertung}`
    );
    // Hier könnte ein POST an die PHP API erfolgen
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="🎤 Spracheingabe starten" onPress={handleRecord} />

      <TextInput
        placeholder="Oberer Wert"
        value={obererWert}
        onChangeText={setObererWert}
        style={styles.input}
      />
      <TextInput
        placeholder="Unterer Wert"
        value={untererWert}
        onChangeText={setUntererWert}
        style={styles.input}
      />
      <TextInput
        placeholder="Auswertung"
        value={auswertung}
        onChangeText={setAuswertung}
        style={styles.input}
      />

      <Button title="Speichern" onPress={handleSave} />
      <Text style={{ marginTop: 20, fontStyle: "italic" }}>{input}</Text>
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
};

// Diese Funktion simuliert erkannte Sprache
const startFakeSpeechToText = async () => {
  return Promise.resolve(
    "der Blutdruck ist 142 zu 84. Der Blutdruck geht. Weiter"
  );
};
