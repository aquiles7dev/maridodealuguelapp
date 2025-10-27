import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { createPrestadorByAdmin } from "../firebase"; // importa função nova

export default function CadastroPrestadorScreen({ navigation }) {
  // estados locais do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [descricao, setDescricao] = useState("");

  // simula ID do admin logado (pode mudar quando implementar login real)
  const adminId = "admin";

  const handleCadastrar = async () => {
    if (!nome || !email || !telefone || !servico) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const novoPrestador = {
        nome,
        email,
        telefone,
        servico,
        descricao,
      };

      await createPrestadorByAdmin(novoPrestador, adminId);

      Alert.alert("Sucesso", "Prestador cadastrado com sucesso!");
      // limpa os campos
      setNome("");
      setEmail("");
      setTelefone("");
      setServico("");
      setDescricao("");
      // volta para tela anterior
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar o prestador.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Prestador</Text>

      <TextInput
        placeholder="Nome completo"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        placeholder="Serviço principal"
        style={styles.input}
        value={servico}
        onChangeText={setServico}
      />
      <TextInput
        placeholder="Descrição (opcional)"
        style={[styles.input, { height: 80 }]}
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Salvar Prestador</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2E86DE",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
