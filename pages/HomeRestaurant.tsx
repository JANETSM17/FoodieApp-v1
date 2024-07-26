import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuth from "../hooks/useAuth";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../services/demoService';

const ordersInProgress = [
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
    status: 'Solicitud Enviada'
  },
  {
    id: 2,
    customerName: 'Mike Tyson',
    orderNumber: 22,
    phoneNumber: '(614)-216-78-27',
    items: [
      '2x Pizza Piña',
      '1x Hamburguesa',
      '4x Coca-Cola',
    ],
    specifications: 'Sin especificaciones',
    total: 250,
    pickupTime: '11:59 am',
    deliveryType: 'Pick-Up',
    status: 'Preparando'
  },
  {
    id: 3,
    customerName: 'Mike Tyson',
    orderNumber: 23,
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
    status: 'Listo para recoger'
  },
];

const ordersReady = [
  {
    id: 4,
    customerName: 'Mike Tyson',
    orderNumber: 24,
    phoneNumber: '(614)-216-78-27',
    items: [
      '2x Pizza Piña',
      '1x Hamburguesa',
      '4x Coca-Cola',
    ],
    specifications: 'Sin especificaciones',
    total: 250,
    pickupTime: '11:59 am',
    status: 'Listo para recoger',
    deliveryType: 'Foodie-Box'
  },
  {
    id: 5,
    customerName: 'Mike Tyson',
    orderNumber: 25,
    phoneNumber: '(614)-216-78-27',
    items: [
      '2x Pizza Piña',
      '1x Hamburguesa',
      '4x Coca-Cola',
    ],
    specifications: 'Sin especificaciones',
    total: 250,
    pickupTime: '11:59 am',
    status: 'Listo para recoger',
    deliveryType: 'Pick-Up'
  },
  {
    id: 6,
    customerName: 'Mike Tyson',
    orderNumber: 26,
    phoneNumber: '(614)-216-78-27',
    items: [
      '2x Pizza Piña',
      '1x Hamburguesa',
      '4x Coca-Cola',
    ],
    specifications: 'Sin especificaciones',
    total: 250,
    pickupTime: '11:59 am',
    status: 'Listo para recoger',
    deliveryType: 'Foodie-Box'
  },
];

const HomeRestaurant = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('InProgress');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [orders, setOrders] = useState(ordersInProgress);

  const navigation = useNavigation();

  useEffect(() => {
    handleLoad();
}, []);

const handleLoad = async () => {
    setLoading(true);
    try {
        const clientInfo = await getUserInfo();
        if (!clientInfo) {
            logout();
            return;
        }

        await AsyncStorage.setItem('clientEmail', clientInfo.correo);

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

  const renderOrders = (orders) => {
    const filteredOrders = selectedFilter === 'All' ? orders : orders.filter(order => order.deliveryType === selectedFilter);
    return filteredOrders.map(order => (
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
        {selectedTab === 'InProgress' ? (
          <TouchableOpacity style={styles.statusButton} onPress={() => handleStatusPress(order)}>
            <Text style={styles.statusButtonText}>{order.status}</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.statusReadyText}>{order.status}</Text>
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    ));
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = () => {
    setModalVisible(false);
  };

  const handleStatusPress = (order) => {
    setSelectedOrder(order);
    setStatusModalVisible(true);
  };

  const handleStatusChange = (status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: status } : order
      )
    );
    setStatusModalVisible(false);
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
        <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'InProgress' && styles.activeTab]} onPress={() => setSelectedTab('InProgress')}>
          <Text style={[styles.tabText, selectedTab === 'InProgress' && styles.activeTabText]}>Pedidos en curso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'Ready' && styles.activeTab]} onPress={() => setSelectedTab('Ready')}>
          <Text style={[styles.tabText, selectedTab === 'Ready' && styles.activeTabText]}>Pedidos listos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, selectedFilter === 'All' && styles.activeFilter]} onPress={() => setSelectedFilter('All')}>
          <Text style={[styles.filterText, selectedFilter === 'All' && styles.activeFilterText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedFilter === 'Foodie-Box' && styles.activeFilter]} onPress={() => setSelectedFilter('Foodie-Box')}>
          <Text style={[styles.filterText, selectedFilter === 'Foodie-Box' && styles.activeFilterText]}>Foodie-Box</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedFilter === 'Pick-Up' && styles.activeFilter]} onPress={() => setSelectedFilter('Pick-Up')}>
          <Text style={[styles.filterText, selectedFilter === 'Pick-Up' && styles.activeFilterText]}>Pick-Up</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {selectedTab === 'InProgress' && renderOrders(orders)}
        {selectedTab === 'Ready' && renderOrders(ordersReady)}
      </ScrollView>
      {selectedOrder && (
        <Modal
          animationType="slide"
          transparent={true}
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
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancelOrder}>
                  <Text style={styles.modalButtonText}>Cancelar pedido</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <Modal
        transparent={true}
        animationType="fade"
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Estado</Text>
            <TouchableOpacity style={styles.statusOption} onPress={() => handleStatusChange('Solicitud Enviada')}>
              <Text style={styles.statusOptionText}>Solicitud Enviada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statusOption} onPress={() => handleStatusChange('Preparando')}>
              <Text style={styles.statusOptionText}>Preparando</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statusOption} onPress={() => handleStatusChange('Listo para recoger')}>
              <Text style={styles.statusOptionText}>Listo para recoger</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setStatusModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuRestaurant')} style={styles.navButton}>
          <Ionicons name="restaurant-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.navButton}>
          <Ionicons name="add-circle-outline" size={30} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HistorialRestaurant')} style={styles.navButton}>
          <Ionicons name="time-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RestaurantProfile')} style={styles.navButton}>
          <Ionicons name="person-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeRestaurant;

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
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'black',
    width: '100%',
  },
  logo: {
    width: 180,
    height: 45,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#FFA500',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterText: {
    color: '#FFA500',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  statusButton: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusReadyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  sendButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalItemText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusOption: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  statusOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    borderRadius: 25,
    height: 60,
    alignItems: 'center',
    margin: 10,
  },
  navButton: {
    alignItems: 'center',
  },
});
