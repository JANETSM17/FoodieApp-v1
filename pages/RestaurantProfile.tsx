import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; // Importa useAuth

const RestaurantProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Información');
  const [isToggleOn, setIsToggleOn] = useState(true);
  const navigation = useNavigation();
  const { logout } = useAuth(); // Obtiene la función logout de useAuth

  const handleToggleChange = () => setIsToggleOn(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require('../assets/images/logos/FoodieNegro.png')} style={styles.fBlack} />
      </View>
      
      <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>Wendys</Text>
      <Text style={styles.restaurantCode}>AS98DF2</Text>
      
      <View style={styles.toggleButtons}>
        <TouchableOpacity style={[styles.toggleButton, selectedTab === 'Información' && styles.selectedTab]} onPress={() => setSelectedTab('Información')}>
          <Text style={styles.toggleButtonText}>Información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleButton, selectedTab === 'Pedidos' && styles.selectedTab]} onPress={() => setSelectedTab('Pedidos')}>
          <Text style={styles.toggleButtonText}>Pedidos</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'Información' && (
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/images/restaurantes/LittleCaesars_Logo.png')} style={styles.icon} />
            <Text style={styles.infoText}>wendys@foodie.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/images/recursosExtras/home.png')} style={styles.icon} />
            <Text style={styles.infoText}>614-123-2345</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/images/recursosExtras/home.png')} style={styles.icon} />
            <Text style={styles.infoText}>Calle Marciano #114 Col. IV</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Tiempo de preparación por pedido:</Text>
          <View style={styles.preparationTimeRow}>
            <Text style={styles.preparationTimeText}>5 minutos</Text>
            <TouchableOpacity style={styles.editButtonSmall}>
              <Text style={styles.editButtonTextSmall}>Editar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Calificación como restaurante:</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>4 / 5</Text>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Eliminar cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={logout}> {/* Agrega onPress para logout */}
            <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTab === 'Pedidos' && (
        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Historial de pedidos</Text>
          <TouchableOpacity style={styles.orderItem}>
            <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.orderImage} />
            <View style={styles.orderDetails}>
              <Text style={styles.orderTitle}>Mike Tyson</Text>
              <Text style={styles.orderText}>Productos: 6</Text>
              <Text style={styles.orderText}>28/09/2023 8:38 am</Text>
            </View>
            <Text style={styles.orderTotal}>Total: $89</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderItem}>
            <Image source={require('../assets/images/comida/taco.png')} style={styles.orderImage} />
            <View style={styles.orderDetails}>
              <Text style={styles.orderTitle}>Mike Tyson</Text>
              <Text style={styles.orderText}>Productos: 6</Text>
              <Text style={styles.orderText}>28/09/2023 8:38 am</Text>
            </View>
            <Text style={styles.orderTotal}>Total: $89</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Menú</Text>
          <View style={styles.menuItem}>
            <Image source={require('../assets/images/comida/hamburger.png')} style={styles.menuItemImage} />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemText}>Hamburguesa</Text>
              <Text style={styles.menuItemDescription}>Pan brioche, carne de res, lechuga...</Text>
            </View>
            <Switch value={isToggleOn} onValueChange={handleToggleChange} />
          </View>

          <View style={styles.menuItem}>
            <Image source={require('../assets/images/comida/taco.png')} style={styles.menuItemImage} />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemText}>Tacos</Text>
              <Text style={styles.menuItemDescription}>Tortilla, carne, salsa...</Text>
            </View>
            <Switch value={isToggleOn} onValueChange={handleToggleChange} />
          </View>

          <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: What is Foodie?</Text>
            <Text style={styles.faqAnswer}>A: Foodie is an online platform that allows users to order food from cafeterias and restaurants within designated areas...</Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: How does Foodie work?</Text>
            <Text style={styles.faqAnswer}>A: Users can browse the menu of participating restaurants, select their desired items, and place an order...</Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: Is Foodie available for everyone?</Text>
            <Text style={styles.faqAnswer}>A: Foodie is available for registered users within the specified cafeterias or restaurants...</Text>
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

export default RestaurantProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restaurantCode: {
    fontSize: 16,
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffc107',
    borderRadius: 20,
    margin: 5,
  },
  selectedTab: {
    backgroundColor: '#ff9800',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  preparationTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preparationTimeText: {
    fontSize: 16,
  },
  editButtonSmall: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
  },
  editButtonTextSmall: {
    color: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  ordersSection: {
    paddingHorizontal: 10,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderText: {
    fontSize: 14,
    color: '#555',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#555',
  },
  faqItem: {
    marginBottom: 10,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
  },
  contactButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  fBlack: {
    width: 100,
    height: 25,
    marginBottom: 20,
    marginTop: 25,
  },
});

