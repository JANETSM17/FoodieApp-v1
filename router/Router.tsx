import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import useAuth from "../hooks/useAuth";


function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#F5B000" />
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
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
});

export default Router;