import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ValidateInput from "./../ui/ValidatedInput"; // assuming it's a custom input with props

const NetworkConfigForm: React.FC = () => {
  const [dbAdmin, setDbAdmin] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const adminName = "PDAppMaster";
  const adminPass = "#123456.";
  const isdbAdminName = (val: string) =>
    val.trim().length > 0 ? null : "Bitte geben Sie den Admin-Benutzername ein";
  const isdbAdminPass = (val: string) =>
    val.trim().length > 7 ? null : "Bitte geben Sie das Passwort ein";
  const handleSubmit = () => {
    if (!dbAdmin.trim() || !dbPassword.trim()) {
      Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus");
      return;
    }
    if (dbAdmin.trim() === adminName && dbPassword.trim() === adminPass) {
      // Handle form data here (e.g. save to SecureStore, send to server, etc.)
      router.push({ pathname: "/network" });
    } else {
      Alert.alert("Fehler", "Die eingegebenen Daten sind falsch!");
      return;
    }
  };
  return (
    <>
      <View
        style={{
          width: "100%",
          height: 80,
          backgroundColor: "#082438",
        }}
      ></View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title with Icon */}
        <View style={styles.header}>
          <MaterialIcons
            name={"admin-panel-settings"}
            size={60}
            color="#FF7700"
          />
          <Text style={styles.title}>Admin-Login</Text>
        </View>

        <ValidateInput
          label="Admin"
          value={dbAdmin}
          onChangeText={setDbAdmin}
          placeholder="admin"
          keyboardType="default"
          validator={isdbAdminName}
        />

        <ValidateInput
          label="Passwort"
          value={dbPassword}
          onChangeText={setDbPassword}
          placeholder="********"
          keyboardType="default"
          secureTextEntry
          required
          validator={isdbAdminPass}
        />
        <View
          style={{
            width: "90%",
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.button, { backgroundColor: "#343434" }]}
          >
            <Text style={styles.buttonText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Anmelden</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default NetworkConfigForm;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  selectWrapper: {
    marginVertical: 10,
    width: "90%",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden", // Helps apply borderRadius properly
  },
  picker: {
    backgroundColor: "#ebeef0",
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#FF7700",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
    width: "30%",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
