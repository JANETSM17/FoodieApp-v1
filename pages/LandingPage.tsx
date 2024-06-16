import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {

  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navega hacia la pantalla de login al presionar el botón
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/recursosExtras/telefono-movil.png')} 
        style={styles.image} 
      />
      <Button 
        title="Iniciar Sesión" 
        onPress={handleLoginPress}
      />
      <Image 
        source={require('../assets/images/recursosExtras/cafeteria.png')} 
        style={styles.image} 
      />
      <Button 
        title="Registrarse" 
        onPress={() => console.log('Registrarse presionado')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
});

export default LandingPage;
