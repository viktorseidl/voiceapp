import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
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
          return <FontAwesome5 name="medkit" size={50} color="black" />;
        case "Blutzucker":
          return <FontAwesome5 name="notes-medical" size={50} color="black" />;
        case "Kardio":
          return <FontAwesome6 name="notes-medical" size={50} color="black" />;
        case "Pulse":
          return (
            <FontAwesome6 name="hand-holding-medical" size={50} color="black" />
          );
        default:
          return <FontAwesome name="check-square-o" size={50} color="black" />;
      }
    };
    return (
      <Link
        key={item + index}
        style={{
          width: (screenWidth * 0.9) / 4, // 32 = total horizontal padding (8*4)
          aspectRatio: 1, // Square cards
          backgroundColor: "#05aff7",
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
          <Text>{item}</Text>
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
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
