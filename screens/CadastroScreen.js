// Importa as bibliotecas do React e Firebase
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Importa as funções do Firebase
import { ref, set } from "firebase/database";
import { db } from "./firebase"; // 🔥 importa o arquivo firebase.js

export default function CadastroScreen({ navigation }) {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("cliente"); // Pode ser cliente, prestador ou adm

  // Função que será chamada quando clicar em "Cadastrar"
  const handleCadastro = () => {
    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // Cria o objeto do novo usuário
    const novoUsuario = {
      nome,
      email,
      senha,
      tipo,
    };

    // Cria uma referência no banco de dados com base no email (sem pontos)
    const emailKey = email.replace(/\./g, "_"); // Firebase não aceita "." em chaves

    set(ref(db, "usuarios/" + emailKey), novoUsuario)
      .then(() => {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        navigation.navigate("Login"); // Volta pra tela de login
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro ao cadastrar: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo (cliente, prestador, adm)"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos visuais da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#ff4b4b",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#bbb",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
