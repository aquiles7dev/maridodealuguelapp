import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import AdminScreen from "../screens/AdminScreen";
import ClientesScreen from "../screens/ClientesScreen";
import PrestadoresScreen from "../screens/PrestadoresScreen";
import ChamadosScreen from "../screens/ChamadosScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="ClientesScreen" component={ClientesScreen} />
        <Stack.Screen name="PrestadoresScreen" component={PrestadoresScreen} />
        <Stack.Screen name="ChamadosScreen" component={ChamadosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
