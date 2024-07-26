import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons
import { authHost } from "../constants/auth.constants";

const Register = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { userType } = route.params;
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    confirm_password: '',
    telefono: '',
    nombre_empresa: '',
    rfc: '',
    direccion_comercial: '',
    regimen_fiscal: '',
    correo_corporativo: ''
  });


  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    const payload = userType === 'Usuario' ? {
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      contraseña: formData.contraseña,
      confirm_password: formData.confirm_password,
      telefono: formData.telefono,
      userType
    } : {
      nombre_empresa: formData.nombre_empresa,
      correo_corporativo: formData.correo_corporativo,
      contraseña: formData.contraseña,
      confirm_password: formData.confirm_password,
      telefono: formData.telefono,
      rfc: formData.rfc,
      direccion_comercial: formData.direccion_comercial,
      regimen_fiscal: formData.regimen_fiscal,
      userType
    };

    try {
      const response = await fetch(`${authHost}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Éxito', 'Usuario registrado con éxito');
        navigation.reset({
          index: 1,
          routes: [{ name: 'Landing' }, { name: 'Login' }],
        }); // Redirige al login después de registrarse
      } else {
        console.log('Error', data.message || 'Error al registrar el usuario');
        Alert.alert('Error', data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.log('Error', 'No se pudo conectar con el servidor');
    }finally{
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator size="large" color="#F5B000" />
      </View>
    );
  }

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
              onChangeText={(text) => handleInputChange('nombre', text)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Apellido"
              onChangeText={(text) => handleInputChange('apellido', text)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            onChangeText={(text) => handleInputChange('correo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => handleInputChange('contraseña', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            onChangeText={(text) => handleInputChange('confirm_password', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            onChangeText={(text) => handleInputChange('telefono', text)}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la empresa"
            onChangeText={(text) => handleInputChange('nombre_empresa', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Número telefónico"
            onChangeText={(text) => handleInputChange('telefono', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="RFC"
            onChangeText={(text) => handleInputChange('rfc', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección comercial"
            onChangeText={(text) => handleInputChange('direccion_comercial', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Régimen fiscal"
            onChangeText={(text) => handleInputChange('regimen_fiscal', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico corporativo"
            onChangeText={(text) => handleInputChange('correo_corporativo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => handleInputChange('contraseña', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            onChangeText={(text) => handleInputChange('confirm_password', text)}
          />
          {/* <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.checkboxLabel}>Acepto y he leído los términos y condiciones</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.checkboxLabel}>Acepto y he leído la Política de privacidad</Text>
          </View> */}
        </>
      )}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
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
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: "contain",
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
