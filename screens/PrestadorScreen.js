import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput } from 'react-native';

export default function PrestadorScreen() {
  // Chamados disponíveis (exemplo estático, depois pode vir do backend)
  const [chamadosDisponiveis, setChamadosDisponiveis] = useState([
    { id: '1', tipoServico: 'Troca de fechadura', descricao: 'Porta da sala quebrada', status: 'Disponível' },
    { id: '2', tipoServico: 'Pintura', descricao: 'Quarto precisa ser pintado', status: 'Disponível' },
  ]);

  // Chamados aceitos/histórico
  const [historicoChamados, setHistoricoChamados] = useState([]);

  // Perfil do prestador (pode vir do backend/Firebase)
  const [prestador, setPrestador] = useState({
    nome: 'Prestador Exemplo',
    email: 'prestador@exemplo.com',
  });

  const [novoNome, setNovoNome] = useState(prestador.nome);

  const aceitarChamado = (chamado) => {
    // Remove da lista de disponíveis
    setChamadosDisponiveis(chamadosDisponiveis.filter(c => c.id !== chamado.id));
    // Adiciona no histórico como "Em andamento"
    setHistoricoChamados([{ ...chamado, status: 'Em andamento' }, ...historicoChamados]);
    Alert.alert('Sucesso', 'Chamado aceito!');
  };

  const atualizarPerfil = () => {
    setPrestador({ ...prestador, nome: novoNome });
    Alert.alert('Perfil atualizado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do Prestador</Text>
      <Text style={styles.info}>Nome: {prestador.nome}</Text>
      <Text style={styles.info}>E-mail: {prestador.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Editar nome"
        value={novoNome}
        onChangeText={setNovoNome}
      />
      <TouchableOpacity style={styles.botao} onPress={atualizarPerfil}>
        <Text style={styles.textoBotao}>Atualizar Perfil</Text>
      </TouchableOpacity>

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Chamados Disponíveis</Text>
      {chamadosDisponiveis.length === 0 ? (
        <Text style={styles.info}>Nenhum chamado disponível no momento.</Text>
      ) : (
        <FlatList
          data={chamadosDisponiveis}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chamado}>
              <Text style={styles.chamadoTitulo}>{item.tipoServico}</Text>
              <Text>{item.descricao}</Text>
              <TouchableOpacity style={styles.botaoAceitar} onPress={() => aceitarChamado(item)}>
                <Text style={styles.textoBotao}>Aceitar Chamado</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Histórico de Chamados</Text>
      {historicoChamados.length === 0 ? (
        <Text style={styles.info}>Nenhum chamado aceito ainda.</Text>
      ) : (
        <FlatList
          data={historicoChamados}
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
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoAceitar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
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
