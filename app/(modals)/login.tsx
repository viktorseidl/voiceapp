import { styles } from "@/constants/Colors";
import { useLogin } from "@/hooks/LoginProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import ValidatedInput from "../ui/ValidatedInput";
import LogImage from "./../../assets/images/loginscreen.png";
import MedHeaderImage from "./../../assets/images/medheader.png";
export default function Login() {
  const { login } = useLogin();
  const { width, height } = Dimensions.get("window");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const unameTest = (text: string) => {
    return text.trim().length == 0 ? null : "Benutzername angeben";
  };
  const emailValidator = (text: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(text) ? null : "Bitte geben Sie einen Benutzername an";
  };
  const handleSubmit = () => {
    // Do final validation or call context.login()
    console.log("Login:", { uname, password });
  };
  return (
    <View style={styles.loginParentView}>
      <View
        style={{
          height: height,
          width: "100%",
          flex: 1,
          alignItems: "center",
          alignContent: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <ImageBackground
          style={{
            position: "absolute",
            top: -60,
            height: "90%",
            width: "100%",
          }}
          source={LogImage}
        />
        <View
          style={{
            height: (height / 5) * 3,
            width: "90%",
          }}
        >
          <Image
            style={{
              position: "absolute",
              bottom: 95,
              left: "15%",
              width: "70%",
              opacity: 0.5,
            }}
            resizeMode="contain"
            source={MedHeaderImage}
          ></Image>
          <View
            style={{
              width: "100%",
              height: "60%",
              backgroundColor: "#FFF",
              borderRadius: 3,
              boxShadow: "0px 5px 15px #000",
            }}
          >
            <View
              style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  textAlign: "left",
                  width: "100%",
                  paddingTop: 30,
                  paddingBottom: 20,
                  paddingLeft: 45,
                }}
              >
                Anmelden
              </Text>
              <View
                style={{
                  width: "80%",
                  height: "70%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    flexDirection: "column",
                    alignContent: "flex-start",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ValidatedInput
                    label="Benutzer"
                    value={uname}
                    onChangeText={setUname}
                    placeholder="Benutzer-Kürzel"
                    keyboardType="default"
                    required
                    validator={emailValidator}
                  />
                  <ValidatedInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Passwort"
                    secureTextEntry
                    required
                    minLength={4}
                  />
                  <View
                    style={{
                      width: "90%",
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      gap: 8,
                    }}
                  >
                    <Pressable
                      onPress={() => router.back()}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: "#2bdce3",
                        borderRadius: 5,
                        flex: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 7,
                      }}
                    >
                      <MaterialIcons name="cancel" color={"#000"} size={24} />
                      <Text style={{ color: "#000", fontSize: 16 }}>
                        Abbrechen
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        login();
                        router.push({ pathname: "/home" });
                      }}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: "#1ae8aa",
                        borderRadius: 5,
                        flex: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 7,
                      }}
                    >
                      <MaterialIcons name="done" color={"#000"} size={24} />
                      <Text style={{ color: "#000", fontSize: 16 }}>
                        Anmelden
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
