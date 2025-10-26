import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function ClienteScreen() {
  const [tipoServico, setTipoServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [chamados, setChamados] = useState([]);

  // Dados do perfil do cliente (pode vir do backend/Firebase)
  const cliente = {
    nome: 'Guilherme',
    email: 'dev.guilhermeaquiles@gmail.com',
  };

  const criarChamado = () => {
    if (!tipoServico || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos do chamado!');
      return;
    }

    const novoChamado = {
      id: Date.now().toString(),
      tipoServico,
      descricao,
      status: 'Aguardando prestador',
    };

    setChamados([novoChamado, ...chamados]);
    setTipoServico('');
    setDescricao('');
    Alert.alert('Sucesso', 'Chamado criado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do Cliente</Text>
      <Text style={styles.info}>Nome: {cliente.nome}</Text>
      <Text style={styles.info}>E-mail: {cliente.email}</Text>

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Criar Chamado</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de Serviço (ex: pintura, troca de fechadura)"
        value={tipoServico}
        onChangeText={setTipoServico}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do serviço"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.botaoCriar} onPress={criarChamado}>
        <Text style={styles.textoBotao}>Criar Chamado</Text>
      </TouchableOpacity>

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Meus Chamados</Text>
      {chamados.length === 0 ? (
        <Text style={styles.info}>Nenhum chamado criado ainda.</Text>
      ) : (
        <FlatList
          data={chamados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chamado}>
              <Text style={styles.chamadoTitulo}>{item.tipoServico}</Text>
              <Text>{item.descricao}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botaoCriar: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  chamado: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  chamadoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
