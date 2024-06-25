import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const UserProfile = () => {
  return (
    <View>
      <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.customer}/>
      <Text style={styles.UserName}>{comedor.nombre}</Text>
      <Text style={styles.UserName}>Codigo: </Text>

      {/*Toggle Informacion*/}
    <View>
      <Text style={styles.UserName}>RestaurantEmail</Text>
      <Text style={styles.UserName}>RestaurantTelephone</Text>
      <Text style={styles.UserName}>Address</Text>

      <Text style={styles.UserName}>Pedido pendiente en: </Text>
      <Text style={styles.UserName}>Historial de pedidos</Text>

      <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <Text style={styles.UserName}>Tiempo de preparación por pedido: </Text>  
        <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        
      <Text style={styles.UserName}>Calificación cono restaurante: </Text>    

      <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        
                    <Text style={styles.buttonText}>Eliminar Cuenta</Text>

                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
    </View>
        {/*Toggle Pedidos*/}
    <View>
    <TouchableOpacity style={styles.cascadaS} onPress={logout}>
                    <Text style={styles.cascada}>Historial de pedidos</Text>
                    <Text style={styles.cascada}>Menú</Text>
                    <Text style={styles.cascada}>Preguntas frecuentes</Text>

                    <Text style={styles.buttonText}>Pedidos en curso</Text>
        </TouchableOpacity>

    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  UserName:{
    fontSize:20,
  }
});

export default UserProfile