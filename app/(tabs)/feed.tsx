import { styles } from "@/constants/Colors";
import { useLogin } from "@/hooks/LoginProvider";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  Appearance,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import ValidatedInput from "../ui/ValidatedInput";
import Feedheader from "./../../assets/images/feedheader.png";
import MedHeaderImage from "./../../assets/images/medheader.png";
export default function Feed() {
  const { isAuthenticated } = useLogin();
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const test = [
    {
      titel: "Blutdruck",
      subtitel: "Bewohner: Karl Meist",
      description:
        "Der Blutdruck lag bei 128 mmHg systolisch, 87 mmHg diastolisch, Puls 88.",
      datumZeit: "23.06.2025 10:31",
      anwender: "HAE",
    },
    {
      titel: "Temperaturmessung",
      subtitel: "Bewohner: Anna Fuchs",
      description:
        "Die gemessene Körpertemperatur betrug 36,8 °C. Kein Fieber festgestellt.",
      datumZeit: "23.06.2025 08:15",
      anwender: "MLA",
    },
    {
      titel: "Medikamentengabe",
      subtitel: "Bewohner: Johann Klein",
      description:
        "Medikation gemäß Plan verabreicht: Ramipril 5 mg, einmal täglich, morgens.",
      datumZeit: "22.06.2025 09:00",
      anwender: "STH",
    },
    {
      titel: "Blutzuckermessung",
      subtitel: "Bewohner: Clara Huber",
      description:
        "Der Blutzuckerwert lag bei 142 mg/dl nüchtern. Kein Insulin erforderlich.",
      datumZeit: "22.06.2025 07:50",
      anwender: "HAE",
    },
    {
      titel: "Sturzprotokoll",
      subtitel: "Bewohner: Emil Werner",
      description:
        "Bewohner ist im Badezimmer gestürzt. Keine äußeren Verletzungen festgestellt.",
      datumZeit: "21.06.2025 18:42",
      anwender: "MLA",
    },
    {
      titel: "Essverhalten",
      subtitel: "Bewohner: Helga Sommer",
      description:
        "Frühstück wurde vollständig verzehrt. Appetit und Stimmung waren unauffällig.",
      datumZeit: "21.06.2025 08:20",
      anwender: "STH",
    },
    {
      titel: "Trinkverhalten",
      subtitel: "Bewohner: Marta König",
      description:
        "Heute wurden insgesamt 1,5 Liter Flüssigkeit aufgenommen. Keine Auffälligkeiten.",
      datumZeit: "23.06.2025 14:45",
      anwender: "HAE",
    },
    {
      titel: "Mobilität",
      subtitel: "Bewohner: Peter Schröder",
      description:
        "Bewohner konnte mit Rollator selbstständig das Zimmer verlassen. Gangbild stabil.",
      datumZeit: "23.06.2025 11:30",
      anwender: "MLA",
    },
    {
      titel: "Wundkontrolle",
      subtitel: "Bewohner: Irene Walter",
      description:
        "Wunde am rechten Unterschenkel zeigt gute Heilungstendenz. Kein Sekret, Rötung reduziert.",
      datumZeit: "22.06.2025 17:10",
      anwender: "STH",
    },
    {
      titel: "Hautbeobachtung",
      subtitel: "Bewohner: Gerhard Lang",
      description:
        "Keine neuen Hautveränderungen festgestellt. Haut trocken, keine Rötungen.",
      datumZeit: "22.06.2025 07:30",
      anwender: "HAE",
    },
    {
      titel: "Schlafverhalten",
      subtitel: "Bewohner: Sabine Kühn",
      description:
        "Bewohnerin schlief durch, kein nächtliches Aufwachen dokumentiert.",
      datumZeit: "21.06.2025 06:10",
      anwender: "MLA",
    },
    {
      titel: "Pflegemaßnahmen",
      subtitel: "Bewohner: Uwe Berger",
      description:
        "Körperpflege vollständig durchgeführt. Bewohner zeigte sich kooperativ.",
      datumZeit: "21.06.2025 09:25",
      anwender: "STH",
    },
  ];
  return (
    <View
      style={[
        {
          flex: 1,
          width: width,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        },
        themeContainerStyle,
      ]}
    >
      <View
        style={{
          flex: 1,
          width: "90%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <ImageBackground
          style={{
            position: "absolute",
            top: "5%",
            width: "100%",
            height: "95%",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          source={Feedheader}
        >
          <View
            style={{
              width: "100%",
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              borderBottomWidth: 3,
              borderBottomColor: "#FFFFFF77",
            }}
          >
            <View
              style={{
                width: "auto",
                flex: 0,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 15,
              }}
            >
              <FontAwesome name="feed" color={"#FFF"} size={34} />
              <Text style={{ fontSize: 30, color: "#FFF", fontWeight: 600 }}>
                Chronik
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                paddingTop: 12,
                flex: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "50%",
                  flex: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <ValidatedInput
                  label=""
                  value={""}
                  onChangeText={""}
                  placeholder="von"
                  keyboardType="default"
                  required
                  validator={""}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  flex: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <ValidatedInput
                  label=""
                  value={""}
                  onChangeText={""}
                  placeholder="bis"
                  keyboardType="default"
                  required
                  validator={""}
                />
              </View>
            </View>
          </View>
          <ScrollView
            style={{ width: "100%", paddingTop: 8, paddingHorizontal: 15 }}
            contentContainerStyle={{
              flex: 0,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 18,
            }}
          >
            {isAuthenticated && test.length > 0 ? (
              test.map((item, index) => (
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 15,
                      paddingTop: 10,
                      paddingBottom: 8,
                      paddingHorizontal: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "#FFFFFF77",
                    }}
                  >
                    <MaterialIcons name="feed" color={"#FFF"} size={22} />
                    <Text
                      style={{ fontSize: 18, color: "#FFF", fontWeight: 300 }}
                    >
                      {item.titel}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 15,
                      paddingTop: 10,
                      paddingBottom: 2,
                      paddingHorizontal: 15,
                    }}
                  >
                    <View
                      style={{
                        flex: 0,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <Feather
                        name="user"
                        color={styles.ThemeSubtitleText.color}
                        size={20}
                      />
                      <Text
                        style={{
                          fontFamily: "Arial",
                          fontSize: 16,
                          color: styles.ThemeSubtitleText.color,
                          fontWeight: 600,
                        }}
                      >
                        {item.subtitel}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: styles.ThemeDateTimeText.color,
                      }}
                    >
                      {item.datumZeit}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 15,
                      paddingVertical: 3,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Arial",
                        fontSize: 17,
                        flex: 0,
                        color: styles.ThemeDescriptionText.color,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 15,
                      paddingVertical: 0,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        flex: 0,
                        color: styles.ThemeUserNameText.color,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.anwender}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
                  Sie müssen angemeldet sein um den Verlauf einsehen zu können.
                </Text>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
        <Image
          style={{
            position: "absolute",
            bottom: 95,
            left: "25%",
            width: "50%",
            opacity: 0.5,
          }}
          resizeMode="contain"
          source={MedHeaderImage}
        ></Image>
      </View>
    </View>
  );
}
