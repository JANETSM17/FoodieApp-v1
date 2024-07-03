import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import LandingPage from "../pages/LandingPage";
import FirstSplashScreen from "../pages/FirstSplashScreenPage";
import SecondSplashScreen from "../pages/SecondSplashScreenPage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import RestaurantProfile from "../pages/RestaurantProfile";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [currentScreen, setCurrentScreen] = useState('FirstSplash');

  useEffect(() => {
    if (currentScreen === 'FirstSplash') {
      setTimeout(() => {
        setCurrentScreen('SecondSplash');
      }, 2000); // Mostrar la primera splash screen durante 2 segundos
    } else if (currentScreen === 'SecondSplash') {
      setTimeout(() => {
        setCurrentScreen('Home');
      }, 2000); // Mostrar la segunda splash screen durante 2 segundos
    }
  }, [currentScreen]);

  if (currentScreen === 'FirstSplash') {
    return <FirstSplashScreen />;
  }

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