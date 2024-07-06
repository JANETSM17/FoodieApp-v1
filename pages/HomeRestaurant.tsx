import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header'; // Importa el componente Header

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
    deliveryType: 'Foodie-Box'
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
    deliveryType: 'Pick-Up'
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
    deliveryType: 'Foodie-Box'
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

  const renderOrders = (orders) => {
    const filteredOrders = selectedFilter === 'All' ? orders : orders.filter(order => order.deliveryType === selectedFilter);
    return filteredOrders.map(order => (
      <View key={order.id} style={styles.orderContainer}>
        <View style={styles.customerInfo}>
          <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.avatar} />
          <View>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.orderDetails}>Número de pedido: <Text style={styles.boldText}>{order.orderNumber}</Text></Text>
            <Text style={styles.phoneNumber}>{order.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.itemsList}>
            {order.items.map((item, index) => (
              <Text key={index} style={styles.itemText}>{index + 1}. {item}</Text>
            ))}
          </View>
          <View style={styles.specifications}>
            <Text style={styles.specificationsText}>{order.specifications}</Text>
          </View>
          <View style={styles.pickupInfo}>
            <Text style={styles.totalText}>Total: <Text style={styles.boldText}>${order.total}</Text></Text>
            <Text style={styles.pickupTimeText}>Hora de Pick-up: {order.pickupTime}</Text>
            <View style={styles.pickupStatus}>
              <Image source={require('../assets/images/recursosExtras/bolsaRB.png')} style={styles.pickupIcon} />
              <Text style={styles.pickupStatusText}>{order.status || 'Listo'}</Text>
              <Text style={styles.deliveryType}>{order.deliveryType}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.cancelOrderText}>Cancelar pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Header /> {/* Implementa el componente Header */}
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
    </View>
  );
};

export default HomeRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  phoneNumber: {
    fontSize: 14,
    color: '#555',
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsList: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 5,
  },
  specifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  specificationsText: {
    fontSize: 14,
    color: '#999',
  },
  pickupInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickupTimeText: {
    fontSize: 14,
    marginVertical: 5,
  },
  pickupStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pickupIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  pickupStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  cancelOrderText: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'black',
  },
  deliveryType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
    marginLeft: 10,
  },
});
