import { styles } from "@/constants/Colors";
import { Appearance, Dimensions, Text, View } from "react-native";

export default function Feed() {
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeTextStyle =
    colorScheme === "light"
      ? { color: "#04121c", size: 24 }
      : { color: "#788994", size: 24 };
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text>Feed Screen</Text>
    </View>
  );
}
