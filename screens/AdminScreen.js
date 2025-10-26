import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function AdminScreen() {
  // Dados simulados (você pode substituir por Firebase ou outro backend)
  const [clientes, setClientes] = useState([
    { id: '1', nome: 'Guilherme', email: 'dev.guilhermeaquiles@gmail.com' },
    { id: '2', nome: 'Maria', email: 'maria@email.com' },
  ]);

  const [prestadores, setPrestadores] = useState([
    { id: '1', nome: 'João', email: 'joao@email.com' },
    { id: '2', nome: 'Ana', email: 'ana@email.com' },
  ]);

  const [chamados, setChamados] = useState([
    { id: '1', tipoServico: 'Troca de fechadura', cliente: 'Guilherme', prestador: '', status: 'Disponível' },
    { id: '2', tipoServico: 'Pintura', cliente: 'Maria', prestador: 'João', status: 'Em andamento' },
  ]);

  const deletarCliente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
    Alert.alert('Cliente deletado!');
  };

  const deletarPrestador = (id) => {
    setPrestadores(prestadores.filter(p => p.id !== id));
    Alert.alert('Prestador deletado!');
  };

  const atualizarStatusChamado = (id, status) => {
    setChamados(chamados.map(c => c.id === id ? { ...c, status } : c));
    Alert.alert('Status do chamado atualizado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Administrador</Text>

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.email}</Text>
            <TouchableOpacity style={styles.botaoDeletar} onPress={() => deletarCliente(item.id)}>
              <Text style={styles.textoBotao}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Prestadores</Text>
      <FlatList
        data={prestadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.email}</Text>
            <TouchableOpacity style={styles.botaoDeletar} onPress={() => deletarPrestador(item.id)}>
              <Text style={styles.textoBotao}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Chamados</Text>
      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.tipoServico} - Cliente: {item.cliente} - Prestador: {item.prestador || 'Nenhum'} - Status: {item.status}</Text>
            <TouchableOpacity style={styles.botaoAtualizar} onPress={() => atualizarStatusChamado(item.id, 'Concluído')}>
              <Text style={styles.textoBotao}>Marcar Concluído</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    marginTop: 15,
  },
  divisor: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  botaoDeletar: {
    marginTop: 5,
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoAtualizar: {
    marginTop: 5,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
