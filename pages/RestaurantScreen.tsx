import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getComedor, getComida, getBebidas, getFrituras, getDulces, getOtros } from '../services/demoService';

const RestaurantScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState('Comida');
  const [cart, setCart] = useState([]);
  const [comedor, setComedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [menuItems, setMenuItems] = useState({
    Comida: [],
    Bebidas: [],
    Frituras: [],
    Dulces: [],
    Otros: [],
  });

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert('Producto agregado', `${item.name} ha sido agregado al carrito`);
  };

  useEffect(() => {
    handleLoadComedorData();
  }, []);

  const handleLoadComedorData = async () => {
    setLoading(true);
    try {
      const comedorId = await AsyncStorage.getItem('selectedComedorId');
      if (comedorId) {
        const comedorInfo = await getComedor(comedorId);
        setComedor(comedorInfo);
        setMenuItems({
          Comida: await getComida(comedorId),
          Bebidas: await getBebidas(comedorId),
          Frituras: await getFrituras(comedorId),
          Dulces: await getDulces(comedorId),
          Otros: await getOtros(comedorId),
        });
        console.log(menuItems);
      }
    } catch (error) {
      console.error("Error loading comedor data:", error);
    } finally {
      setLoading(false);
  }
  };

  if (loading) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#1E90FF" />
        </View>
    );
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require('../assets/images/logos/FoodieNegro.png')} style={styles.fBlack} />
      </View>
      <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{comedor.nombre}</Text>

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
          <Image source={item.imagen} style={styles.menuItemImage} /> 
          <View style={styles.menuItemInfo}>
            <Text style={styles.menuItemText}>{item.nombre}</Text>
            <Text style={styles.menuItemPrice}>${item.precio}</Text>
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
    padding: 20,
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
  fBlack: {
    width: 100,
    height: 25,
    marginBottom: 20,
    marginTop: 25,
},
});
