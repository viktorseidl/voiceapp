import { styles } from "@/constants/Colors";
import { useLogin } from "@/hooks/LoginProvider";
import { useFetchAuthAll } from "@/hooks/useFetchAll";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useState } from "react";
import {
  Appearance,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import Feedheader from "./../../assets/images/feedheader.png";
import Bewohnerrow from "./Bewohnerrow";

// Define TypeScript interfaces
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
const Posts: React.FC = () => {
  const { isAuthenticated, wbereiche } = useLogin();
  console.log(wbereiche);
  const [bewohner, setBewohner] = useState<Bewohner[]>([]);
  const [selectedStation, setSelectedStation] = useState<string>("All");
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const filteredBewohner = useMemo(() => {
    if (selectedStation === "All") return bewohner;
    return bewohner.filter((b) => b.Station === selectedStation);
  }, [bewohner, selectedStation]);

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
      if (check != false) {
        setBewohner(check);
      }
    }
  };

  useEffect(() => {
    getAllBewohner();
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
            <MaterialIcons name="person" color={"#FFF"} size={34} />
            <Text style={{ fontSize: 30, color: "#FFF", fontWeight: 600 }}>
              Bewohner
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
              <View
                style={{
                  width: "70%",
                  marginBottom: 8,
                  backgroundColor: "#ebeef0",
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={selectedStation}
                  onValueChange={(itemValue) => setSelectedStation(itemValue)}
                  style={{ width: "90%", color: "#000", fontSize: 18 }}
                >
                  <Picker.Item key={"All"} label={"Alle"} value={"All"} />
                  {wbereiche !== null &&
                    JSON.parse(wbereiche).length > 0 &&
                    JSON.parse(wbereiche).map((item, index) => (
                      <Picker.Item
                        key={item + index}
                        label={item.Hausname + " " + item.Station}
                        value={item.Station}
                      />
                    ))}
                </Picker>
              </View>
              <Pressable
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 8,
                  borderRadius: 4,
                  marginLeft: 30,
                  backgroundColor: "#343434",
                  flex: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => router.push({ pathname: "/startbewohnercheck" })}
              >
                <FontAwesome name="microphone" color={"#FFF"} size={18} />
              </Pressable>
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
          <Bewohnerrow filteredBewohner={filteredBewohner} />
        </View>
      </View>
    </View>
  );
};
export default Posts;
