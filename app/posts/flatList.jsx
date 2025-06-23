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
import { Link } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
const numColumns = 4;
const screenWidth = Dimensions.get("window").width;

export default function FlatLister({ data }) {
  const CardComponent = ({ item, index }) => {
    const IconManager = ({ i }) => {
      switch (i) {
        case "Blutdruck":
          return (
            <FontAwesome5
              name="medkit"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Blutzucker":
          return (
            <Fontisto
              name="blood-drop"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Blutabnahme":
          return (
            <Fontisto
              name="blood-test"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Essverhalten":
          return (
            <MaterialIcons
              name="fastfood"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Kardio":
          return (
            <Fontisto
              name="pulse"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Wundkontrolle":
          return (
            <FontAwesome5
              name="laptop-medical"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Temperaturmessung":
          return (
            <FontAwesome6
              name="temperature-half"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Pulse":
          return (
            <Octicons
              name="pulse"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Mobilität":
          return (
            <FontAwesome5
              name="wheelchair"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Schlafverhalten":
          return (
            <MaterialCommunityIcons
              name="sleep"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        case "Hauptbeobachtung":
          return (
            <FontAwesome
              name="search"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
        default:
          return (
            <FontAwesome
              name="check-square-o"
              size={50}
              color={styles.ThemeIconsDocumentation.color}
            />
          );
      }
    };
    return (
      <Link
        key={item + index}
        style={{
          width: (screenWidth * 0.8) / 4, // 32 = total horizontal padding (8*4)
          aspectRatio: 1, // Square cards
          backgroundColor: styles.ThemeTitleText.color,
          margin: 4,
          flex: 0,
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 4,
          // Add other card styles
        }}
        href={{ pathname: `/posts/${item}` }}
        asChild
      >
        <Pressable style={{ padding: 10 }}>
          <IconManager i={item} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#6c88a1",
            }}
          >
            {item}
          </Text>
        </Pressable>
      </Link>
    );
  };
  return (
    <View
      style={{
        flex: 0,
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        width: screenWidth * 0.95,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CardComponent item={item} index={index} />
        )}
        numColumns={numColumns}
        columnWrapperStyle={stylesFlat.row}
        contentContainerStyle={stylesFlat.container}
      />
    </View>
  );
}

const stylesFlat = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
