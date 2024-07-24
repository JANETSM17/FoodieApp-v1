import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ordersHistory = [
  {
    id: 1,
    customerName: 'Mike Tyson',
    orderNumber: 21,
    phoneNumber: '(614)-216-78-27',
    items: [
      '2x Pizza Piña',
      '1x Hamburguesa',
      '4x Coca-Cola',
    ],
    specifications: 'Sin especificaciones',
    total: 250,
    pickupTime: '11:59 am',
    deliveryType: 'Foodie-Box',
    status: 'Entregado'
  },
  {
    id: 2,
    customerName: 'John Doe',
    orderNumber: 22,
    phoneNumber: '(614)-216-78-28',
    items: [
      '1x Burrito',
      '1x Taco',
      '2x Sprite',
    ],
    specifications: 'Sin salsa',
    total: 150,
    pickupTime: '12:30 pm',
    deliveryType: 'Pick-Up',
    status: 'Entregado'
  },
  {
    id: 3,
    customerName: 'Jane Smith',
    orderNumber: 23,
    phoneNumber: '(614)-216-78-29',
    items: [
      '3x Ensalada',
      '2x Agua',
    ],
    specifications: 'Con aderezo aparte',
    total: 200,
    pickupTime: '1:00 pm',
    deliveryType: 'Foodie-Box',
    status: 'Entregado'
  },
];

const HistorialRestaurant = () => {
  const navigation = useNavigation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Historial de pedidos</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView style={styles.container}>
        {ordersHistory.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderContainer} onPress={() => handleOrderPress(order)}>
            <View style={styles.orderHeader}>
              <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.avatar} />
              <View>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.orderDetails}>Número de pedido: <Text style={styles.boldText}>{order.orderNumber}</Text></Text>
              </View>
            </View>
            <Text style={styles.totalText}>Total: <Text style={styles.boldText}>${order.total}</Text></Text>
            <Text style={styles.pickupTimeText}>Hora de Pick-up: {order.pickupTime}</Text>
            <Text style={styles.deliveryTypeText}>Tipo de entrega: {order.deliveryType}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedOrder && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Pedido</Text>
              <Text style={styles.modalText}>Especificaciones: {selectedOrder.specifications}</Text>
              <Text style={styles.modalText}>Tipo de entrega: {selectedOrder.deliveryType}</Text>
              <Text style={styles.modalText}>Productos:</Text>
              {selectedOrder.items.map((item, index) => (
                <Text key={index} style={styles.modalItemText}>{item}</Text>
              ))}
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderColor: '#FFA500',
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickupTimeText: {
    fontSize: 14,
    marginBottom: 5,
  },
  deliveryTypeText: {
    fontSize: 14,
    marginBottom: 5,
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
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalItemText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HistorialRestaurant;
