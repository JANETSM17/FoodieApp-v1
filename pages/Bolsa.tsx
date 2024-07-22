import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteProducto, getProductos, modifyQuantityProducto } from '../services/demoService';

const Bolsa = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState('');

  useEffect(() => {
    handleLoad();
}, []);

const handleLoad = async () => {
    setLoading(true);
    try {
      const carritoID = await AsyncStorage.getItem('carritoID');
      if(carritoID){
        setCarrito(carritoID);
        const productosEnBag = await getProductos(carritoID)
        if(productosEnBag){
          console.log('Esto hay en bag: ', productosEnBag)
          setItems(productosEnBag);
        }
      }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

  const deleteItem = async (id) => {
    console.log(id);
    console.log(carrito);
    setLoading(true)
    try {
      const deleted = await deleteProducto(id, carrito)
      if(deleted.status === 'success'){
        console.log('Producto eliminado')
      }
      
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }finally{
      handleLoad()
    }
  };

  const incrementQuantity = async (id) => {
    const updatedItems = items.map(item => 
      item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
  
    // Encuentra el ítem actualizado para obtener la nueva cantidad
    const updatedItem = updatedItems.find(item => item._id === id);
    const nuevaCantidad = updatedItem.cantidad;

    console.log('Esta es la cantidad que pasamos: ', nuevaCantidad)
    console.log(id)
    console.log(carrito)

    setLoading(true)
    try {
      const changed = await modifyQuantityProducto(id, carrito, nuevaCantidad)
      if(changed.status === 'success'){
        console.log('Producto aumentado')
      }
    } catch (error) {
      console.error('Error aumentando cantidad producto:', error);
    }finally{
      handleLoad()
    }
  };

  const decrementQuantity = async (id) => {
    //setItems(items.map(item => item._id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item));
    const updatedItems = items.map(item => item._id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item)
  
    // Encuentra el ítem actualizado para obtener la nueva cantidad
    const updatedItem = updatedItems.find(item => item._id === id);
    const nuevaCantidad = updatedItem.cantidad;

    console.log('Esta es la cantidad que pasamos: ', nuevaCantidad)
    console.log(id)
    console.log(carrito)

    setLoading(true)
    try {
      const changed = await modifyQuantityProducto(id, carrito, nuevaCantidad)
      if(changed.status === 'success'){
        console.log('Producto disminuido')
      }
    } catch (error) {
      console.error('Error disminuyendo cantidad producto:', error);
    }finally{
      handleLoad()
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
  };

  if (loading) {
    return (
        <View style={styles.containerActivityIndicator}>
            <ActivityIndicator size="large" color="#F5B000" />
        </View>
    );
}

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bolsa</Text>
        <View style={styles.headerPlaceholder} />
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {items.map((item) => (
          <View key={item._id} style={styles.itemContainer}>
            <Image source={require('../assets/images/comida/burrito.png')} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.nombre}</Text>
              <Text style={styles.itemPrice}>${item.precio}</Text>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(item._id)}>
                  <Ionicons name="remove-circle" size={30} color="#FFA500" />
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{item.cantidad}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(item._id)}>
                  <Ionicons name="add-circle" size={30} color="#FFA500" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item._id)}>
              <Ionicons name="trash-outline" size={25} color="#f00" />
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
  containerActivityIndicator: {
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  headerPlaceholder: {
    width: 40,
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
    borderColor: '#FFA500',
    borderWidth: 1,
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
    borderRadius: 15,
  },
  quantityNumber: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
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
    marginBottom: 10,
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
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
