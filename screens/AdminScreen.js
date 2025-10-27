// AdminScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase"; // <-- ajuste o caminho se necessário

const PRIMARY_COLOR = "#f1069bff";
const BACKGROUND_COLOR = "#f5f5f5";

export default function AdminScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [prestadores, setPrestadores] = useState([]);
  const [chamados, setChamados] = useState([]);

  const [ativos, setAtivos] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [concluidos, setConcluidos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db);

        // === USUÁRIOS ===
        const snapshotUsuarios = await get(child(dbRef, "usuarios"));
        if (snapshotUsuarios.exists()) {
          const allUsuariosObj = snapshotUsuarios.val();
          const allUsuarios = Object.keys(allUsuariosObj).map(key => ({
            id: key,
            ...allUsuariosObj[key],
          }));
          setClientes(allUsuarios);
        }

        // === PRESTADORES ===
        const snapshotPrestadores = await get(child(dbRef, "prestadores"));
        if (snapshotPrestadores.exists()) {
          const prestadoresObj = snapshotPrestadores.val();
          const allPrestadores = Object.keys(prestadoresObj).map(key => ({
            id: key,
            ...prestadoresObj[key],
          }));
          setPrestadores(allPrestadores);
        }

        // === CHAMADOS ===
        const snapshotChamados = await get(child(dbRef, "chamados"));
        if (snapshotChamados.exists()) {
          const chamadosObj = snapshotChamados.val();
          const allChamados = Object.keys(chamadosObj).map(key => ({
            id: key,
            ...chamadosObj[key],
          }));

          setChamados(allChamados);
          setAtivos(allChamados.filter(c => c.status === "Ativo").length);
          setPendentes(allChamados.filter(c => c.status === "Pendente").length);
          setConcluidos(allChamados.filter(c => c.status === "Concluído").length);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os dados do Firebase.");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { color: PRIMARY_COLOR }]}>Painel do Admin</Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ClientesScreen", { clientes })}
          >
            <Text style={styles.cardLabel}>Clientes</Text>
            <Text style={styles.cardValue}>{clientes.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PrestadoresScreen", { prestadores })}
          >
            <Text style={styles.cardLabel}>Prestadores</Text>
            <Text style={styles.cardValue}>{prestadores.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ChamadosScreen", { chamados, status: "Ativo" })}
          >
            <Text style={styles.cardLabel}>Chamados Ativos</Text>
            <Text style={styles.cardValue}>{ativos}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ChamadosScreen", { chamados, status: "Pendente" })}
          >
            <Text style={styles.cardLabel}>Chamados em andamento</Text>
            <Text style={styles.cardValue}>{pendentes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ChamadosScreen", { chamados, status: "Concluído" })}
          >
            <Text style={styles.cardLabel}>Chamados Concluídos</Text>
            <Text style={styles.cardValue}>{concluidos}</Text>
          </TouchableOpacity>
        </View>

        {/* === BOTÃO NOVO: CADASTRAR PRESTADOR === */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#27AE60" }]}
          onPress={() => navigation.navigate("CadastroPrestador")}
        >
          <Text style={styles.buttonText}>Cadastrar Prestador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: PRIMARY_COLOR }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  cardsContainer: { width: "100%" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  cardLabel: { fontSize: 16, color: "#555", marginBottom: 5 },
  cardValue: { fontSize: 22, fontWeight: "bold", color: "#000" },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});