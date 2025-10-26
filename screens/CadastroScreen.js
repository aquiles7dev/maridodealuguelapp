import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tipo, setTipo] = useState('Cliente'); // Cliente ou Prestador

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    // Aqui você adiciona a lógica de cadastro no backend/Firebase
    console.log('Cadastro realizado:', nome, email, senha, tipo);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

    // Direciona para a tela correta de acordo com o tipo
    switch (tipo) {
      case 'Cliente':
        navigation.replace('Cliente');
        break;
      case 'Prestador':
        navigation.replace('Prestador');
        break;
      default:
        Alert.alert('Erro', 'Tipo de usuário desconhecido!');
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

      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker
        selectedValue={tipo}
        style={styles.picker}
        onValueChange={(itemValue) => setTipo(itemValue)}
      >
        <Picker.Item label="Cliente" value="Cliente" />
        <Picker.Item label="Prestador" value="Prestador" />
      </Picker>

      <TouchableOpacity style={styles.botaoCadastro} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.botaoLogin}
      >
        <Text style={styles.textoBotaoLogin}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, alignSelf: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, fontSize: 16 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  picker: { height: 50, marginBottom: 15 },
  botaoCadastro: { backgroundColor: '#ff4d4d', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoLogin: { alignItems: 'center' },
  textoBotaoLogin: { color: '#ff4d4d', fontSize: 14 },
});
