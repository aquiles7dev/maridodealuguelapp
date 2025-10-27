// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkNoxO_71LrdQlf0TGp6WeYvkDyLXCEtg",
  authDomain: "maridodealuguelapp-9d1e6.firebaseapp.com",
  databaseURL: "https://maridodealuguelapp-9d1e6-default-rtdb.firebaseio.com",
  projectId: "maridodealuguelapp-9d1e6",
  storageBucket: "maridodealuguelapp-9d1e6.firebasestorage.app",
  messagingSenderId: "353439448675",
  appId: "1:353439448675:web:cb3f6da016eda500bfc256",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Gera ID sequencial para cada tipo
export async function gerarId(tipo) {
  const dbRef = ref(db, tipo);
  const snapshot = await get(dbRef);
  let count = 1;

  if (snapshot.exists()) {
    const items = snapshot.val();
    count = Object.keys(items).length + 1;
  }

  let prefix = "";
  if (tipo === "clientes") prefix = "CL";
  if (tipo === "prestadores") prefix = "PR";
  if (tipo === "chamados") prefix = "CH";

  return `${prefix}${count}`;
}

// Salvar novo item com ID sequencial
export async function salvarItem(tipo, data) {
  const id = await gerarId(tipo);
  const dbRef = ref(db, `${tipo}/${id}`);
  await set(dbRef, data);
  return id;
}
