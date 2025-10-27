// ChamadosScreen.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const PRIMARY_COLOR = "#f1069bff";
const BACKGROUND_COLOR = "#f5f5f5";

export default function ChamadosScreen({ navigation, route }) {
  const { chamados, status } = route.params;
  const chamadosFiltrados = chamados.filter(c => c.status === status);

  const renderItem = ({ item }) => (
    <View style={styles.chamadoCard}>
      <Text style={styles.chamadoTitle}>ID: {item.id || "N/A"}</Text>
      <Text>Cliente: {item.cliente || "N/A"}</Text>
      <Text>Prestador: {item.prestador || "N/A"}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Descrição: {item.descricao || "Sem descrição"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: PRIMARY_COLOR }]}>Chamados - {status}</Text>
      </View>

      <FlatList
        data={chamadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum chamado encontrado.</Text>}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: PRIMARY_COLOR }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold" },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  chamadoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  chamadoTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#555" },
  button: {
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
