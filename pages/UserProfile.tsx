import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const UserProfile = () => {
  return (
    <View>
      <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.customer}/>
      <Text style={styles.UserName}>UserFullName</Text>
      <Text style={styles.UserName}>UserName</Text>

      <Text style={styles.UserName}>UserEmail</Text>
      <Text style={styles.UserName}>UserTelephone</Text>
      <Text style={styles.UserName}>Te uniste el: </Text>
      <Text style={styles.UserName}>Total gastado: </Text>

      <Text style={styles.UserName}>Pedido pendiente en: </Text>
      <Text style={styles.UserName}>Historial de pedidos</Text>
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