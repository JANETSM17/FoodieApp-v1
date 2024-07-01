import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

const RestaurantScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState('Comida');
  const [cart, setCart] = useState([]);

  const menuItems = {
    Comida: [
      { name: 'Hamburguesa', price: '$79.99', image: require('../assets/images/comida/hamburger.png') },
      { name: 'Pizza', price: '$99.99', image: require('../assets/images/comida/pizza.png') },
      { name: 'Tacos', price: '$59.99', image: require('../assets/images/comida/taco.png') },
    ],
    Bebidas: [
      { name: 'Sprite', price: '$25', image: require('../assets/images/comida/soda-can.png') },
      { name: 'Coca-Cola', price: '$30', image: require('../assets/images/comida/soda-can.png') },
      { name: 'Fanta', price: '$25', image: require('../assets/images/comida/soda-can.png') },
    ],
    Frituras: [
      { name: 'Papas Fritas', price: '$20', image: require('../assets/images/comida/fries.png') },
      { name: 'Chips', price: '$15', image: require('../assets/images/comida/fries.png') },
      { name: 'Nachos', price: '$35', image: require('../assets/images/comida/nachos.png') },
    ],
    Dulces: [
      { name: 'Chocolate', price: '$10', image: require('../assets/images/comida/chocolate.png') },
      { name: 'Gomitas', price: '$15', image: require('../assets/images/comida/chocolate.png') },
      { name: 'Caramelos', price: '$5', image: require('../assets/images/comida/chocolate.png') },
    ],
    Otros: [
      { name: 'Burrito', price: '$50', image: require('../assets/images/comida/burrito.png') },
      { name: 'Dona', price: '$60', image: require('../assets/images/comida/donut.png') },
      { name: 'Yogurt', price: '$20', image: require('../assets/images/comida/chocolate.png') },
    ],
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert('Producto agregado', `${item.name} ha sido agregado al carrito`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Foodie</Text>
      </View>
      <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>Cafeteria BIS</Text>

      <View style={styles.menuTabs}>
        {Object.keys(menuItems).map((menu) => (
          <TouchableOpacity
            key={menu}
            style={[styles.menuTab, selectedMenu === menu && styles.menuTabSelected]}
            onPress={() => setSelectedMenu(menu)}
          >
            <Text style={styles.menuTabText}>{menu}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {menuItems[selectedMenu].map((item, index) => (
        <View key={index} style={styles.menuItem}>
          <Image source={item.image} style={styles.menuItemImage} />
          <View style={styles.menuItemInfo}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <Image source={require('../assets/images/recursosExtras/AgregarbolsaB.png')} style={styles.addButtonImage} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  menuTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffc107',
    borderRadius: 20,
    margin: 5,
  },
  menuTabSelected: {
    backgroundColor: '#ff9800',
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 18,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 10,
  },
  addButtonImage: {
    width: 24,
    height: 24,
  },
});
