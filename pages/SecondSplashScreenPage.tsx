import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import LandingPage from './Landing';

const SecondSplashScreen = () => {

    return (
        <View style={styles.container}>
              <Text style={styles.text}> Ordena lo que quieras a la hora que quieras </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    
  },
});

export default SecondSplashScreen;
