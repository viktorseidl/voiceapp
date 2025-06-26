import { useLogin } from "@/hooks/LoginProvider";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import * as Network from "expo-network";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
const SettingsScreen: React.FC = () => {
  const [isNetKonfig, setIsNetKonfig] = useState<string | null>(null);
  const { isAuthenticated, logout, user, wbereiche, roles } = useLogin();
  const [localIp, setLocalIp] = useState<string>("");
  const [networkType, setNetworkType] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);
  const [publicIp, setPublicIp] = useState<string>("");
  const fetchData = async () => {
    // ✅ Local IP
    const ip = await Network.getIpAddressAsync();
    setLocalIp(ip);

    // ✅ Network Type + isConnected + isInternetReachable
    const state = await Network.getNetworkStateAsync();
    setNetworkType(state.type ?? "");
    setIsConnected(state.isConnected ?? null);
    setIsInternetReachable(state.isInternetReachable ?? null);

    // ✅ Public IP via external API
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setPublicIp(data.ip);
    } catch (error) {
      setPublicIp("0.0.0.0");
    }
  };
  const getNetworkKonfig = async () => {
    const network = await SecureStore.getItemAsync("network");
    if (network) {
      setIsNetKonfig(network);
    }
  };
  useEffect(() => {
    fetchData();
    getNetworkKonfig();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Konto-Informationen</Text>
      <TouchableOpacity style={styles.item}>
        <Entypo name="user" color={"#000"} size={24} style={styles.icon} />
        <Text style={styles.itemText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          paddingVertical: 14,
          paddingLeft: 40,
          borderBottomWidth: 1,
          borderColor: "#EEE",
        }}
      >
        <Text style={[styles.itemText, { fontWeight: 500, color: "#666" }]}>
          Mitarbeiter: {user === null ? "" : JSON.parse(user).Mitarbeitername}
        </Text>
        <Text style={[styles.itemText, { color: "#999" }]}>
          Kürzel: {user === null ? "" : JSON.parse(user).Name}
        </Text>
        <Text style={[styles.itemText, { color: "#999" }]}>
          Abteilung: Pflege
        </Text>
        <Text style={[styles.itemText, { color: "#999" }]}>
          Gruppe: {user === null ? "" : JSON.parse(user).Gruppe}
        </Text>
      </TouchableOpacity>

      {/* App Info Section */}
      <Text style={styles.sectionTitle}>App-Information</Text>
      <TouchableOpacity style={styles.item}>
        <Octicons
          name="versions"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>App Version</Text>
        <Text style={styles.rightText}>1.0.0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons
          name="business"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Unternehmen</Text>
        <Text style={styles.rightText}>DATASchafhausen GmbH</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons
          name="contact-support"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Support</Text>
        <Text style={styles.rightText}>service@data-schafhausen.com</Text>
      </TouchableOpacity>
      {/* App Info Section */}
      <Text style={styles.sectionTitle}>Netzwerk-Informationen</Text>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="ip-network-outline"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Lokale IP-Adresse</Text>
        <Text style={styles.rightText}>{localIp}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Octicons
          name="versions"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Netzwerktyp</Text>
        <Text style={styles.rightText}>{networkType}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="check-network-outline"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Verbunden</Text>
        <Text style={styles.rightText}>{isConnected ? "Ja" : "Nein"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons
          name="network-check"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Internet erreichbar</Text>
        <Text style={styles.rightText}>
          {isInternetReachable ? "Ja" : "Nein"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="ip-network"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Öffentliche IP-Adresse</Text>
        <Text style={styles.rightText}>{publicIp}</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Netzwerk-Konfiguration</Text>
      <TouchableOpacity style={styles.item}>
        <FontAwesome5
          name="server"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Server-Host</Text>
        <Text style={styles.rightText}>
          {isNetKonfig !== null
            ? JSON.parse(isNetKonfig).server
            : "keine Angaben"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="router-network"
          color={"#000"}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Verbindungs-Typ</Text>
        <Text style={styles.rightText}>
          {isNetKonfig !== null
            ? JSON.parse(isNetKonfig).type
            : "keine Angaben"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="server" color={"#000"} size={24} style={styles.icon} />
        <Text style={styles.itemText}>DB-Verwaltung</Text>
        <Text style={styles.rightText}>
          {isNetKonfig !== null ? JSON.parse(isNetKonfig).vdb : "keine Angaben"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="server" color={"#000"} size={24} style={styles.icon} />
        <Text style={styles.itemText}>DB-Pflege</Text>
        <Text style={styles.rightText}>
          {isNetKonfig !== null ? JSON.parse(isNetKonfig).pdb : "keine Angaben"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginTop: 30,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  icon: {
    width: 30,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  rightText: {
    fontSize: 14,
    color: "#999",
  },
});
