import { styles } from "@/constants/Colors";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  Appearance,
  Dimensions,
  ImageBackground,
  Text,
  View,
} from "react-native";
import Feedheader from "./../../assets/images/feedheader.png";
export default function Post() {
  const { id } = useLocalSearchParams();
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeTextStyle =
    colorScheme === "light"
      ? { color: "#04121c", size: 24 }
      : { color: "#788994", size: 24 };
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const IconManager = ({ i }) => {
    switch (i) {
      case "Blutdruck":
        return <FontAwesome5 name="medkit" color={"#FFF"} size={34} />;
      case "Blutzucker":
        return <Fontisto name="blood-drop" color={"#FFF"} size={34} />;
      case "Blutabnahme":
        return <Fontisto name="blood-test" color={"#FFF"} size={34} />;
      case "Essverhalten":
        return <MaterialIcons name="fastfood" color={"#FFF"} size={34} />;
      case "Kardio":
        return <Fontisto name="pulse" color={"#FFF"} size={34} />;
      case "Wundkontrolle":
        return <FontAwesome5 name="laptop-medical" color={"#FFF"} size={34} />;
      case "Temperaturmessung":
        return (
          <FontAwesome6 name="temperature-half" color={"#FFF"} size={34} />
        );
      case "Pulse":
        return <Octicons name="pulse" color={"#FFF"} size={34} />;
      case "Mobilität":
        return <FontAwesome5 name="wheelchair" color={"#FFF"} size={34} />;
      case "Schlafverhalten":
        return <MaterialCommunityIcons name="sleep" color={"#FFF"} size={34} />;
      case "Hauptbeobachtung":
        return <FontAwesome name="search" color={"#FFF"} size={34} />;
      default:
        return <FontAwesome name="check-square-o" color={"#FFF"} size={34} />;
    }
  };
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
              paddingVertical: 10,
            }}
          >
            <IconManager i={id} />
            <Text style={{ fontSize: 30, color: "#FFF", fontWeight: 600 }}>
              {id}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              paddingTop: 12,
              flex: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          ></View>
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
          <Text style={{ fontSize: 24 }}>Details</Text>
          <Text style={{ fontSize: 18 }}>Formular: {id}</Text>
        </View>
      </View>
    </View>
  );
}
