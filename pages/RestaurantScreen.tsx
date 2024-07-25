import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getComedor, getComida, getBebidas, getFrituras, getDulces, getOtros, getCarritoID, confirmCarrito, addToCarrito } from '../services/demoService';

const RestaurantScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState('Comida');
  const [comedor, setComedor] = useState(null);
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [menuItems, setMenuItems] = useState({
    Comida: [],
    Bebidas: [],
    Frituras: [],
    Dulces: [],
    Otros: [],
  });

  const addToCart = async (item) => {
    console.log('El id de carrito es: ', carrito);
    console.log('El id del producto es: ', item._id);
    setLoading(true);
    try {
      if (carrito) {
        const result = await confirmCarrito(item._id, carrito);
        if (result.exists) {
          console.log("Producto ya en el carrito");
          Alert.alert('Producto ya en el carrito', `${item.nombre} ya está en el carrito, para modificar la cantidad ve a la bolsa`);
        } else {
          const addResult = await addToCarrito(item._id, carrito);
          if (addResult.status === 'success') {
            let message = `${item.nombre} ha sido agregado al carrito, para modificar la cantidad ve a la bolsa`;
            if (addResult.dar_aviso) {
              message += '\nEl producto que acabas de agregar le pertenece a un proveedor diferente que los productos que tenías en el carrito, por lo que el único producto en tu carrito será el que acabas de agregar. Recuerda que cada pedido debe de ser a un solo proveedor.';
            }
            Alert.alert('Producto agregado', message);
          } else {
            console.error('Error adding to cart:', addResult.message);
            Alert.alert('Error', 'Hubo un problema al agregar el producto al carrito');
          }
        }
      }
    } catch (error) {
      console.error('Error confirmando carrito:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el carrito');
    } finally {
      setLoading(false);
    }
  };  
  

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    setLoading(true);
    try {
        const comedorId = await AsyncStorage.getItem('selectedComedorId');
        const clientEmail = await AsyncStorage.getItem('clientEmail');
        if (comedorId && clientEmail) {
            const carritoId = await getCarritoID(clientEmail);
            console.log('ID del carrito:', carritoId);
            setCarrito(carritoId);
            await AsyncStorage.setItem('carritoID', carritoId);

            const comedorInfo = await getComedor(comedorId);
            setComedor(comedorInfo);
            setMenuItems({
                Comida: await getComida(comedorId),
                Bebidas: await getBebidas(comedorId),
                Frituras: await getFrituras(comedorId),
                Dulces: await getDulces(comedorId),
                Otros: await getOtros(comedorId),
            });
        }
    } catch (error) {
        console.error("Error loading comedor data:", error);
    } finally {
        setLoading(false);
    }
};

  if (loading) {
    return (
        <View style={styles.containerActivityIndicator}>
            <ActivityIndicator size="large" color="#F5B000" />
        </View>
    );
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.blackSection}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.restaurantImage} />
        <Text style={styles.restaurantName}>{comedor?.nombre}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.menuTabs}>
          {Object.keys(menuItems).map((menu) => (
            <TouchableOpacity
              key={menu}
              style={[
                styles.menuTab,
                selectedMenu === menu && styles.menuTabSelected,
              ]}
              onPress={() => setSelectedMenu(menu)}
            >
              <Text
                style={[
                  styles.menuTabText,
                  selectedMenu === menu && styles.menuTabTextSelected,
                ]}
              >
                {menu}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {menuItems[selectedMenu].map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Image source={item.imagen} style={styles.menuItemImage} /> 
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemText}>{item.nombre}</Text>
              <Text style={styles.menuItemDescription}>{item.descripcion}</Text>
              <Text style={styles.menuItemPrice}>${item.precio}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Image source={require('../assets/images/recursosExtras/AgregarbolsaB.png')} style={styles.addButtonImage} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default RestaurantScreen;

const styles = StyleSheet.create({
  containerActivityIndicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 20,
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blackSection: {
    backgroundColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  restaurantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#FFA500',
    borderWidth: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFA500',
    marginBottom: 10, 
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 20,
    paddingHorizontal: 20, 
  },
  menuTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  menuTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 5,
    borderColor: '#FFA500',
    borderWidth: 1,
  },
  menuTabSelected: {
    backgroundColor: '#FFA500',
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  menuTabTextSelected: {
    color: 'white',
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
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
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
