import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import useAuth from "../hooks/useAuth";
import FirstSplashScreen from "../pages/FirstSplashScreenPage";

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      // <View style={styles.container}>
      //   <FirstSplashScreen />
      // </View>
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
});

export default Router;