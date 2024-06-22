import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import useAuth from "../hooks/useAuth";
import FirstSplashScreen from "../pages/FirstSplashScreenPage";
import HomePage from "../pages/HomePage";


function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <FirstSplashScreen />
      </View>
    );
  }

  return (

      <NavigationContainer>
        {user != undefined ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Router;