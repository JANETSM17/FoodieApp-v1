import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; 

const UserProfile = () => {
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [isEditInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [email, setEmail] = useState('laurabl@gmail.com');
  const [phone, setPhone] = useState('614-123-2345');
  const [joinDate] = useState('1/Mayo/2024');
  const [totalSpent] = useState('$368');
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

  const handleEditInfo = () => {
    Alert.alert('Información editada con éxito');
    setEditInfoModalVisible(false);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mi cuenta</Text>
        <View style={{ width: 40 }}></View> {/* Placeholder for alignment */}
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/fotosCliente/FoxClient.jpeg')} style={styles.image} />
        <Text style={styles.userFullName}>Laura Batista Luna</Text>
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
        <Text style={styles.detailText}>Te uniste el: <Text style={styles.orangeText}>{joinDate}</Text></Text>
        <View style={styles.divider} />
        <Text style={styles.detailText}>Total gastado: <Text style={styles.orangeText}>{totalSpent}</Text></Text>
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

      {/* Edit Information Modal */}
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
    backgroundColor: '#F8F8F8',
    borderColor: '#FFA500',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orangeText: {
    color: 'orange',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    width: '60%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
