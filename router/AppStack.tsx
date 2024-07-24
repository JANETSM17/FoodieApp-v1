import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from "../pages/HomePage";
import RestaurantProfile from "../pages/RestaurantProfile";
import RestaurantScreen from "../pages/RestaurantScreen";
import UserProfile from "../pages/UserProfile";
import HomeRestaurant from "../pages/HomeRestaurant";
import Bolsa from "../pages/Bolsa";
import BagFinalDetails from "../pages/BagFinalDetails";
import Pedidos from "../pages/Pedidos";
import MenuRestaurant from "../pages/MenuRestaurant";
import HistorialRestaurant from "../pages/HistorialRestaurant";

const Stack = createNativeStackNavigator();

function AppStack() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserType = async () => {
      const type = await AsyncStorage.getItem('@userType');
      setUserType(type);
      setLoading(false);
    };

    loadUserType();
  }, []);

  if (loading) {
    return (
      <View style={styles.containerActivityIndicator}>
          <ActivityIndicator size="large" color="#F5B000" />
      </View>
  );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userType === "cliente" ? (
        <>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Menu" component={RestaurantScreen} />
          <Stack.Screen name="ClientProfile" component={UserProfile} />
          <Stack.Screen name="Bolsa" component={Bolsa} />
          <Stack.Screen name="BagFinalDetails" component={BagFinalDetails} />
          <Stack.Screen name="Pedidos" component={Pedidos} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeRestaurant" component={HomeRestaurant} />
          <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
          <Stack.Screen name="MenuRestaurant" component={MenuRestaurant}/>
          <Stack.Screen name="HistorialRestaurant" component={HistorialRestaurant}/>
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  containerActivityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      padding: 20,
  },
});

export default AppStack;