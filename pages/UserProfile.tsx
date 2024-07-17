import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; 

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Información');
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const navigation = useNavigation();
  const { logout } = useAuth(); 

  const handlePasswordChange = () => {
    Alert.alert('Contraseña cambiada con éxito');
    setChangePasswordModalVisible(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Cuenta eliminada con éxito');
    setDeleteAccountModalVisible(false);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require('../assets/images/logos/FoodieNegro.png')} style={styles.fBlack} />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.image} />
        <Text style={styles.userFullName}>Laura Batista Luna</Text>
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

          {/* Additional Buttons */}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Información</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setChangePasswordModalVisible(true)}>
            <Text style={styles.actionButtonText}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setDeleteAccountModalVisible(true)}>
            <Text style={styles.actionButtonText}>Eliminar cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={logout}>
            <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
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

      {/* Change Password Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isChangePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña Actual"
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva Contraseña"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handlePasswordChange}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setChangePasswordModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isDeleteAccountModalVisible}
        onRequestClose={() => setDeleteAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalWarningTitle}>¡Cuidado!</Text>
            <Text style={styles.modalWarningText}>
              Estás a punto de eliminar tu cuenta. Una vez eliminada tu cuenta NO PODRAS RECUPERARLA, todo será eliminado de forma permanente.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleDeleteAccount}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setDeleteAccountModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
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
  fBlack: {
    width: 100,
    height: 25,
    marginBottom: 20,
    marginTop: 25,
  },
  editButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalWarningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  modalWarningText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FFBF00',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '50%',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#B3B3B3',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '50%',
  },
});

export default UserProfile;
