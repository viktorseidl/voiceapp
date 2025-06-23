import { styles } from "@/constants/Colors";
import { Appearance, Dimensions, Text, View } from "react-native";
import FlatLister from "./flatList";

export default function Posts() {
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeTextStyle =
    colorScheme === "light"
      ? { color: "#04121c", size: 24 }
      : { color: "#788994", size: 24 };
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  return (
    <View
      style={[
        themeContainerStyle,
        {
          width: width,
          flex: 1,
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "center",
        },
      ]}
    >
      <Text
        style={[
          {
            color: "#ccc",
            paddingVertical: 30,
            paddingLeft: 30,
            width: width,
            textAlign: "left",
            fontSize: 24,
          },
        ]}
      >
        Documentation auswählen
      </Text>
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <FlatLister
          data={[
            "Blutdruck",
            "Blutzucker",
            "Pulse",
            "Blutdruck",
            "Kardio",
            "Blutzucker",
            "Blutdruck",
            "Kardio",
            "Blutzucker",
            "Pulse",
            22,
            "Kardio",
            41,
            25,
            77,
            95,
            144,
            442,
            443,
            444,
          ]}
        />
      </View>
      {/*[1, 2, 3].map((id) => ({
        
      }))*/}
    </View>
  );
}
