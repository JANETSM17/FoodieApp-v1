import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Información');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Foodie</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.image} />
        <Text style={styles.userFullName}>Laura Batista Luna</Text>
        <Text style={styles.userName}>Laura Batista</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Información' && styles.activeTab]}
          onPress={() => setSelectedTab('Información')}
        >
          <Text style={[styles.tabText, selectedTab === 'Información' && styles.activeTabText]}>Información</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Pedidos' && styles.activeTab]}
          onPress={() => setSelectedTab('Pedidos')}
        >
          <Text style={[styles.tabText, selectedTab === 'Pedidos' && styles.activeTabText]}>Pedidos</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'Información' ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>laurabl@gmail.com</Text>
          <Text style={styles.detailText}>614-123-2345</Text>
          <Text style={styles.detailText}>Te uniste el: <Text style={styles.orangeText}>1/Mayo/2024</Text></Text>
          <Text style={styles.detailText}>Total gastado: <Text style={styles.orangeText}>$368</Text></Text>
        </View>
      ) : (

        <ScrollView style={styles.ordersContainer}>
          <View style={styles.orderSection}>
            <Text style={styles.sectionTitle}>Pedido pendiente en:</Text>
            <View style={styles.orderItem}>
              <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.orderImage} />
              <View>
                <Text style={styles.orderLocation}>Cafeteria UTCH BIS</Text>
                <Text style={styles.orderPrice}>$250</Text>
              </View>
            </View>
          </View>

          <View style={styles.orderSection}>
            <Text style={styles.sectionTitle}>Historial de pedidos</Text>
            <View style={styles.orderItem}>
              <Image source={require('../assets/images/restaurantes/Dominos_Logo.png')} style={styles.orderImage} />
              <View>
                <Text style={styles.orderDate}>19/agosto/2023 10:59 am</Text>
                <Text style={styles.orderTotal}>Total: $89</Text>
              </View>
            </View>
            <View style={styles.orderItem}>
              <Image source={require('../assets/images/restaurantes/PizzaHot_Logo.png')} style={styles.orderImage} />
              <View>
                <Text style={styles.orderDate}>19/agosto/2023 10:58 am</Text>
                <Text style={styles.orderTotal}>Total: $28</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFBF00',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userFullName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
  },
  activeTab: {
    backgroundColor: '#FFBF00',
  },
  tabText: {
    fontSize: 16,
    color: 'white',
  },
  activeTabText: {
    color: 'white',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  orangeText: {
    color: 'orange',
    fontWeight: 'bold',
  },
  ordersContainer: {
    flex: 1,
  },
  orderSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  orderLocation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderPrice: {
    fontSize: 16,
    color: 'orange',
  },
  orderDate: {
    fontSize: 16,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
