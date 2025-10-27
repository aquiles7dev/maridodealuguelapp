// PrestadoresScreen.js
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";

export default function PrestadoresScreen({ route }) {
  const { prestadores } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Prestadores</Text>
      <ScrollView>
        {prestadores.map((p, i) => (
          <View key={i} style={styles.card}>
            <Text>Nome: {p.nome}</Text>
            <Text>Email: {p.email}</Text>
            <Text>Telefone: {p.telefone}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8 }
});
