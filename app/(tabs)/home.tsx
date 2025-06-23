import { styles } from "@/constants/Colors";
import { useLogin } from "@/hooks/LoginProvider";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Appearance,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";

export default function Home() {
  const { isAuthenticated } = useLogin();
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
      <View
        style={{
          width: "100%",
          flex: 0,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <ImageBackground
          style={{
            backgroundColor: "#143852",
            width: width * 0.9,
            aspectRatio: 1,
          }}
          source={require("./../../assets/images/splashbg.png")}
          resizeMode="contain"
        ></ImageBackground>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Pressable
          onPress={() => router.push({ pathname: "/posts" })}
          style={{
            padding: 20,
            backgroundColor: "#1ae8aa",
            borderRadius: 5,
            flex: 0,
            flexDirection: "row",
          }}
        >
          <FontAwesome6
            name="user-doctor"
            color={themeTextStyle.color}
            size={themeTextStyle.size}
          />
          <Text style={[styles.lightStandardText, { marginLeft: 15 }]}>
            Dokumentation
          </Text>
        </Pressable>
        {isAuthenticated ? (
          <Pressable
            onPress={() => router.push({ pathname: "/(modals)/login" })}
            style={{
              padding: 20,
              backgroundColor: "#2bdce3",
              marginTop: 20,
              borderRadius: 5,
              flex: 0,
              flexDirection: "row",
            }}
          >
            <Entypo
              name="login"
              color={themeTextStyle.color}
              size={themeTextStyle.size}
            />
            <Text style={[styles.lightStandardText, { marginLeft: 15 }]}>
              Abmelden
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => router.push({ pathname: "/(modals)/login" })}
            style={{
              padding: 20,
              backgroundColor: "#2bdce3",
              marginTop: 20,
              borderRadius: 5,
              flex: 0,
              flexDirection: "row",
            }}
          >
            <Entypo
              name="login"
              color={themeTextStyle.color}
              size={themeTextStyle.size}
            />
            <Text style={[styles.lightStandardText, { marginLeft: 15 }]}>
              Anmelden
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
