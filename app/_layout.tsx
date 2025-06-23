import { LoginProvider } from "@/hooks/LoginProvider";
import { Stack } from "expo-router";
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
      </Stack>
    </LoginProvider>
  );
}
