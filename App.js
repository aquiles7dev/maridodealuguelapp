// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import das telas
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import ClienteScreen from "./screens/ClienteScreen";
import PrestadorScreen from "./screens/PrestadorScreen";
import AdminScreen from "./screens/AdminScreen";

// Firebase
import "./firebase"; // Já inicializa o Firebase

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Tela de login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Tela de cadastro */}
        <Stack.Screen name="Cadastro" component={CadastroScreen} />

        {/* Tela do cliente */}
        <Stack.Screen name="Cliente" component={ClienteScreen} />

        {/* Tela do prestador de serviço */}
        <Stack.Screen name="Prestador" component={PrestadorScreen} />

        {/* Tela do administrador */}
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
