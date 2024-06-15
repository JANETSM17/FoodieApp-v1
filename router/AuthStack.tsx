import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import LoginPage from "../pages/LoginPage";
import SplashScreen from "../pages/SplashScreenPage";

const Stack = createNativeStackNavigator();
function AuthStack() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // milisegundos que va a aparecer la splashscreen
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
}

export default AuthStack;
