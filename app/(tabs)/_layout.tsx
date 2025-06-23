import { useLogin } from "@/hooks/LoginProvider";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { Appearance } from "react-native";

export default function TabLayout() {
  const { isAuthenticated } = useLogin();
  const colorScheme = Appearance.getColorScheme();
  const themeContainerStyle = {
    backgroundColor: colorScheme === "light" ? "#082438" : "#082438",
  };
  const themeTextColors = {
    active: colorScheme === "light" ? "#71f0d2" : "#71f0d2",
    inactive: colorScheme === "light" ? "#71c5f0" : "#71c5f0",
  };
  useEffect(() => {}, [isAuthenticated]);
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: themeContainerStyle,
        tabBarActiveTintColor: themeTextColors.active,
        tabBarInactiveTintColor: themeTextColors.inactive,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Start",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
          title: "Verlauf",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" color={color} size={24} />
          ),
        }}
      />
      {!isAuthenticated ? (
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Anmelden",
            tabBarIcon: ({ color }) => (
              <Entypo name="login" color={color} size={24} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push("/(modals)/login");
            },
          }}
        />
      ) : (
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Entypo name="user" color={color} size={24} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}
