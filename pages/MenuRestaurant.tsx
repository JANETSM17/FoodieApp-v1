// MenuRestaurant.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const menuItems = [
  {
    id: '1',
    name: 'Burrito de Asado',
    price: 8.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Asado rojo, ...'
  },
  {
    id: '2',
    name: 'Pizza Italiana',
    price: 15.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Pepperoni, queso mozarela...'
  },
  {
    id: '3',
    name: 'Hamburguesa',
    price: 10.00,
    image: require('../assets/images/comida/hamburguesa.png'),
    description: 'Carne de res, lechuga, tomate...'
  },
];

const MenuRestaurant = () => {
  return (
    <ScrollView style={styles.container}>
      {menuItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default MenuRestaurant;
