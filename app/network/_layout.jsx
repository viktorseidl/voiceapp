import { Stack } from "expo-router";

export default function NetworkLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#082438" },
        animation: "slide_from_right",
      }}
    />
  );
}
