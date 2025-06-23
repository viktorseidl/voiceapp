import { styles } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ValidatedInput from "../ui/ValidatedInput";
export default function Login() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const unameTest = (text) => {
    return text.trim().length == 0 ? null : "Benutzername angeben";
  };
  const emailValidator = (text) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(text) ? null : "Invalid email format";
  };
  const handleSubmit = () => {
    // Do final validation or call context.login()
    console.log("Login:", { uname, password });
  };
  return (
    <View style={styles.loginParentView}>
      <Text style={{ fontSize: 24 }}>Login Modal</Text>
      <ValidatedInput
        label="Benutzer"
        value={uname}
        onChange={setUname}
        placeholder="Benutzer-Kürzel"
        keyboardType="text"
        required
        validator={emailValidator}
      />
      <ValidatedInput
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        required
        minLength={6}
      />
      <Pressable
        onPress={() => router.back()}
        style={{ padding: 10, backgroundColor: "#eee" }}
      >
        <Text>Close</Text>
      </Pressable>
    </View>
  );
}
