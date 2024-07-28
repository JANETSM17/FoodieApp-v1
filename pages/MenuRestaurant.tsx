import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Modal, TextInput, Alert, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { deleteProductoMenu, getProductosProveedor, getUserInfo, updateEstatusProducto, updateProducto } from '../services/demoService';

const menuItems = [
  {
    id: '1',
    name: 'Burrito de Asado',
    price: 8.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Asado rojo, ...',
    category: 'Comida',
    isActive: true,
  },];

const categories = ['Comida', 'Bebidas', 'Frituras', 'Dulces', 'Otros'];

const MenuRestaurant = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Comida');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCategory, setEditedCategory] = useState(categories[0]);
  const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    handleLoad();
  }, []);

const handleLoad = async () => {
    setLoading(true);
    try {
      const clientInfo = await getUserInfo();

      if(clientInfo){
        const productos = await getProductosProveedor(clientInfo._id)
        if(productos){
          setItems(productos);
        }
      }

        
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
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

  const handleToggleChange = async (id, currentState) => {
    setLoading(true)
    console.log(currentState)
    const newState = !currentState
    console.log('NewState:', newState)
    try {
      const changed = await updateEstatusProducto(newState, id);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Trono', error.message || 'Error desconocido');
    } finally {
      handleLoad()
    }
  };

  const handleDeletePress = async (id) => {
    setItemToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true)
    const id = itemToDelete
    try {
      const deleted = await deleteProductoMenu(id);
      if(deleted.status === 'success'){
        Alert.alert("Producto eliminado")
      }
    } catch (error) {
      console.error('Error deleting:', error);
      Alert.alert('Trono', error.message || 'Error desconocido');
    } finally {
      setIsDeleteModalVisible(false);
      handleLoad()
    }
  };

  const handleEditPress = (item) => {
    console.log(item)
    setItemToEdit(item.id);
    setEditedName(item.nombre);
    setEditedPrice(item.precio.toString());
    setEditedDescription(item.descripcion);
    setEditedCategory(item.categoria);
    setIsEditModalVisible(true);
  };

  const handleEditSave = async() => {
    setLoading(true)
    try {
      const modified = await updateProducto(itemToEdit, editedName, editedDescription, editedPrice, editedCategory)
      //console.log('Esto me llega: ', itemToEdit, editedName, editedDescription, editedPrice, editedCategory)
       if(modified.status === 'success'){
         Alert.alert("Producto actualizado")
       }
    } catch (error) {
      console.error('Error updating:', error);
      Alert.alert('Trono', error.message || 'Error desconocido');
    } finally {
      setIsEditModalVisible(false);
      handleLoad()
    }
  };

  const filteredItems = items.filter((item) => item.categoria === selectedCategory.toLowerCase());

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Menú</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.filterContainer}>
        {categories.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            style={[styles.filterButton, selectedCategory === categoria && styles.selectedFilterButton]}
            onPress={() => setSelectedCategory(categoria)}
          >
            <Text style={[styles.filterButtonText, selectedCategory === categoria && styles.selectedFilterButtonText]}>
              {categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.container}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.imagen }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.nombre}</Text>
              <Text style={styles.itemDescription}>{item.descripcion}</Text>
              <Text style={styles.itemPrice}>${item.precio}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPress(item)}
              >
                <Ionicons name="pencil-outline" size={24} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePress(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
              <Switch
                value={item.active}
                onValueChange={() => handleToggleChange(item.id, item.active)}
                trackColor={{ true: 'orange', false: 'grey' }}
                thumbColor={item.active ? 'orange' : 'white'}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Eliminar producto?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleDeleteConfirm}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setIsDeleteModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Producto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio del producto"
              value={editedPrice}
              onChangeText={setEditedPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción del producto"
              value={editedDescription}
              onChangeText={setEditedDescription}
            />
            <RNPickerSelect
              onValueChange={(value) => setEditedCategory(value)}
              items={categories.map((category) => ({
                label: category,
                value: category.toLowerCase(),
              }))}
              style={pickerSelectStyles}
              value={editedCategory.toLowerCase()}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditSave}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  selectedFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedFilterButtonText: {
    color: '#FFA500',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginBottom: 5,
    marginRight: 15,
  },
  deleteButton: {
    marginBottom: 5,
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
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 10,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default MenuRestaurant;
