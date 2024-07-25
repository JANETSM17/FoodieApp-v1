import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; 
import { changePassword, getUserInfo, deleteAccount, editInfoClient } from '../services/demoService';

const RestaurantProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [isEditInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const [isEditPrepTimeModalVisible, setEditPrepTimeModalVisible] = useState(false);
  const [isEditCodeModalVisible, setEditCodeModalVisible] = useState(false);
  const [name, setName] = useState('Wendys');
  const [code, setComedorCode] = useState('AS98DF2');
  const [email, setEmail] = useState('wendys@foodie.com');
  const [phone, setPhone] = useState('614-123-2345');
  const [address, setAddress] = useState('Calle Marciano #114 Col. IV');
  const [prepTime, setPrepTime] = useState('5 minutos');
  const [rating, setRating] = useState('4 / 5');
  const [isFaqVisible, setIsFaqVisible] = useState(false);
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [id, setID] = useState('');
  const [userType, setUserType] = useState('');

  const toggleFaqVisibility = () => setIsFaqVisible(!isFaqVisible);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
      setLoading(true);
      try {
          const clientInfo = await getUserInfo();
          if (clientInfo) {
              setEmail(clientInfo.correo);
              setName(clientInfo.nombre);
              setPhone(clientInfo.telefono);
              setAddress(clientInfo.direccion);
              setRating(`${clientInfo.calif}/5`);
              setPrepTime(clientInfo.min_espera);
              setComedorCode(clientInfo.clave)
              setID(clientInfo._id)
          }
            setUserType('proveedores');

      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
      }
  };

  const handlePasswordChange = async () => {
    setLoading(true);
        try {
            const changed = await changePassword(oldPassword, newPassword, userType, id);
            if (changed.status === 'success') {
              Alert.alert('Contraseña cambiada con éxito');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error al cambiar contraseña');
        } finally {
            setChangePasswordModalVisible(false);
            setLoading(false);
        }
  };

  const handleDeleteAccount = async () => {
    console.log(deletePassword);
    console.log(id);
    console.log(userType);
    setLoading(true);
        try {
            const deleted = await deleteAccount(deletePassword, id , userType);
            if (deleted.status === 'success') {
              logout()
              setLoading(false);
              Alert.alert('Cuenta eliminada con éxito');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error al eliminar cuenta');
        } 
  };

  const handleEditInfo = async () => {
    setLoading(true);
        try {
            const changed = await editInfoClient(name, phone, userType, id);
            if (changed.status === 'success') {
              Alert.alert('Información actualizada con éxito');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error al actualizar información');
        } finally {
            setEditInfoModalVisible(false);
            setLoading(false);
        }
  };

  const handleEditPrepTime = async () => {
    setLoading(true);
        try {
            const changed = await editInfoClient(prepTime, userType, id);
            if (changed.status === 'success') {
              Alert.alert('Tiempo de preparación actualizado con éxito');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error al actualizar tiempo de preparación');
        } finally {
            setEditPrepTimeModalVisible(false);
            setLoading(false);
        }
  };

  const handleEditCode = async () => {
    setLoading(true);
        try {
            const changed = await editInfoClient(code, userType, id);
            if (changed.status === 'success') {
              Alert.alert('Código de comedor actualizado con éxito');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error al actualizar código de comedor');
        } finally {
            setEditCodeModalVisible(false);
            setLoading(false);
        }
  };

  if (loading) {
    return (
        <View style={styles.containerActivityIndicator}>
            <ActivityIndicator size="large" color="#F5B000" />
        </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
        <View style={{ width: 40 }}></View>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.restaurantImage} />
      </View>
      <Text style={styles.restaurantName}>{name}</Text>
      <TouchableOpacity onPress={() => setEditCodeModalVisible(true)}>
      <Text style={styles.restaurantCode}>{code}</Text>
      </TouchableOpacity>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#FFA500" style={styles.icon} />
            <Text style={styles.infoText}>{email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#FFA500" style={styles.icon} />
            <Text style={styles.infoText}>{phone}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#FFA500" style={styles.icon} />
            <Text style={styles.infoText}>{address}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditInfoModalVisible(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Tiempo de preparación por pedido:</Text>
          <Text style={styles.infoText}>{prepTime}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditPrepTimeModalVisible(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
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

      <Modal
        transparent={true}
        animationType="fade"
        visible={isEditInfoModalVisible}
        onRequestClose={() => setEditInfoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Información</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditInfo}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setEditInfoModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isEditPrepTimeModalVisible}
        onRequestClose={() => setEditPrepTimeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Tiempo de Preparación</Text>
            <TextInput
              style={styles.input}
              placeholder="Tiempo de preparación"
              value={prepTime}
              onChangeText={setPrepTime}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditPrepTime}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setEditPrepTimeModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isEditCodeModalVisible}
        onRequestClose={() => setEditCodeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Código de Comedor</Text>
            <TextInput
              style={styles.input}
              placeholder="Código de Comedor"
              value={code}
              onChangeText={setComedorCode}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditCode}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setEditCodeModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default RestaurantProfile;

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
  logo: {
    width: 180,
    height: 45,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#FFA500',
    borderWidth: 3,
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
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
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
    textAlign: 'center',
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
  modalButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalWarningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'red',
  },
  modalWarningText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});
