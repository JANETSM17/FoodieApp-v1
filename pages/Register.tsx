import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, CheckBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons

const Register = ({ route, navigation }) => {
  const { userType } = route.params;

  const handleRegister = () => {
    // Implementa la lógica de registro aquí
    alert(`Registrado como ${userType}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={require('../assets/images/logos/FoodieNegro.png')} style={styles.logo} />
      {userType === 'Usuario' ? (
        <>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Nombre"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Apellido"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la empresa"
          />
          <TextInput
            style={styles.input}
            placeholder="Número telefónico"
          />
          <TextInput
            style={styles.input}
            placeholder="RFC"
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección comercial"
          />
          <TextInput
            style={styles.input}
            placeholder="Régimen fiscal"
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico corporativo"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
          />
          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.checkboxLabel}>Acepto y he leído los términos y condiciones</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.checkboxLabel}>Acepto y he leído la Política de privacidad</Text>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  halfInput: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

export default Register;
