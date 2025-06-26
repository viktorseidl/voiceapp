import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
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
  const [serverHost, setServerHost] = useState("");
  const [type, setType] = useState<"lokal" | "cloud">("lokal");
  const [dbNameMgmt, setDbNameMgmt] = useState("");
  const [dbNameCare, setDbNameCare] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isHttpUrl = (val: string) =>
    /^http?:\/\/.+/.test(val) || /^https?:\/\/.+/.test(val)
      ? null
      : "Bitte geben Sie den Server-Host an im entsprechenden Format.";
  const isdbManagementName = (val: string) =>
    val.trim().length > 0
      ? null
      : "Bitte geben Sie den Namen der Medicare-Verwaltungsdatenbank an";
  const isdbAdminName = (val: string) =>
    val.trim().length > 0
      ? null
      : "Bitte geben Sie den Admin-Benutzername der Medicare-Datenbanken an";

  const handleSubmit = async () => {
    if (
      !serverHost ||
      isHttpUrl(serverHost) ||
      !dbNameMgmt ||
      !dbNameCare ||
      !username
    ) {
      Alert.alert("Fehler", "Bitte füllen Sie alle Pflichtfelder (*) aus");
      return;
    } else {
      await SecureStore.setItemAsync(
        "network",
        JSON.stringify({
          server: serverHost,
          type: type,
          vdb: dbNameMgmt,
          pdb: dbNameCare,
          uname: username,
          pass: password,
        })
      );
      Alert.alert("Success", "Konfiguration gespeichert.");
    }
    //sds
    // Handle form data here (e.g. save to SecureStore, send to server, etc.)
  };
  useEffect(() => {
    const prepare = async () => {
      try {
        const network = await SecureStore.getItemAsync("network");
        console.log(network);
        if (network) {
          console.log("exists");
          const jsonobj = JSON.parse(network);
          setServerHost(jsonobj.server);
          setType(jsonobj.type);
          setDbNameMgmt(jsonobj.vdb);
          setDbNameCare(jsonobj.pdb);
          setUsername(jsonobj.uname);
          setPassword(jsonobj.pass);
        } else {
          console.log("no exists");
        }
      } finally {
      }
    };

    prepare();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title with Icon */}
      <View style={styles.header}>
        <FontAwesome5 name="network-wired" size={60} color="#FF7700" />
        <Text style={styles.title}>Netzwerk Konfiguration</Text>
      </View>
      <View
        style={{
          width: "90%",
          borderColor: "#000",
          borderWidth: 1,
          flex: 0,
          flexDirection: "column",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 0,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            padding: 8,
            paddingHorizontal: 15,
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#000"
            style={{ marginTop: 3 }}
          />
          <Text
            style={
              (styles.title,
              {
                fontSize: 18,
                marginLeft: 8,
                fontWeight: 500,
                textDecorationLine: "underline",
              })
            }
          >
            Hinweis zur Netzwerkintegration
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flex: 0,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignContent: "center",
            paddingBottom: 13,
            paddingTop: 0,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={
              (styles.title,
              {
                fontSize: 16,
                marginLeft: 4,
                fontWeight: 300,
              })
            }
          >
            Damit die Anwendung ordnungsgemäß im lokalen Netzwerk funktioniert,
            muss die API bereits auf dem lokalen Server über den IIS installiert
            und entsprechend konfiguriert sein.
          </Text>
          <Text
            style={
              (styles.title,
              {
                fontSize: 16,
                marginLeft: 4,
                fontWeight: 300,
                fontStyle: "italic",
              })
            }
          >
            Bei Verwendung des Betriebsmodus „Cloud“ entfällt diese Anforderung.
          </Text>
        </View>
      </View>

      {/* Form Fields */}
      <ValidateInput
        label="Server-Host *"
        value={serverHost}
        onChangeText={setServerHost}
        keyboardType="url"
        placeholder="( http | https )://( domain | IP-Adresse )"
        validator={isHttpUrl}
        required
      />

      <View style={styles.selectWrapper}>
        <Text
          style={[
            styles.label,
            { fontWeight: "600", fontSize: 18, color: "#000" },
          ]}
        >
          Netzwerk-Typ *
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) =>
              setType(itemValue as "lokal" | "cloud")
            }
            style={styles.picker}
          >
            <Picker.Item label="Lokal" value="lokal" />
            <Picker.Item label="Cloud" value="cloud" />
          </Picker>
        </View>
      </View>

      <ValidateInput
        label="MSSQL Verwaltung DB *"
        value={dbNameMgmt}
        onChangeText={setDbNameMgmt}
        placeholder="medicareVerwaltung_db"
        keyboardType="default"
        validator={isdbManagementName}
      />

      <ValidateInput
        label="MSSQL Pflege DB *"
        value={dbNameCare}
        onChangeText={setDbNameCare}
        placeholder="medicarePflege_db"
        keyboardType="default"
        required
      />

      <ValidateInput
        label="Root Benutzername *"
        value={username}
        onChangeText={setUsername}
        placeholder="db_admin"
        keyboardType="default"
        required
        validator={isdbAdminName}
      />

      <ValidateInput
        label="Root Passwort *"
        value={password}
        onChangeText={setPassword}
        placeholder="db_passwort"
        keyboardType="default"
        secureTextEntry
      />
      {/**
   label="Benutzer"
                    value={uname}
                    onChangeText={setUname}
                    placeholder="Benutzer-Kürzel"
                    keyboardType="default"
                    required
                    validator={emailValidator}
   */}
      {/* Save Button */}
      <View
        style={{
          width: "90%",
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#343434" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Abbrechen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NetworkConfigForm;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
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
