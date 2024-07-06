//Header con plato
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton}>
        <Image source={require('../assets/images/recursosExtras/cubiertos.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  rightSpace: {
    width: 24,
    height: 24,
  },
});

export default Header;
