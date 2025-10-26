import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

export default function AdminScreen({ navigation }) {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    const chamadosRef = ref(db, "chamados/");
    onValue(chamadosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setChamados(lista);
      } else {
        setChamados([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel do Administrador</Text>

      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>{item.descricao}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.botaoSair} onPress={() => navigation.replace("Login")}>
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  titulo: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: { backgroundColor: "#1e1e1e", padding: 10, borderRadius: 8, marginBottom: 10 },
  texto: { color: "#fff" },
  status: { color: "#bbb", fontSize: 12 },
  botaoSair: { backgroundColor: "#444", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 15 },
  textoSair: { color: "#fff" },
});
