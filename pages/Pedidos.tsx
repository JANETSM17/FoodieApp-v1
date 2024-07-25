import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const pendingOrders = [
  {
    id: '1',
    restaurant: 'Cafeteria UTCH BIS',
    price: '$250',
    status: 'Solicitud enviada',
    image: require('../assets/images/restaurantes/utch_logo.png'),
    statusImage: require('../assets/images/recursosExtras/bolsaB.png'),
    foodieBox: '1k212',
  },
  {
    id: '2',
    restaurant: 'Domino\'s Pizza',
    price: '$89',
    status: 'Preparando',
    image: require('../assets/images/restaurantes/Dominos_Logo.png'),
    statusImage: require('../assets/images/recursosExtras/bolsaRB.png'),
    foodieBox: '2d345',
  },
  {
    id: '3',
    restaurant: 'Pizza Hut',
    price: '$28',
    status: 'Listo para recoger',
    image: require('../assets/images/restaurantes/PizzaHot_Logo.png'),
    statusImage: require('../assets/images/recursosExtras/BolsaCB.png'),
    foodieBox: '3c678',
  },
];

const pastOrders = [
  {
    id: '4',
    restaurant: 'Domino\'s Pizza',
    date: '19/agosto/2023 10:59 am',
    total: '$89',
    image: require('../assets/images/restaurantes/Dominos_Logo.png'),
  },
  {
    id: '5',
    restaurant: 'Pizza Hut',
    date: '19/agosto/2023 10:58 am',
    total: '$28',
    image: require('../assets/images/restaurantes/PizzaHot_Logo.png'),
  },
  {
    id: '6',
    restaurant: 'KFC',
    date: '20/agosto/2023 12:00 pm',
    total: '$45',
    image: require('../assets/images/restaurantes/Dominos_Logo.png'), 
  },
  {
    id: '7',
    restaurant: 'Burger King',
    date: '20/agosto/2023 1:15 pm',
    total: '$35',
    image: require('../assets/images/restaurantes/Dominos_Logo.png'), 
  },
  {
    id: '8',
    restaurant: 'Subway',
    date: '21/agosto/2023 2:30 pm',
    total: '$22',
    image: require('../assets/images/restaurantes/Dominos_Logo.png'), 
  },
  {
    id: '9',
    restaurant: 'Starbucks',
    date: '21/agosto/2023 3:45 pm',
    total: '$18',
    image: require('../assets/images/restaurantes/Dominos_Logo.png'), 
  },
];

const Pedidos = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePendingOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const renderPastOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderHistoryItem}>
      <Image source={item.image} style={styles.orderImage} />
      <View>
        <Text>{item.restaurant}</Text>
        <Text>{item.date}</Text>
        <Text>Total: {item.total}</Text>
      </View>
    </TouchableOpacity>
  );

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
            <Image source={order.image} style={styles.orderImage} />
            <View>
              <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
              <Text style={styles.orderPrice}>{order.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
        </View>
        <FlatList
          data={pastOrders}
          renderItem={renderPastOrder}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>

      {selectedOrder && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Pedido</Text>
              <Image source={selectedOrder.statusImage} style={styles.modalImage} />
              <Text>Restaurante: {selectedOrder.restaurant}</Text>
              <Text>Precio: {selectedOrder.price}</Text>
              <Text>Estado: {selectedOrder.status}</Text>
              <Text>Foodie-box: {selectedOrder.foodieBox}</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
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
