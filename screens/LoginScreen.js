import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ref, get, child } from "firebase/database";
import { db } from "../screens/firebase"; // ajuste o caminho se necessário

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // 🔐 Admin fixo direto no código
    if (email === "admin" && senha === "1234") {
      Alert.alert("Bem-vindo", "Login de administrador realizado!");
      navigation.replace("Admin");
      return;
    }

    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "usuarios"));

      if (snapshot.exists()) {
        const usuarios = snapshot.val();
        const encontrado = Object.values(usuarios).find(
          (user) => user.email === email && user.senha === senha
        );

        if (encontrado) {
          Alert.alert("Sucesso", "Login realizado com sucesso!");
          switch (encontrado.tipo) {
            case "Cliente":
              navigation.replace("Cliente");
              break;
            case "Prestador":
              navigation.replace("Prestadores");
              break;
            case "Admin":
              navigation.replace("Admin");
              break;
            default:
              Alert.alert("Erro", "Tipo de usuário desconhecido!");
          }
        } else {
          Alert.alert("Erro", "E-mail ou senha incorretos.");
        }
      } else {
        Alert.alert("Erro", "Nenhum usuário encontrado no banco.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão de cadastro */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#28a745", marginTop: 10 }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});