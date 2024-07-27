import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuth from "../hooks/useAuth";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../services/demoService';

const ordersToAccept = [
  {
    id: 7,
    customerName: 'Mike Tyson',
    orderNumber: 27,
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
    status: 'Esperando confirmacion'
  },
  {
    id: 8,
    customerName: 'Mike Tyson',
    orderNumber: 28,
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
    status: 'Esperando confirmacion'
  },
  {
    id: 9,
    customerName: 'Mike Tyson',
    orderNumber: 29,
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
    status: 'Esperando confirmacion'
  },
];

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
    status: 'Preparando'
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
    status: 'Preparando'
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
  const [selectedTab, setSelectedTab] = useState('ToAccept');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [orders, setOrders] = useState(ordersInProgress);
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

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
        {selectedTab === 'ToAccept' && (
        <>
          <Text style={styles.statusReadyText}>Estatus: {order.status}</Text>
          <View style={styles.acceptRejectContainer}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptRejectButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.acceptRejectButtonText}>Rechazar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {selectedTab === 'InProgress' && (
        <>
          <Text style={styles.statusReadyText}>Estatus: {order.status}</Text>
          {order.deliveryType === 'Foodie-Box' ? (
            <View style={styles.foodieBoxContainer}>
              <Text style={styles.foodieBoxText}>Al terminar lleva a la FoodieBox</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.readyButton}>
              <Text style={styles.readyButtonText}>Pasar a listo</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      {selectedTab === 'Ready' && (
        <>
          <Text style={styles.statusReadyText}>Estatus: {order.status}</Text>
          {order.deliveryType === 'Foodie-Box' ? (
            <View style={styles.foodieBoxContainer}>
              <Text style={styles.foodieBoxText}>En FoodieBox</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.deliveredButton}>
              <Text style={styles.deliveredButtonText}>Entregado</Text>
            </TouchableOpacity>
          )}
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

const handleAddProductPress = () => {
  setAddProductModalVisible(true);
};

const handleAddProduct = () => {
  setAddProductModalVisible(false);
};

const handleCloseAddProductModal = () => {
  setAddProductModalVisible(false);
};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.tabContainer}>
      <TouchableOpacity style={[styles.tabButton, selectedTab === 'ToAccept' && styles.activeTab]} onPress={() => setSelectedTab('ToAccept')}>
          <Text style={[styles.tabText, selectedTab === 'ToAccept' && styles.activeTabText]}>Por aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'InProgress' && styles.activeTab]} onPress={() => setSelectedTab('InProgress')}>
          <Text style={[styles.tabText, selectedTab === 'InProgress' && styles.activeTabText]}>En curso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'Ready' && styles.activeTab]} onPress={() => setSelectedTab('Ready')}>
          <Text style={[styles.tabText, selectedTab === 'Ready' && styles.activeTabText]}>Listos</Text>
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
        {selectedTab === 'ToAccept' && renderOrders(ordersToAccept)}
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
              <Text style={styles.modalText}>Especificaciones: {selectedOrder.specifications}</Text>
              <Text style={styles.modalText}>Total: ${selectedOrder.total}</Text>
              <Text style={styles.modalText}>Hora de Pick-up: {selectedOrder.pickupTime}</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButtonClose} onPress={handleCloseModal}>
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuRestaurant')} style={styles.navButton}>
          <Ionicons name="restaurant-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddProductPress} style={styles.navButton}>
          <Ionicons name="add-circle-outline" size={30} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HistorialRestaurant')} style={styles.navButton}>
          <Ionicons name="time-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RestaurantProfile')} style={styles.navButton}>
          <Ionicons name="person-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isAddProductModalVisible}
        onRequestClose={handleCloseAddProductModal}
      >
        <View style={styles.addProductModalContainer}>
          <View style={styles.addProductModalContent}>
            <Text style={styles.addProductModalTitle}>Agregar producto</Text>
            <TouchableOpacity style={styles.imageUploadButton}>
              <Ionicons name="camera-outline" size={50} color="gray" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={productName}
              onChangeText={setProductName}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio del producto"
              value={productPrice}
              onChangeText={setProductPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción del producto"
              value={productDescription}
              onChangeText={setProductDescription}
            />
            <View style={styles.addProductModalButtonsContainer}>
              <TouchableOpacity style={styles.addProductModalButton} onPress={handleAddProduct}>
                <Text style={styles.addProductModalButtonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addProductModalButtonCancel} onPress={handleCloseAddProductModal}>
                <Text style={styles.addProductModalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
  addProductModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addProductModalContent: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  addProductModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageUploadButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  addProductModalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  addProductModalButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  addProductModalButtonCancel: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  addProductModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  acceptRejectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  acceptButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginRight: 4,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#aaa',
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginLeft: 4,
    alignItems: 'center',
  },
  acceptRejectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  foodieBoxContainer: {
    backgroundColor: '#aaa',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginTop: 9,
  },
  foodieBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  readyButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginTop: 9,
  },
  readyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deliveredButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginTop: 9,
  },
  deliveredButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtonClose: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 4,
  },
});
