import { useLogin } from "@/hooks/LoginProvider";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PostsLayout() {
  const { isAuthenticated, logout } = useLogin();
  return (
    <Stack
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerBackTitle: "Zurück",
        headerStyle: { backgroundColor: "#082438" },
        headerTintColor: "#fe6b00",
        title: "Zurück",
        animation: "slide_from_right",
        headerRight: () =>
          isAuthenticated ? (
            <Pressable
              onPress={() => router.push({ pathname: "/(tabs)/profile" })}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="person-circle-outline" size={37} color="#FFF" />
            </Pressable>
          ) : null,
      })}
    />
  );
}
