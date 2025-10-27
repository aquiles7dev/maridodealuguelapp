// Importa módulos principais do Firebase
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  runTransaction,
  set,
  get,
  update,
  child
} from "firebase/database";

// === CONFIGURAÇÃO DO FIREBASE ===
// Substitua pelos dados do seu projeto
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

// Inicializa o app e o banco
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/*
 Função: getNextId(counterName)
 Usa um contador no Firebase (ex: counters/prestadores)
 e gera um ID sequencial único, começando do 1.
*/
export async function getNextId(counterName) {
  const counterRef = ref(db, `counters/${counterName}`);
  const result = await runTransaction(counterRef, (current) => {
    if (current === null) return 1; // se ainda não existe, começa em 1
    return current + 1; // incrementa o contador
  });
  if (!result.committed) {
    throw new Error("Erro ao gerar novo ID");
  }
  return result.snapshot.val();
}

/*
 Função: createUsuarioCliente(usuarioData)
 Cria um novo usuário comum (cliente) no nó /usuarios
 com ID numérico sequencial.
*/
export async function createUsuarioCliente(usuarioData) {
  const newId = await getNextId("usuarios");
  const path = `usuarios/${newId}`;
  const data = {
    id: String(newId),
    ...usuarioData,
    role: "cliente",
    criadoEm: new Date().toISOString(),
  };
  await set(ref(db, path), data);
  return data;
}

/*
 Função: createPrestadorByAdmin(prestadorData, adminId)
 Cria um novo prestador de serviço (feito pelo administrador)
 no nó /prestadores, com ID sequencial e dados do admin que criou.
*/
export async function createPrestadorByAdmin(prestadorData, adminId) {
  const newId = await getNextId("prestadores");
  const path = `prestadores/${newId}`;
  const data = {
    id: String(newId),
    ...prestadorData,
    aprovado: true,
    criadoPorAdmin: adminId || "admin",
    criadoEm: new Date().toISOString(),
  };
  await set(ref(db, path), data);
  return data;
}

/*
 Função: getUserById(tipo, id)
 Busca qualquer usuário pelo tipo (usuarios ou prestadores)
*/
export async function getUserById(tipo, id) {
  const snapshot = await get(child(ref(db), `${tipo}/${id}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}

/*
 Função: updateUser(tipo, id, novosDados)
 Atualiza qualquer dado dentro de /usuarios ou /prestadores
*/
export async function updateUser(tipo, id, novosDados) {
  const path = `${tipo}/${id}`;
  await update(ref(db, path), novosDados);
  return { id, ...novosDados };
}

// Exporta o banco para ser usado nas telas
export { db };
