import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LandingPage = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navega hacia la pantalla de login al presionar el botón
  };

  const handleRegisterPress = () => {
    navigation.navigate('Bolsa'); // Navega hacia la pantalla de login al presionar el botón
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/recursosExtras/telefono-movil.png')} 
        style={styles.image} 
      />
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={handleLoginPress}
      >
        <Text style={styles.buttonTextW}>Iniciar Sesión</Text>
      </Pressable>
      <Image 
        source={require('../assets/images/recursosExtras/cafeteria.png')} 
        style={styles.image} 
      />
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={handleRegisterPress} 
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextW:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default LandingPage;
