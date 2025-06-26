import { styles } from "@/constants/Colors";
import { useLogin } from "@/hooks/LoginProvider";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Appearance,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import MedHeaderImage from "./../../assets/images/homefooterback.png";
import Logo from "./../../assets/images/Logo.png";
export default function Home() {
  const { isAuthenticated, logout } = useLogin();
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
            backgroundColor: "#FF7700",
            width: width * 0.9,
            aspectRatio: 1,
            opacity: 0.95,
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
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 0,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Pressable
            onPress={() => router.push({ pathname: "/posts" })}
            style={{
              padding: 20,
              width: "40%",
              backgroundColor: "#FFA733",
              marginTop: 20,
              borderRadius: 3,
              zIndex: 1,
              flex: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="user-doctor"
              color={"#FFF"}
              size={themeTextStyle.size}
            />
            <Text style={[styles.lightStandardText, { marginLeft: 15 }]}>
              Dokumentation
            </Text>
          </Pressable>
          {isAuthenticated ? (
            <Pressable
              onPress={() => logout()}
              style={{
                padding: 20,
                width: "40%",
                backgroundColor: "#343434",
                marginTop: 20,
                borderRadius: 3,
                zIndex: 1,
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name="log-out"
                color={"#FFFFFF"}
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
                width: "40%",
                backgroundColor: "#343434",
                marginTop: 20,
                borderRadius: 3,
                zIndex: 1,
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="login" color={"#FFF"} size={themeTextStyle.size} />
              <Text style={[styles.lightStandardText, { marginLeft: 15 }]}>
                Anmelden
              </Text>
            </Pressable>
          )}
          <View
            style={{
              width: "100%",
              flex: 0,
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 15,
              marginTop: 140,
            }}
          >
            <Image
              style={{
                width: "10%",
              }}
              resizeMode="contain"
              source={Logo}
            ></Image>
            <Text style={{ fontSize: 18, color: "#343434" }}>
              Version: 1.0.0
            </Text>
          </View>
        </View>
        <Image
          style={{
            position: "absolute",
            zIndex: 0,
            bottom: 0,
            left: "5%",
            width: "90%",
            opacity: 0.5,
          }}
          resizeMode="cover"
          source={MedHeaderImage}
        ></Image>
      </View>
    </View>
  );
}
