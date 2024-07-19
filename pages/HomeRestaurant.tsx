import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
    status: 'Listo'
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
    status: 'No Listo'
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
    status: 'Listo'
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
    status: 'Entregado',
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
    status: 'Entregado',
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
    status: 'Entregado',
    deliveryType: 'Foodie-Box'
  },
];

const HomeRestaurant = () => {
  const [selectedTab, setSelectedTab] = useState('InProgress');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const navigation = useNavigation();

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
        <Text style={styles.pickupStatusText}>Estado: <Text style={styles.boldText}>{order.status}</Text></Text>
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
    // Aquí puedes manejar la lógica de cancelación del pedido
    setModalVisible(false);
  };

  const handleAddProductPress = () => {
    setAddProductModalVisible(true);
  };

  const handleCloseAddProductModal = () => {
    setAddProductModalVisible(false);
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductCategory('');
  };

  const handleAddProduct = () => {
    // Lógica para agregar un producto
    setAddProductModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
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
        {selectedTab === 'InProgress' && renderOrders(ordersInProgress)}
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
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuRestaurant')} style={styles.navButton}>
          <Ionicons name="restaurant-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddProductPress} style={styles.navButton}>
          <Ionicons name="add-circle-outline" size={30} color="#FFA500" />
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
            <TextInput
              style={styles.input}
              placeholder="Categoría"
              value={productCategory}
              onChangeText={setProductCategory}
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
  pickupStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFA500',
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
    width: 300,
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
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
});
