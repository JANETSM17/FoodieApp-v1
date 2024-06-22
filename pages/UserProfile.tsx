import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const UserProfile = () => {
  return (
    <View>
      <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.customer}/>
      <Text style={styles.UserName}>UserProfile</Text>
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