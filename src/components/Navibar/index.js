import { React } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Organização</Text>
      <Text style={styles.textStyle}>Transações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#0C70F2",
    paddingLeft: 5,
    paddingTop: 14,
    paddingBottom: 14,
  },

  text: {
    color: "#f5f5f5",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    paddingLeft: 20,
  },

  textStyle: {
    fontWeight: "800",
    fontSize: 15,
    paddingLeft: 20,
    color: "#fff",
  },
});
