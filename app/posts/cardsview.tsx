import { styles } from "@/constants/Colors";
import { useFetchAuthAll } from "@/hooks/useFetchAll";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Appearance,
  Dimensions,
  ImageBackground,
  Text,
  View,
} from "react-native";
import ValidatedInput from "../ui/ValidatedInput";
import Feedheader from "./../../assets/images/feedheader.png";
import FlatLister from "./flatList";

interface Leistung {
  LeistungsID: string;
  Leistungsbezeichnung: string;
  LeistungsNummer: string;
  LeistungsTitel: string;
}

export default function CardsView() {
  const [leistungArray, setLeistungArray] = useState<Leistung[]>([]);
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeTextStyle =
    colorScheme === "light"
      ? { color: "#04121c", size: 24 }
      : { color: "#788994", size: 24 };
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const getAllLeistungen = async () => {
    const network = await SecureStore.getItemAsync("network");
    if (network) {
      const check = await useFetchAuthAll(
        JSON.parse(network).server +
          "/electronbackend/index.php?path=getFullLeistungskatalog",
        "ssdsdsd",
        "GET",
        null,
        null
      );
      console.log(check);
      if (check != false) {
        setLeistungArray(check);
      }
    }
  };
  useEffect(() => {
    getAllLeistungen();
  }, []);
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
          alignItems: "center",
        }}
      >
        <ImageBackground
          style={{
            position: "absolute",
            top: "0%",
            width: "100%",
            height: "95%",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          source={Feedheader}
        ></ImageBackground>
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
            <MaterialIcons name="edit-document" color={"#FFF"} size={34} />
            <Text style={{ fontSize: 30, color: "#FFF", fontWeight: 600 }}>
              Dokumentationen
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
                width: "100%",
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
                placeholder="Suche nach ..."
                keyboardType="default"
                required
                validator={""}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingTop: 8,
            flex: 0,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 18,
          }}
        >
          <FlatLister data={leistungArray} />
        </View>
      </View>
    </View>
  );
}
