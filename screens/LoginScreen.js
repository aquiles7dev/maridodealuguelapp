import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    // Aqui você deve buscar o usuário no backend/Firebase
    // Exemplo de usuários simulados:
    const usuariosSimulados = [
      { email: 'cliente@exemplo.com', senha: '123', tipo: 'Cliente' },
      { email: 'prestador@exemplo.com', senha: '123', tipo: 'Prestador' },
      { email: 'adm@exemplo.com', senha: '123', tipo: 'ADM' },
    ];

    const usuario = usuariosSimulados.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      Alert.alert('Erro', 'E-mail ou senha incorretos!');
      return;
    }

    // Direciona para a tela correta
    switch (usuario.tipo) {
      case 'Cliente':
        navigation.replace('Cliente');
        break;
      case 'Prestador':
        navigation.replace('Prestador');
        break;
      case 'ADM':
        navigation.replace('ADM');
        break;
      default:
        Alert.alert('Erro', 'Tipo de usuário desconhecido!');
    }
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

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
        style={styles.botaoCadastro}
      >
        <Text style={styles.textoBotaoCadastro}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos (mesmos de antes)
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, alignSelf: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, fontSize: 16 },
  botaoLogin: { backgroundColor: '#ff4d4d', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoCadastro: { alignItems: 'center' },
  textoBotaoCadastro: { color: '#ff4d4d', fontSize: 14 },
});
