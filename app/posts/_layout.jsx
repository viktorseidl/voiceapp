import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Zurück",
        headerStyle: { backgroundColor: "#082438" },
        headerTintColor: "#71f0d2",
        title: "Zurück",
        animation: "slide_from_right",
      }}
    />
  );
}
