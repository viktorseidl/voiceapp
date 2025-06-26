import { LoginProvider } from "@/hooks/LoginProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";
export default function RootLayout() {
  return (
    <LoginProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: "modal",
            headerTitle: "Sign In",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="(modals)/networkupdate"
          options={{
            presentation: "modal",
            headerTitle: "Update Network Konfiguration",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="(modals)/startbewohnercheck"
          options={{
            headerShown: true,
            headerBackTitle: "Zurück",
            headerStyle: { backgroundColor: "#082438" },
            headerTintColor: "#fe6b00",
            presentation: "modal",
            headerTitle: "Zurück",
            animation: "slide_from_bottom",
            headerRight: () => (
              <Pressable
                style={{
                  marginRight: 15,
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFF", fontSize: 26, marginRight: 15 }}>
                  MediBot-Sprachassistent
                </Text>
                <FontAwesome5 name="robot" size={37} color="#FFF" />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </LoginProvider>
  );
}
