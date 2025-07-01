import { useLogin } from "@/hooks/LoginProvider";
import { useBewohnerMatcher } from "@/hooks/useBewohner";
import { useDokumentationenMatcher } from "@/hooks/useDokumentationen";
import { useFetchAuthAll } from "@/hooks/useFetchAll";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
        "! Ich bin dein MediBot-Sprachassistent. Spreche Bitte nach dem Aufnahme-Ton, den Nachnamen und den Vornamen des Bewohners ein.",
      s2:
        bewohner != null && typeof String
          ? 'Ich habe den Namen "' +
            bewohner.toString().toUpperCase() +
            '" erkannt. Ist der Name richtig?'
          : "Ich konnte kein Namen erkennen. Bitte versuche es erneut!",
      s3:
        "Der Bewohner '" +
        (bewohner != null && typeof String
          ? bewohner.toString()
          : "Kein Name"
        ).toUpperCase() +
        "' wird gesucht ...",
      s4:
        "Ich habe mehrere Bewohner mit den Namen '" +
        (bewohner != null && typeof String
          ? bewohner.toString()
          : "Kein Name"
        ).toUpperCase() +
        "' gefunden. Bitte wähle den entsprechenden Bewohner in der Liste aus.".toString(),
    },
  };
  return obj;
}
interface Docus {
  bezeichnung: string;
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
  if (!searchText) return [];
  if (
    searchText.trim().toLowerCase() == "alle anzeigen" ||
    searchText.trim().toLowerCase() == "zurück" ||
    searchText.trim().toLowerCase() == "beenden"
  )
    return [];

  const text = searchText.trim().toLowerCase();

  // split search text by space(s)
  const parts = text.split(/\s+/);

  // exact full name matches (two orders, with or without comma)
  const exactMatches = bewohnerList.filter((b) => {
    const name = b.Name.toLowerCase();
    const vorname = b.Vorname.toLowerCase();

    const fullName1 = `${name} ${vorname}`; // Name Vorname
    const fullName2 = `${name}, ${vorname}`; // Name, Vorname
    const fullName3 = `${vorname} ${name}`; // Vorname Name
    const fullName4 = `${vorname}, ${name}`; // Vorname, Name

    return (
      fullName1 === text ||
      fullName2 === text ||
      fullName3 === text ||
      fullName4 === text
    );
  });

  if (exactMatches.length > 0) {
    // If exact matches found, return immediately
    return exactMatches;
  }

  // If no exact full name matches, do a partial match on name or vorname parts
  return bewohnerList.filter((b) => {
    const name = b.Name.toLowerCase();
    const vorname = b.Vorname.toLowerCase();

    // Check if all parts of searchText appear in either name or vorname (partial match)
    return parts.every((part) => name.includes(part) || vorname.includes(part));
  });
}
const StartBewohnerCheck: React.FC = () => {
  const [bewohner, setBewohner] = useState<Bewohner[]>([]);
  const [docuList, setDocuList] = useState<Docus[]>([
    { bezeichnung: "Blutzucker" },
    { bezeichnung: "Blutdruck" },
    { bezeichnung: "Mobilitätsfaktor" },
    { bezeichnung: "Temperatur" },
    { bezeichnung: "DekubitusProphylaxe" },
  ]);
  const [bewohnerResult, setBewohnerResult] = useState<Bewohner[]>([]);
  const [bewohnerListShow, setBewohnerListShow] = useState<boolean>(false);
  const [caseNumber, setcaseNumber] = useState<number>(0);
  const [speakCase, setSpeakCase] = useState<number>(0);
  const [speakShow, setSpeakShow] = useState<boolean>(false);
  const [speakText, setSpeakText] = useState<string>("");
  const [voiceShow, setVoiceShow] = useState<boolean>(false);
  const { user } = useLogin();
  const { matchBewohner } = useBewohnerMatcher(bewohner);
  const { matchDoku } = useDokumentationenMatcher(docuList);

  const [bewohnerName, setBewohnerName] = useState<string | null>(null); //Bewohner Name Antwort
  const [docuName, setDocuName] = useState<string | null>(null); //Bewohner Name Antwort

  const SkriptSteps = (num: number, txt: string) => {
    switch (num) {
      case 0: //WILLKOMMEN AUSGABE (INTRO MEDIBOT SPRACH-ASSISTENT)
        setSpeakCase(1);
        setSpeakText(Textscript(user, "", null).BewohnerAuswahl.s1);
        setSpeakShow(true);
        return;
      case 1: //BEWOHNER ABFRAGE (GEBE NACHNAME UND VORNAME DES BEWOHNER AN)
        setcaseNumber(2);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        return;
      case 2: //ERGEBNIS AUSWERTUNG BEWOHNER NACHNAME + VORNAME
        setVoiceShow(false);
        if (
          typeof txt == "string" &&
          txt.trim().toLowerCase() == "aufnahme abgelehnt"
        ) {
          setSpeakCase(6);
          setSpeakText("Es wurde keine Aufnahme erkannt.");
          setSpeakShow(true);
        } else {
          const match = matchBewohner(txt);
          if (
            typeof match == "string" &&
            match.trim().toLowerCase() == "beenden"
          ) {
            router.back();
            return;
          }
          match !== null && typeof match !== "string"
            ? setBewohnerName(
                match !== null && typeof match !== "string"
                  ? match?.Name + " " + match?.Vorname
                  : match
              )
            : txt;
          setSpeakCase(3);
          setSpeakText(
            Textscript(
              user,
              match !== null && typeof match !== "string"
                ? match?.Name + ", " + match?.Vorname
                : match,
              ""
            ).BewohnerAuswahl.s2.toString()
          );
          setSpeakShow(true);
        }
        return;
      case 3: //BEWOHNER WURDE ERKANNT ABFRAGE ÜBERNEHMEN ODER NEUE SUCHE
        setcaseNumber(4);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        return;
      case 4: //ERGEBNIS AUSWERTUNG BEWOHNER ÜBERNEHMEN ODER NEUE SUCHE
        setVoiceShow(false);
        console.log(txt);
        if (
          typeof txt == "string" &&
          (txt.trim().toLowerCase() == "beenden" ||
            txt.trim().toLowerCase() == "zurück" ||
            txt.trim().toLowerCase() == "alle anzeigen")
        ) {
          router.back();
          return;
        } else if (
          typeof txt == "string" &&
          txt.trim().toLowerCase() == "aufnahme abgelehnt"
        ) {
          setSpeakCase(3);
          setSpeakText("Leider habe ich Ihre Antwort nicht verstanden.");
          setSpeakShow(true);
        } else {
          if (txt.trim().length > 0) {
            if (/^ja$/i.test(txt.toLowerCase())) {
              // KONDITION JA
              setSpeakCase(5);
              setSpeakText(
                Textscript(user, bewohnerName, "").BewohnerAuswahl.s3.toString()
              );
              setSpeakShow(true);
              const resarr = filterBewohnerByName(bewohner, bewohnerName);
              setBewohnerResult(resarr);
            } else {
              // KONDITION NEIN SUCHE NEUEN BEWOHNER
              SkriptSteps(6, "");
            }
          }
        }
        return;
      case 5: //PRÜFE ANZAHL AN ERGEBNISSE
        if (bewohnerResult.length > 1) {
          //MEHRERE ABBRUCH ZUR LISTENAUSWAHL
          //Mehrere Bewohner gefunden Liste zur Auswahl
          setSpeakCase(7);
          setSpeakText(
            Textscript(user, bewohnerName, "").BewohnerAuswahl.s4.toString()
          );
        } else if (bewohnerResult.length == 1) {
          //EINZIGER BEWOHNER WIRD AUSGEWÄHLT
          //Nur ein Bewohner gefunden
          setSpeakCase(11);
          setSpeakText(
            "Der Bewohner  '" +
              bewohnerResult[0].Name +
              ", " +
              bewohnerResult[0].Vorname +
              " im Wohnbereich " +
              bewohnerResult[0].Station +
              "' wurde ausgewählt! Bitte nenne mir jetzt welche Dokumentation Du anlegen möchtest.".toString()
          );
        } else {
          //KEIN BEWOHNER GEFUNDEN
          setSpeakCase(9);
          setSpeakText(
            "Ich habe keinen Bewohner mit den Namen '" +
              bewohnerName?.toLocaleUpperCase() +
              "' finden können. Möchtest Du erneut suchen?".toString()
          );
        }
        setSpeakShow(true);
        return;
      case 6: //NEUE ABFRAGE NAME BEWOHNER
        setVoiceShow(false);
        console.log(txt);
        setSpeakCase(1);
        setSpeakText(
          "Gebe nach dem Aufnahme-Ton, den Nachnamen und Vornamen des Bewohners ein"
        );
        setSpeakShow(true);

        return;
      case 7: //AUSGABE WENN MEHRERE BEWOHNER EXISTIEREN
        router.back();
        return;
      case 8: //EXACTER BEWOHNER GEFUNDEN BEENDE
        console.log("ende case start dokumentation final");
        return;
      case 9: //AUSGABE WENN KEIN BEWOHNER VORHANDEN
        setcaseNumber(10);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        console.log("true");
        return;
      case 10: //BEWOHNERAUSWAHL BESTÄTIGEN
        if (
          typeof txt == "string" &&
          (txt.trim().toLowerCase() == "beenden" ||
            txt.trim().toLowerCase() == "zurück" ||
            txt.trim().toLowerCase() == "alle anzeigen")
        ) {
          router.back();
          return;
        } else if (
          typeof txt == "string" &&
          txt.trim().toLowerCase() == "aufnahme abgelehnt"
        ) {
          setSpeakCase(9);
          setSpeakText("Leider habe ich Ihre Antwort nicht verstanden.");
          setSpeakShow(true);
        } else {
          if (txt.trim().length > 0) {
            if (/^ja$/i.test(txt.toLowerCase())) {
              // KONDITION JA
              setVoiceShow(false);
              SkriptSteps(6, "");
            } else {
              // KONDITION NEIN SUCHE NEUER BEWOHNER
              router.back();
            }
          }
        }
        return;
      case 11: //BEWOHNERAUSWAHL NEU STARTEN ODER ZURÜCK ZUR BEWOHNERLISTE
        setcaseNumber(12);
        setSpeakShow(false);
        setSpeakText("");
        setVoiceShow(true);
        return;
      case 12: //LISTEN FOR DOKUMENTATION
        setVoiceShow(false);
        if (
          typeof txt == "string" &&
          (txt.trim().toLowerCase() == "beenden" ||
            txt.trim().toLowerCase() == "zurück" ||
            txt.trim().toLowerCase() == "alle anzeigen")
        ) {
          router.back();
          return;
        } else if (
          typeof txt == "string" &&
          txt.trim().toLowerCase() == "aufnahme abgelehnt"
        ) {
          setSpeakCase(11);
          setSpeakText("Leider habe ich Ihre Antwort nicht verstanden.");
          setSpeakShow(true);
        } else {
          const matchd = matchDoku(txt);
          matchd !== null && typeof matchd !== "string"
            ? setSpeakCase(8)
            : setSpeakCase(11);
          matchd !== null && typeof matchd !== "string"
            ? setDocuName(
                matchd !== null && typeof matchd !== "string"
                  ? matchd?.bezeichnung
                  : null
              )
            : SkriptSteps(11, "");
          setSpeakText(
            "Die Dokumentation '" +
              (matchd !== null && typeof matchd !== "string"
                ? matchd?.bezeichnung
                : "keine ausgewählt") +
              "' wurde ausgewählt! Einen Moment bitte, ...".toString()
          );
          setSpeakShow(true);
        }
        return;
      case 13: //MATCH DOKUMENTATION AND REDIRECT
        return;
    }
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
        <ScrollView
          style={{
            width: "100%",
            padding: 4,
            flexDirection: "column",

            gap: 5,
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {bewohnerResult.map((item, index) => (
            <Pressable
              onPress={() => SkriptSteps(2, item.Name + " " + item.Vorname)}
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
        </ScrollView>
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
