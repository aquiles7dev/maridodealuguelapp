import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ref, push } from "firebase/database";
import { db } from "./firebase"; // ajusta o caminho se estiver em outra pasta

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = async () => {
    console.log("🧠 Iniciando cadastro...");

    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    try {
      // Referência ao nó /usuarios no Realtime Database
      const usuariosRef = ref(db, "usuarios");
      console.log("📦 Referência criada:", usuariosRef);

      // Cria um novo usuário do tipo "cliente"
      await push(usuariosRef, {
        nome,
        email,
        senha, // ⚠️ Em produção, nunca salve senha em texto puro
        tipo: "cliente", // garante que todo usuário do app seja cliente
        criadoEm: new Date().toISOString(),
      });

      console.log("✅ Usuário salvo no Firebase!");
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.replace("Login");
    } catch (error) {
      console.error("🔥 ERRO no cadastro:", error);
      Alert.alert("Erro", "Não foi possível cadastrar: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botaoCadastro} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.botaoLogin}>
        <Text style={styles.textoBotaoLogin}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 30, alignSelf: "center" },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botaoCadastro: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  botaoLogin: { alignItems: "center" },
  textoBotaoLogin: { color: "#ff4d4d", fontSize: 14 },
});
