import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Zurück",
        headerStyle: { backgroundColor: "#082438" },
        headerTintColor: "#fe6b00",
        title: "Zurück",
        animation: "slide_from_right",
      }}
    />
  );
}
