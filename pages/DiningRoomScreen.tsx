// DiningRoomScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image,Switch } from 'react-native';

const DiningRoomScreen = ({ route }) => {
  const { comedor } = route.params; // Obtiene los datos del comedor desde los parámetros de navegación
   //Para la toggle bar
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
          <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
      </View>
      
      <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.logoRestaurante} />
      <Text style={styles.text}>{comedor.nombre}</Text>
      <Text style={styles.text}>Calificación: {comedor.calif}</Text>
      <Text style={styles.text}>Tiempo de espera mínimo: {comedor.min_espera} minutos</Text>

      <Switch //Para escoger comida, bebidas, frituras, etc
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topBar: {
    height: 80,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, 
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  logo: {
    width: 180, 
    height: 45, 
  },
  logoRestaurante:{
    borderRadius: 80, 
  },
});

export default DiningRoomScreen;
