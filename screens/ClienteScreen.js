import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { ref, push, onValue, update, remove } from "firebase/database";
import { db } from "./firebase";

export default function ClienteScreen({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [chamados, setChamados] = useState([]);

  // 🔄 Carrega os chamados do Firebase
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

  // ➕ Criar novo chamado
  const criarChamado = () => {
    if (!descricao.trim()) {
      Alert.alert("Atenção", "Descreva o problema!");
      return;
    }
    const chamadosRef = ref(db, "chamados/");
    push(chamadosRef, {
      descricao,
      status: "Pendente",
      data: new Date().toLocaleString(),
    });
    setDescricao("");
    Alert.alert("Chamado criado!", "Seu pedido foi registrado com sucesso.");
  };

  // ✏️ Editar chamado
  const editarChamado = (id, novaDescricao) => {
    update(ref(db, `chamados/${id}`), { descricao: novaDescricao });
    Alert.alert("Chamado atualizado!");
  };

  // ❌ Excluir chamado
  const excluirChamado = (id) => {
    remove(ref(db, `chamados/${id}`));
    Alert.alert("Chamado excluído!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Descreva o serviço desejado"
        placeholderTextColor="#aaa"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.botao} onPress={criarChamado}>
        <Text style={styles.textoBotao}>Criar Chamado</Text>
      </TouchableOpacity>

      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>{item.descricao}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>

            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => editarChamado(item.id, "Atualizado: " + item.descricao)}>
                <Text style={styles.botaoEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirChamado(item.id)}>
                <Text style={styles.botaoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
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
  input: { backgroundColor: "#1e1e1e", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 },
  botao: { backgroundColor: "#ff4b4b", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  item: { backgroundColor: "#1e1e1e", padding: 10, borderRadius: 8, marginBottom: 10 },
  texto: { color: "#fff" },
  status: { color: "#bbb", fontSize: 12 },
  acoes: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  botaoEditar: { color: "#4cd137" },
  botaoExcluir: { color: "#e84118" },
  botaoSair: { backgroundColor: "#444", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 15 },
  textoSair: { color: "#fff" },
});
