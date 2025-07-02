import { styles } from "@/constants/Colors";
import { Link } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconRenderer from "../ui/IconsRenderer";
const numColumns = 4;
const screenWidth = Dimensions.get("window").width;

export default function FlatLister({ data }) {
  const CardComponent = ({ item, index }) => {
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
        <Pressable style={{ padding: 10, backgroundColor: "#141414" }}>
          <IconRenderer term={item.Leistungsbezeichnung} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              width: "100%",
              fontSize: 15,
              fontWeight: 600,
              flex: 0,
              flexDirection: "row",
              justifyContent: "center",
              overflow: "hidden",
              alignItems: "center",
              textAlign: "center",
              color: "#EEE",
              marginTop: 24,
            }}
          >
            {item.LeistungsTitel}
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
