import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ref, get, child } from "firebase/database";
import { db } from "./firebase"; // caminho corrigido

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    const usuariosRef = ref(db, "usuarios/");
    get(child(usuariosRef, "")).then((snapshot) => {
      if (snapshot.exists()) {
        const usuarios = snapshot.val();
        let logado = false;

        // Percorre todos os usuários para encontrar correspondência
        Object.keys(usuarios).forEach((key) => {
          const usuario = usuarios[key];
          if (usuario.email === email && usuario.senha === senha) {
            logado = true;

            // Redireciona conforme tipo
            switch (usuario.tipo) {
              case "Cliente":
                navigation.replace("Cliente");
                break;
              case "Prestador":
                navigation.replace("Prestador");
                break;
              case "Admin":
                navigation.replace("Admin");
                break;
              default:
                navigation.replace("Login");
            }
          }
        });

        if (!logado) {
          Alert.alert("Erro", "Email ou senha incorretos!");
        }
      } else {
        Alert.alert("Erro", "Nenhum usuário encontrado!");
      }
    }).catch((error) => {
      Alert.alert("Erro", "Não foi possível logar: " + error.message);
    });
  };

  // Botão de sair (pode ser usado nas telas Cliente, Prestador e Admin)
  const handleSair = () => {
    setEmail("");
    setSenha("");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

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
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={styles.botaoCadastro}>
        <Text style={styles.textoBotaoCadastro}>Ainda não tem conta? Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 30, alignSelf: "center" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, fontSize: 16 },
  botaoLogin: { backgroundColor: "#ff4d4d", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  botaoCadastro: { alignItems: "center" },
  textoBotaoCadastro: { color: "#ff4d4d", fontSize: 14 },
});
