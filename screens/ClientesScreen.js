// ClientesScreen.js
import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function ClientesScreen({ route }) {
  const { clientes } = route.params;

  const handleEditar = (cliente) => {
    Alert.alert("Editar Cliente", `Aqui você pode editar: ${cliente.nome}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      <ScrollView>
        {clientes.map((c, i) => (
          <View key={i} style={styles.card}>
            <Text>Nome: {c.nome}</Text>
            <Text>Email: {c.email}</Text>
            <Text>Telefone: {c.telefone}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleEditar(c)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8 },
  button: { marginTop: 10, backgroundColor: "#f1069bff", padding: 8, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff" }
});
