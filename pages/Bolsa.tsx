import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const initialItems = [
  {
    id: '1',
    name: 'Burrito de Asado',
    price: 8.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Asado rojo, ...',
    quantity: 1
  },
  {
    id: '2',
    name: 'Pizza Italiana',
    price: 15.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Pepperoni, queso mozarela...',
    quantity: 1
  },
  {
    id: '3',
    name: 'Burrito de Picadillo',
    price: 7.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Picadillo de res, ...',
    quantity: 1
  },
  {
    id: '4',
    name: 'Burrito de Discada',
    price: 9.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Discada mixta, ...',
    quantity: 1
  },
  {
    id: '5',
    name: 'Pizza Vegetariana',
    price: 12.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Pimientos, champiñones, cebolla...',
    quantity: 1
  },
  {
    id: '6',
    name: 'Pizza de Pollo',
    price: 14.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Pollo, queso mozarela, salsa BBQ...',
    quantity: 1
  }
];

const Bolsa = () => {
  const [items, setItems] = useState(initialItems);
  const navigation = useNavigation();

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const incrementQuantity = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Bolsa</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(item.id)}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(item.id)}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Productos en el carrito: {items.length}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>${calculateTotal()}</Text>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('BagFinalDetails')}>
        <Text style={styles.nextButtonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    borderRadius: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityNumber: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#f00',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  summaryText: {
    fontSize: 16,
    color: '#000',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  nextButton: {
    marginTop: 20,
    marginBottom:10,
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Bolsa;
