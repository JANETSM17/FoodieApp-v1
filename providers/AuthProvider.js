import React, { createContext, useEffect, useState } from "react";
import authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const authDataSerialize = await AsyncStorage.getItem('@authData');
      if (authDataSerialize) {
        const _authData = JSON.parse(authDataSerialize);
        setUser(_authData);
      }
    } catch (error) {
      console.log("Fail storage data", error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    setLoading(true);
    const response = await authService(email, password);
    
    if (response && response.token && response.userType) {
      const { token, userType } = response;
      setUser({ token });
      await AsyncStorage.setItem("@authData", JSON.stringify({ token }));
      await AsyncStorage.setItem("@userType", userType);
      console.log({ token, userType });
    } else {
      setUser(undefined); // Reiniciar el estado de usuario si hay error
    }

    setLoading(false);
  }

  async function logout() {
    setLoading(true);
    setUser(undefined);
    await AsyncStorage.removeItem("@authData");
    await AsyncStorage.removeItem("@userType");
    await AsyncStorage.removeItem("carritoID");
    await AsyncStorage.removeItem("clientEmail");
    await AsyncStorage.removeItem("selectedComedorId");
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

