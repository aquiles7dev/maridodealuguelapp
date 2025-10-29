// Importa módulos Firebase
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkNoxO_71LrdQlf0TGp6WeYvkDyLXCEtg",
  authDomain: "maridodealuguelapp-9d1e6.firebaseapp.com",
  databaseURL: "https://maridodealuguelapp-9d1e6-default-rtdb.firebaseio.com",
  projectId: "maridodealuguelapp-9d1e6",
  storageBucket: "maridodealuguelapp-9d1e6.firebasestorage.app",
  messagingSenderId: "353439448675",
  appId: "1:353439448675:web:cb3f6da016eda500bfc256",
};

// Evita inicializar mais de uma vez (importações múltiplas)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Conecta ao Realtime Database
const db = getDatabase(app);

export { db };
