import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import LandingPage from './Landing';

const SecondSplashScreen = () => {

    return (
      <View style={styles.container}>
      <Image source={require('../assets/images//recursosExtras/costumer.png')} style={styles.customer}/>
              <Text style={styles.text}> Ordena lo que <Text style={styles.highlight}>quieras</Text></Text>
              <Text style={styles.text}>a la hora que <Text style={styles.highlight}>quieras</Text></Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  customer: {
    width:80,
    height:100,
  },
  highlight: {
    color: 'orange'
  }
});

export default SecondSplashScreen;
