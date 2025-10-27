import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ref, push } from 'firebase/database';
import { db } from './firebase'; // ajuste o caminho se necessário

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

    // 🔥 Salva o usuário no Firebase
    const usuariosRef = ref(db, 'usuarios/');
    push(usuariosRef, {
      nome,
      email,
      senha, // OBS: em produção, nunca salve senha em texto puro
      tipo,
      criadoEm: new Date().toLocaleString(),
    })
      .then(() => {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        // Redireciona para a tela correta
        switch (tipo) {
          case 'Cliente':
            navigation.replace('Cliente');
            break;
          case 'Prestadores':
            navigation.replace('Prestadores');
            break;
          default:
            navigation.replace('Login');
        }
      })
      .catch((error) => {
        Alert.alert('Erro', 'Não foi possível cadastrar: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <View style={styles.tipoContainer}>
        <TouchableOpacity onPress={() => setTipo('Cliente')} style={[styles.tipoButton, tipo === 'Cliente' && styles.tipoSelecionado]}>
          <Text style={styles.tipoTexto}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTipo('Prestadores')}
          style={[styles.tipoButton, tipo === 'Prestadores' && styles.tipoSelecionado]}
        >
          <Text style={styles.tipoTexto}>Prestadores</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoCadastro} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.botaoLogin}>
        <Text style={styles.textoBotaoLogin}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, alignSelf: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, fontSize: 16 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  tipoContainer: { flexDirection: 'row', marginBottom: 15 },
  tipoButton: { flex: 1, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginHorizontal: 5 },
  tipoSelecionado: { backgroundColor: '#ff4d4d', borderColor: '#ff4d4d' },
  tipoTexto: { color: '#fff', fontWeight: 'bold' },
  botaoCadastro: { backgroundColor: '#ff4d4d', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoLogin: { alignItems: 'center' },
  textoBotaoLogin: { color: '#ff4d4d', fontSize: 14 },
});
