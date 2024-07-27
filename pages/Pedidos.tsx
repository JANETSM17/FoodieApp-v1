import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHistorialPedidos, getPedidosEnCurso, getUserInfo } from '../services/demoService'; 

const Pedidos = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [pastOrders, setPastOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHistorialVisible, setModalHistVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderPending, setSelectedOrderPending] = useState(null);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const clientInfo = await getUserInfo();
      const userType = await AsyncStorage.getItem('@userType');
      const clientEmail = await AsyncStorage.getItem('clientEmail');
      if (clientEmail && userType) {
        const response = await getHistorialPedidos(clientEmail, userType);
        if (response && Array.isArray(response.res)) {
          setPastOrders(response.res);
        } else {
          setPastOrders([]); // Asegúrate de establecer un array vacío si la respuesta no es un array
          console.error('Expected an array, but got:', response);
        }
      }

      if (clientEmail && clientInfo) {
        const pedidosEnCursoResponse = await getPedidosEnCurso(clientEmail, clientInfo._id);
        if (pedidosEnCursoResponse && Array.isArray(pedidosEnCursoResponse)) {
          setPendingOrders(pedidosEnCursoResponse);
        } else {
          setPendingOrders([]); // Asegúrate de establecer un array vacío si la respuesta no es un array
          console.error('Expected an array, but got:', pedidosEnCursoResponse);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setPastOrders([]);
      setPendingOrders([]);
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

  const handlePendingOrderPress = (order) => {
    if(order){
      setSelectedOrderPending(order);
    }
    setModalVisible(true);
  };

  const handleHistorialOrderPress = (order) => {
    if(order){
      setSelectedOrder(order);
    }
    setModalHistVisible(true);
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pedidos</Text>
        <View style={{ width: 40 }}></View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Pedidos Pendientes</Text>
        </View>
        {pendingOrders.map((order) => (
          <TouchableOpacity key={order.id} onPress={() => handlePendingOrderPress(order)} style={styles.orderCard}>
            <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.orderImage} />
            <View>
              <Text style={styles.orderRestaurant}>{order.nombre}</Text>
              <Text style={styles.orderPrice}>Total: ${order.total}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
        </View>
        {pastOrders.map((order) => (
          <TouchableOpacity key={order._id} onPress={() => handleHistorialOrderPress(order)} style={styles.orderCard}>
            <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.orderImage} />
            <View>
              <Text style={styles.orderRestaurant}>{order.proveedor}</Text>
              <Text style={styles.orderPrice}>Total: ${order.total}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedOrderPending && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Pedido</Text>
              <Image source={require('../assets/images/recursosExtras/BolsaCB.png')} style={styles.modalImage} />
              <Text style={styles.modalTextProveedor}>{selectedOrderPending.nombre} </Text>
                <Text style={styles.modalText}>Número Pedido:</Text>
                <Text style={styles.modalItemText}>{selectedOrderPending.id}</Text>
                <Text style={styles.modalText}>Estatus:</Text>
                <Text style={styles.modalItemText}>{selectedOrderPending.status}</Text>
                <Text style={styles.modalText}>Fecha y hora:</Text>
                {selectedOrderPending.entrega.split(',').map((item, index) => (
                  <Text key={index} style={styles.modalItemText}>{item}</Text>
                ))}
                <Text style={styles.modalText}>Total:</Text>
                <Text style={styles.modalItemText}>${selectedOrderPending.total}</Text>
                <Text style={styles.modalText}>Descripción:</Text>
                {selectedOrderPending.descripcion.split(',').map((item, index) => (
                  <Text key={index} style={styles.modalItemText}>{item}</Text>
                ))}
                <Text style={styles.modalText}>Especificaciones:</Text>
                <Text style={styles.modalItemText}>{selectedOrderPending.especificaciones}</Text>
                <Text style={styles.modalText}>Tipo de entrega:</Text>
                <Text style={styles.modalItemText}>{selectedOrderPending.pickup}</Text>
                <Text style={styles.modalText}>Clave FoodieBox:</Text>
                <Text style={styles.modalItemText}>{selectedOrderPending.clave}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {selectedOrder && (
        <Modal
          transparent={true}
          visible={modalHistorialVisible}
          onRequestClose={() => setModalHistVisible(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Pedido</Text>
            <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.modalImage} />
                <Text style={styles.modalTextProveedor}>{selectedOrder.proveedor} </Text>
                <Text style={styles.modalText}>Fecha y hora:</Text>
                {selectedOrder.hora.split(',').map((item, index) => (
                  <Text key={index} style={styles.modalItemText}>{item}</Text>
                ))}
                <Text style={styles.modalText}>Total:</Text>
                <Text style={styles.modalItemText}>${selectedOrder.total}</Text>
                <Text style={styles.modalText}>Productos:</Text>
                {selectedOrder.descripcion.split(',').map((item, index) => (
                  <Text key={index} style={styles.modalItemText}>{item}</Text>
                ))}
                <Text style={styles.modalText}>Especificaciones:</Text>
                <Text style={styles.modalItemText}>{selectedOrder.especificaciones}</Text>
                <Text style={styles.modalText}>Tipo de entrega:</Text>
                <Text style={styles.modalItemText}>{selectedOrder.pickup === 'mostrador' ? 'Mostrador' : 'FoodieBox'}</Text>
              <TouchableOpacity onPress={() => setModalHistVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )}
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
  contentContainer: {
    padding: 20,
  },
  sectionTitleContainer: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  orderRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderPrice: {
    fontSize: 16,
    color: 'orange',
  },
  orderHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTextProveedor: {
    fontSize: 16,
    margin: 2,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    margin: 2,
  },
  modalItemText: {
    fontSize: 14,
    margin: 5,
    color: '#494949',
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Pedidos;
