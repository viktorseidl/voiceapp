import { useLogin } from "@/hooks/LoginProvider";
import { useFetchAuthAll } from "@/hooks/useFetchAll";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SpeakAndWrite from "../ui/SpeakAndWrite";
import VoiceRecorder from "../ui/VoiceRecorder";
//https://github.com/riderodd/react-native-vosk

function Textscript(user: any, bewohner: string | null, reaction: any) {
  const obj = {
    BewohnerAuswahl: {
      s1:
        (user === null
          ? ""
          : JSON.parse(user).Mitarbeitername.split(" ")[0]
        ).toString() +
        "! Schön, dass ich Dir helfen darf! Ich bin dein MediBot-Sprachassistent. Ich sehe, Du möchtest einen Bewohner auswählen! Spreche Bitte nach dem Pieps-Ton, den Nachnamen des Bewohners ein.",
      s2:
        'Ich habe den Namen "' +
        (bewohner != null && typeof String
          ? bewohner.toString()
          : "Kein Name"
        ).toUpperCase() +
        "\" erkannt. Ist der Name richtig? Dann antworte nach dem Pieps-Ton mit 'JA', damit ich danach suchen kann oder mit 'Nein' für eine neue Suche.",
      s3:
        "Vielen Dank " +
        (user === null
          ? ""
          : JSON.parse(user).Mitarbeitername.split(" ")[0]
        ).toString() +
        "! Ich suche jetzt den Bewohner '" +
        (bewohner != null && typeof String
          ? bewohner.toString()
          : "Kein Name"
        ).toUpperCase() +
        "'...",
      s4: "Ich habe folgenden Bewohner mit dem Namen 'Uwe' in der Datenbank finden können. Wähle Bitte jetzt den entsprechenden Bewohner aus. Es hat mich sehr gefreut, Dir helfen zu können! Vielen Dank!",
    },
  };
  return obj;
}
interface Bewohner {
  ID: string;
  BewohnerNr: string;
  Anrede: string;
  Name: string;
  Vorname: string;
  Station: string;
  Znummer: string;
  Pflegestufe: string;
  IsBirthdayToday: string;
  Schwerbehindert: string;
  inkontinent: string;
}
function filterBewohnerByName(
  bewohnerList: Bewohner[],
  searchText: string | null
): Bewohner[] {
  if (searchText == null) return [];
  const text = searchText.trim().toLowerCase();

  return bewohnerList.filter(
    (b) =>
      b.Name.toLowerCase().includes(text.toString()) ||
      b.Vorname.toLowerCase().includes(text.toString())
  );
}
const StartBewohnerCheck: React.FC = () => {
  const [bewohner, setBewohner] = useState<Bewohner[]>([]);
  const [bewohnerResult, setBewohnerResult] = useState<Bewohner[]>([]);
  const [bewohnerListShow, setBewohnerListShow] = useState<boolean>(false);
  const [caseNumber, setcaseNumber] = useState<number>(0);
  const [speakCase, setSpeakCase] = useState<number>(0);
  const [speakShow, setSpeakShow] = useState<boolean>(false);
  const [speakText, setSpeakText] = useState<string>("");
  const [voiceShow, setVoiceShow] = useState<boolean>(false);
  const { user } = useLogin();

  const [bewohnerName, setBewohnerName] = useState<string | null>(null); //Bewohner Name Antwort

  const SkriptSteps = (num: number, txt: string) => {
    switch (num) {
      case 0: //WILLKOMMEN AUSGABE
        setSpeakCase(1);
        setSpeakText(Textscript(user, "", null).BewohnerAuswahl.s1);
        setSpeakShow(true);
        return;
      case 1: //BEWOHNER ABFRAGE
        setcaseNumber(2);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        return;
      case 2: //ERGEBNIS AUSGABE ERKENNUNG BEWOHNER
        setVoiceShow(false);
        console.log(txt);
        setBewohnerName(txt);
        setSpeakCase(3);
        setSpeakText(Textscript(user, txt, "").BewohnerAuswahl.s2.toString());
        setSpeakShow(true);
        return;
      case 3: //KONDITIONS ABFRAGE  OK | SUCHE NEUER BEWOHNER
        setcaseNumber(4);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        return;
      case 4: //ERGEBNIS PRÜFUNG KONDITIONS ABFRAGE
        console.log(num, txt);
        if (txt.trim().length > 0) {
          if (/^ja$/i.test(txt.toLowerCase())) {
            // KONDITION JA
            setVoiceShow(false);
            setSpeakCase(5);
            setSpeakText(
              Textscript(user, bewohnerName, "").BewohnerAuswahl.s3.toString()
            );
            setSpeakShow(true);
            setBewohnerResult(filterBewohnerByName(bewohner, bewohnerName));
          } else {
            // KONDITION NEIN SUCHE NEUER BEWOHNER
            SkriptSteps(6, "");
            console.log("hat nein gesangt");
          }
        }
        return;
      case 5: //ERGEBNIS AUSGABE DER SUCHE OK
        if (bewohnerResult.length > 1) {
          //Mehrere Bewohner gefunden Liste zur Auswahl
          setSpeakCase(7);
          setSpeakText(
            "Ich habe mehrere Bewohner mit den Namen " +
              bewohnerName +
              " gefunden. Bitte wähle den entsprechenden Bewohner in der Liste aus. Drücke mit deinem Finger auf den entsprechenden Bewohner. ".toString()
          );
        } else if (bewohnerResult.length == 1) {
          //Nur ein Bewohner gefunden
          setSpeakCase(8);
          setSpeakText(
            "Ich habe einen Bewohner mit den Namen " +
              bewohnerResult[0].Name +
              ", " +
              bewohnerResult[0].Vorname +
              " im Wohnbereich " +
              bewohnerResult[0].Station +
              " gefunden. Soll dieser ausgewählt werden dann antworte nach dem Pieps-Ton mit 'JA' oder mit 'NEIN' solltest Du nach einen anderen Namen suchen wollen. ".toString()
          );
        } else {
          //Kein bewohner gefunden
          setSpeakCase(9);
          setSpeakText(
            "Ich habe keinen Bewohner mit den Namen '" +
              bewohnerName?.toLocaleUpperCase() +
              "' finden können. Möchtest Du eine neue Suche starten? Dann antoworte nach dem  Pieps-Ton mit 'JA' oder mit 'NEIN' wenn Du zurück zur Bewohnerauswahl gelangen möchtest. ".toString()
          );
        }
        setSpeakShow(true);
        console.log(txt);
        return;
      case 6: //ERGEBNIS AUSGABE DER SUCHE NEUER BEWOHNER
        setVoiceShow(false);
        console.log(txt);
        setSpeakCase(1);
        setSpeakText(
          "Gebe nach dem Pieps-Ton den neuen Nachname des Bewohners ein nachdem du suchen möchtest."
        );
        setSpeakShow(true);

        return;
      case 7: //AUSGABE TEXT WENN MEHRERE BEWOHNER VORHANDEN
        console.log("jetzt den bewohner auswählen");
        setBewohnerListShow(true);
        return;
      case 8: //KONDITION ERGEBNIS ANNEHMEN NUR EIN BEWOHNER
        setcaseNumber(10);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        console.log("true");

        return;
      case 9: //AUSGABE WENN KEIN BEWOHNER VORHANDEN
        setcaseNumber(11);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        console.log("true");

        return;
      case 10: //BEWOHNERAUSWAHL BESTÄTIGEN
        setBewohnerListShow(false);
        if (txt.trim().length > 0) {
          if (/^ja$/i.test(txt.toLowerCase())) {
            // KONDITION JA
            setVoiceShow(false);
            setSpeakCase(10);
            setSpeakText(
              "Der Bewohner  '" +
                bewohnerResult[0].Name +
                ", " +
                bewohnerResult[0].Vorname +
                " im Wohnbereich " +
                bewohnerResult[0].Station +
                "' wurde ausgewählt! Bitte nenne mir jetzt welche Dokumentation Du anlegen möchtest.".toString()
            );
            setSpeakShow(true);
          } else {
            // KONDITION NEIN SUCHE NEUER BEWOHNER
            router.back();
            console.log("hat nein gesangt");
          }
        }
        return;
      case 11: //BEWOHNERAUSWAHL NEU STARTEN ODER ZURÜCK ZUR BEWOHNERLISTE
        setBewohnerListShow(false);
        if (txt.trim().length > 0) {
          if (/^ja$/i.test(txt.toLowerCase())) {
            // KONDITION JA
            setVoiceShow(false);
            SkriptSteps(6, "");
          } else {
            // KONDITION NEIN SUCHE NEUER BEWOHNER
            router.back();
            console.log("hat nein gesangt");
          }
        }
        return;
    }
  };
  const manalclick = (i: Bewohner) => {
    setBewohnerResult([i]);
    SkriptSteps(10, "ja");
  };
  const getAllBewohner = async () => {
    const network = await SecureStore.getItemAsync("network");
    if (network) {
      const check = await useFetchAuthAll(
        JSON.parse(network).server +
          "/electronbackend/index.php?path=getAllBewohnerList",
        "ssdsdsd",
        "GET",
        null,
        null
      );
      console.log(check);
      if (check != false) {
        setBewohner(check);
      }
    }
  };
  useEffect(() => {
    setBewohnerListShow(false);
    SkriptSteps(0, "");
    getAllBewohner();
  }, []);
  return (
    <View style={styles.container}>
      <SpeakAndWrite
        casenum={speakCase}
        show={speakShow}
        textParam={speakText}
        onComplete={SkriptSteps}
      />

      <VoiceRecorder
        casenum={caseNumber}
        show={voiceShow}
        onComplete={SkriptSteps}
      />
      {bewohnerListShow && bewohnerResult.length > 0 ? (
        <>
          {bewohnerResult.map((item, index) => (
            <Pressable
              onPress={() => manalclick(item)}
              style={{
                width: "100%",
                padding: 4,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 10,
                backgroundColor: "#FFFFFF",
              }}
              key={JSON.stringify(item) + index + "belistKey"}
            >
              <Text style={{ fontSize: 24, color: "#000" }}>
                {item.Name},{item.Vorname}
              </Text>
              <Text style={{ fontSize: 24, color: "#000" }}>
                Station {item.Station}
              </Text>
            </Pressable>
          ))}
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
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
