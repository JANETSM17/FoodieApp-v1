import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; 
import Header2 from '../components/Header2'; 

const RestaurantProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Información');
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [name, setName] = useState('Wendys');
  const [code, setComedorCode] = useState('AS98DF2');
  const [email, setEmail] = useState('wendys@foodie.com');
  const [phone, setPhone] = useState('614-123-2345');
  const [address, setAddress] = useState('Calle Marciano #114 Col. IV');
  const [prepTime, setPrepTime] = useState('5 minutos');
  const [rating, setRating] = useState('4 / 5');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPrepTime, setIsEditingPrepTime] = useState(false);
  const [isFaqVisible, setIsFaqVisible] = useState(false);
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleToggleChange = () => setIsToggleOn(previousState => !previousState);
  const toggleFaqVisibility = () => setIsFaqVisible(!isFaqVisible);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
        <View style={{ width: 40 }}></View>
      </View>

      <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{name}</Text>
      <Text style={styles.restaurantCode}>{code}</Text>

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
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color="#FFA500" style={styles.icon} />
              {isEditingInfo ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              ) : (
                <Text style={styles.infoText}>{email}</Text>
              )}
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color="#FFA500" style={styles.icon} />
              {isEditingInfo ? (
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                />
              ) : (
                <Text style={styles.infoText}>{phone}</Text>
              )}
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#FFA500" style={styles.icon} />
              {isEditingInfo ? (
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                />
              ) : (
                <Text style={styles.infoText}>{address}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditingInfo(!isEditingInfo)}>
              <Text style={styles.editButtonText}>{isEditingInfo ? 'Guardar' : 'Editar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Tiempo de preparación por pedido:</Text>
            {isEditingPrepTime ? (
              <TextInput
                style={styles.input}
                value={prepTime}
                onChangeText={setPrepTime}
              />
            ) : (
              <Text style={styles.infoText}>{prepTime}</Text>
            )}
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditingPrepTime(!isEditingPrepTime)}>
              <Text style={styles.editButtonText}>{isEditingPrepTime ? 'Guardar' : 'Editar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Calificación como restaurante:</Text>
            <Text style={styles.infoText}>{rating}</Text>
          </View>

          <View style={styles.infoCard}>
            <TouchableOpacity onPress={toggleFaqVisibility}>
              <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
            </TouchableOpacity>
            {isFaqVisible && (
              <View>
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
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Eliminar cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={logout}>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    width: 180,
    height: 45,
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
    color: '#FFA500',
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
  infoCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
    width: '60%',
    alignSelf: 'center',
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
});
