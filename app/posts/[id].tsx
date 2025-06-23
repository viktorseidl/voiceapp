import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Post() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Details</Text>
      <Text style={{ fontSize: 18 }}>Formular: {id}</Text>
    </View>
  );
}
