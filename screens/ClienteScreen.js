import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function ClienteScreen({ navigation }) {
  // Chamados simulados
  const [chamados, setChamados] = useState([
    { id: "1", titulo: "Apartamento com vazamento" },
    { id: "2", titulo: "Contrato de aluguel" },
    { id: "3", titulo: "Pagamento atrasado" },
  ]);

  const handleNovoChamado = () => {
    alert("Funcionalidade de criar chamado ainda não implementada");
  };

  const handleVerChamado = (item) => {
    alert(`Detalhes do chamado: ${item.titulo}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Cliente!</Text>
      <Text style={styles.subtitle}>Seus chamados ativos:</Text>

      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chamadoCard} onPress={() => handleVerChamado(item)}>
            <Text style={styles.chamadoText}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Novo Chamado" onPress={handleNovoChamado} color="#ff69b4" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Sair" onPress={() => navigation.navigate("Login")} color="#ff69b4" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffe6f0" }, // rosa clarinho
  title: { fontSize: 24, marginBottom: 10, textAlign: "center", color: "#ff1493" }, // rosa forte
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#ff1493" },
  chamadoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  chamadoText: { color: "#ff1493", fontSize: 16 },
  buttonsContainer: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
  buttonWrapper: { flex: 1, marginHorizontal: 5 },
});
