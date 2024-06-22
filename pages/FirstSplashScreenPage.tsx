import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const FirstSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logos/FoodieLogo.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    
  },
});

export default FirstSplashScreen;
