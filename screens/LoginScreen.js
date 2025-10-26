import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ref, get } from "firebase/database";
import { db } from "./firebase"; // importa o banco

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const emailKey = email.replace(/\./g, "_"); // Firebase não aceita ponto no nome da chave
    const userRef = ref(db, "usuarios/" + emailKey);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();

          if (userData.senha === senha) {
            Alert.alert("Bem-vindo!", `Login realizado como ${userData.tipo}`);

            // Direciona com base no tipo de usuário
            if (userData.tipo === "cliente") {
              navigation.navigate("Cliente");
            } else if (userData.tipo === "prestador") {
              navigation.navigate("Prestador");
            } else if (userData.tipo === "adm") {
              navigation.navigate("Adm");
            } else {
              Alert.alert("Erro", "Tipo de usuário inválido!");
            }
          } else {
            Alert.alert("Erro", "Senha incorreta!");
          }
        } else {
          Alert.alert("Erro", "Usuário não encontrado!");
        }
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro ao fazer login: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilo da tela
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
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
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
