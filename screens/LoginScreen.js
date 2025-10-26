import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Tentando login com:", email, senha);
    navigation.navigate("Cliente"); // simulação de login
  };

  const handleCadastro = () => {
    console.log("Usuário clicou em cadastrar");
    navigation.navigate("Cadastro"); // agora leva para a tela Cadastro
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")} // coloca sua logo em assets/logo.png
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Marido de Aluguel</Text>
      <Text style={styles.subtitle}>Prestador de Serviços Domiciliar</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão de Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão de Cadastro */}
      <TouchableOpacity style={styles.buttonOutline} onPress={handleCadastro}>
        <Text style={styles.buttonOutlineText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5", // rosa claro de fundo
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF1493", // rosa forte
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#FF69B4",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FF69B4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "#FF1493",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutline: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#FF1493",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#FF1493",
    fontWeight: "bold",
    fontSize: 16,
  },
});
