import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import LandingPage from "../pages/LandingPage";
import SecondSplashScreen from "../pages/SecondSplashScreenPage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";


const Stack = createNativeStackNavigator();

function AuthStack() {
  const [currentScreen, setCurrentScreen] = useState('SecondSplash');

  useEffect(() => {
    if (currentScreen === 'SecondSplash') {
      setTimeout(() => {
        setCurrentScreen('Landing');
      }, 2000); // Mostrar la segunda splash screen durante 2 segundos
    }
  }, [currentScreen]);

  if (currentScreen === 'SecondSplash') {
    
    return <SecondSplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default AuthStack;
