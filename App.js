import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import ClienteScreen from './screens/ClienteScreen';
import PrestadorScreen from './screens/PrestadorScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Telas públicas */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />

        {/* Telas privadas */}
        <Stack.Screen name="Cliente" component={ClienteScreen} options={{ title: 'Área do Cliente' }} />
        <Stack.Screen name="Prestador" component={PrestadorScreen} options={{ title: 'Área do Prestador' }} />
        <Stack.Screen name="ADM" component={AdminScreen} options={{ title: 'Área do Administrador' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
