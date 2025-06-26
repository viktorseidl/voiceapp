import { styles } from "@/constants/Colors";
import { useLogin } from "@/hooks/LoginProvider";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Appearance,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import Feedheader from "./../../assets/images/feedheader.png";
export default function Profile() {
  const { isAuthenticated, logout, user, wbereiche, roles } = useLogin();
  const { width, height } = Dimensions.get("window");
  const colorScheme = Appearance.getColorScheme();
  const themeTextStyle =
    colorScheme === "light"
      ? { color: "#04121c", size: 24 }
      : { color: "#788994", size: 24 };
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  return (
    <>
      {isAuthenticated ? (
        <View
          style={[
            {
              flex: 1,
              width: width,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            },
            themeContainerStyle,
          ]}
        >
          <View
            style={{
              flex: 1,
              width: "90%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <ImageBackground
              style={{
                position: "absolute",
                top: "0%",
                width: "100%",
                height: "95%",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              source={Feedheader}
            ></ImageBackground>
            <View
              style={{
                width: "100%",
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 15,
                borderBottomWidth: 3,
                borderBottomColor: "#FFFFFF77",
              }}
            >
              <View
                style={{
                  width: "auto",
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 15,
                  paddingVertical: 10,
                }}
              >
                <Entypo name="user" color={"#FFF"} size={34} />
                <Text style={{ fontSize: 30, color: "#FFF", fontWeight: 600 }}>
                  {user === null ? "" : JSON.parse(user).Mitarbeitername}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  paddingTop: 12,
                  flex: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              ></View>
            </View>
            <View
              style={{
                width: "100%",
                paddingTop: 8,
                flex: 0,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#FFF",
                  textAlign: "left",
                  width: "90%",
                  marginTop: 20,
                }}
              >
                Details
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  color: "#FFF",
                  textAlign: "left",
                  width: "80%",
                  marginTop: 20,
                }}
              >
                - Kürzel: {user === null ? "" : JSON.parse(user).Name}
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  color: "#FFF",
                  textAlign: "left",
                  width: "80%",
                  marginTop: -10,
                }}
              >
                - Abteilung: Pflege
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  color: "#FFF",
                  textAlign: "left",
                  width: "80%",
                  marginTop: -10,
                }}
              >
                - Gruppe: {user === null ? "" : JSON.parse(user).Gruppe}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#FFF",
                  textAlign: "left",
                  width: "90%",
                  marginTop: 20,
                }}
              >
                Bereiche
              </Text>
              {wbereiche !== null && JSON.parse(wbereiche).length > 0
                ? wbereiche !== null &&
                  JSON.parse(wbereiche).length > 0 &&
                  JSON.parse(wbereiche).map((item, index) => (
                    <View
                      style={{
                        width: "80%",
                        flex: 0,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                      key={item + index}
                    >
                      <MaterialCommunityIcons
                        name="floor-plan"
                        color={"#FFF"}
                        size={19}
                        style={{ marginTop: -5, marginRight: 8 }}
                      />
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: 400,
                          color: "#FFF",
                          textAlign: "left",
                          width: "80%",
                          marginTop: -10,
                        }}
                      >
                        {item.Hausname} - {item.Station}
                      </Text>
                    </View>
                  ))
                : "keine Angaben"}
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#FFF",
                  textAlign: "left",
                  width: "90%",
                  marginTop: 20,
                }}
              >
                Berechtigungen
              </Text>
              {roles !== null && JSON.parse(roles).length > 0
                ? roles !== null &&
                  JSON.parse(roles).length > 0 &&
                  JSON.parse(roles).map((item, index) =>
                    item == "view:notes" ||
                    item == "create:notes" ||
                    item == "update:notes" ||
                    item == "delete:notes" ||
                    item == "print:notes" ? (
                      <View
                        style={{
                          width: "80%",
                          flex: 0,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                        key={item + index}
                      >
                        <MaterialIcons
                          name="privacy-tip"
                          color={"#FFF"}
                          size={19}
                          style={{ marginTop: -5, marginRight: 8 }}
                        />
                        <Text
                          style={{
                            fontSize: 19,
                            fontWeight: 400,
                            color: "#FFF",
                            textAlign: "left",
                            width: "80%",
                            marginTop: -10,
                          }}
                        >
                          {item == "view:notes"
                            ? "Dokumentationen ansehen"
                            : item == "create:notes"
                            ? "Dokumentationen erstellen"
                            : item == "update:notes"
                            ? "Dokumentationen aktualisieren"
                            : item == "delete:notes"
                            ? "Dokumentationen löschen"
                            : item == "print:notes"
                            ? "Dokumentationen drucken"
                            : ""}
                        </Text>
                      </View>
                    ) : (
                      ""
                    )
                  )
                : "keine Angaben"}
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "90%",
                  marginTop: 40,
                }}
              >
                <Pressable
                  onPress={() => router.push({ pathname: "/settings" })}
                  style={{
                    padding: 20,
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
                  <MaterialIcons
                    name="app-settings-alt"
                    color={"#FFFFFF"}
                    size={themeTextStyle.size}
                  />
                  <Text style={[styles.lightStandardText, { marginLeft: 15 }]}>
                    Einstellungen
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    logout();
                    router.push({ pathname: "/home" });
                  }}
                  style={{
                    padding: 20,
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
              </View>
            </View>
          </View>
        </View>
      ) : (
        ""
      )}
    </>
  );
}
