// components/Loading.tsx

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingProps = {
  text?: string;
  size?: "small" | "large";
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  size = "large",
  color = "#343434",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
