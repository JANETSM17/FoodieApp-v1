import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; 
import { changePassword, getUserInfo } from '../services/demoService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [isEditInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(''); //por ahora no la usamos hasta agregar cloudinary
  const [joinDate, setJoinDate] = useState('');
  const [id, setID] = useState('');
  const [totalSpent, setTotalSpent] = useState('$368');
  const navigation = useNavigation();
  const { logout } = useAuth(); 
  const [userType, setUserType] = useState('');

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
      setLoading(true);
      try {
          const clientInfo = await getUserInfo();
          if (clientInfo) {
              setEmail(clientInfo.correo);
              setNombre(clientInfo.nombre);
              setPhone(clientInfo.telefono);
              setImage(clientInfo.imagen);
              setID(clientInfo._id)
              const fechaOrg = new Date(clientInfo.created_at)
              const dia = fechaOrg.getDate()
              const mes = fechaOrg.getMonth()+1
              const año = fechaOrg.getFullYear()
              setJoinDate(`${año}/${mes}/${dia}`);
          }
            setUserType('clientes');

      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
      }
  };

  const handlePasswordChange = async () => {
    console.log('Current password: ', oldPassword);
    console.log('New password: ', newPassword);
    console.log('UserType: ', userType);
    console.log('ID: ', id);
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

  const handleDeleteAccount = () => {
    Alert.alert('Cuenta eliminada con éxito');
    setDeleteAccountModalVisible(false);
  };

  const handleEditInfo = () => {
    Alert.alert('Información editada con éxito');
    setEditInfoModalVisible(false);
  };

  if (loading) {
    return (
        <View style={styles.containerActivityIndicator}>
            <ActivityIndicator size="large" color="#F5B000" />
        </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mi cuenta</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.image} />
        <Text style={styles.userFullName}>{nombre}</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#FFC107" style={styles.icon} />
          <Text style={styles.detailText}>{email}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#FFC107" style={styles.icon} />
          <Text style={styles.detailText}>{phone}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setEditInfoModalVisible(true)}>
        <Text style={styles.editButtonText}>Editar Información</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <Text style={styles.detailText}>
          Te uniste el: <Text style={styles.orangeText}>{joinDate}</Text>
        </Text>
        <View style={styles.divider} />
        <Text style={styles.detailText}>
          Total gastado: <Text style={styles.orangeText}>{totalSpent}</Text>
        </Text>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.actionButton} onPress={() => setChangePasswordModalVisible(true)}>
        <Text style={styles.actionButtonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => setDeleteAccountModalVisible(true)}>
        <Text style={styles.actionButtonText}>Eliminar cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={logout}>
        <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
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
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={phone}
              onChangeText={setPhone}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  mainContainer: {
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#FFA500',
    borderWidth: 3,
  },
  userFullName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'orange',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'black',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  orangeText: {
    color: 'orange',
  },
  editButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
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
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
});

export default UserProfile;
