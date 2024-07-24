import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Modal, TextInput, Alert, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  {
    id: '1',
    name: 'Burrito de Asado',
    price: 8.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Asado rojo, ...',
    category: 'Comida',
    isActive: true,
  },
  {
    id: '2',
    name: 'Pizza Italiana',
    price: 15.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Pepperoni, queso mozarela...',
    category: 'Comida',
    isActive: true,
  },
  {
    id: '3',
    name: 'Coca-Cola',
    price: 2.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Bebida refrescante...',
    category: 'Bebidas',
    isActive: true,
  },
  {
    id: '4',
    name: 'Jugo de Naranja',
    price: 3.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Jugo natural...',
    category: 'Bebidas',
    isActive: true,
  },
  {
    id: '5',
    name: 'Papitas',
    price: 1.50,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Papas fritas...',
    category: 'Frituras',
    isActive: true,
  },
  {
    id: '6',
    name: 'Chicharrones',
    price: 2.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Chicharrones crujientes...',
    category: 'Frituras',
    isActive: true,
  },
  {
    id: '7',
    name: 'Paleta de Chocolate',
    price: 1.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Paleta de chocolate...',
    category: 'Dulces',
    isActive: true,
  },
  {
    id: '8',
    name: 'Caramelo',
    price: 0.50,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Caramelo dulce...',
    category: 'Dulces',
    isActive: true,
  },
  {
    id: '9',
    name: 'Torta de Jamón',
    price: 5.00,
    image: require('../assets/images/comida/pizza.png'),
    description: 'Torta con jamón...',
    category: 'Otros',
    isActive: true,
  },
  {
    id: '10',
    name: 'Ensalada',
    price: 7.00,
    image: require('../assets/images/comida/burrito.png'),
    description: 'Ensalada fresca...',
    category: 'Otros',
    isActive: true,
  },
];

const categories = ['Comida', 'Bebidas', 'Frituras', 'Dulces', 'Otros'];

const MenuRestaurant = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState(menuItems);
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

  const handleToggleChange = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleDeletePress = (id) => {
    setItemToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete));
    setIsDeleteModalVisible(false);
  };

  const handleEditPress = (item) => {
    setItemToEdit(item);
    setEditedName(item.name);
    setEditedPrice(item.price.toString());
    setEditedDescription(item.description);
    setEditedCategory(item.category);
    setEditedImage(item.image);
    setIsEditModalVisible(true);
  };

  const handleEditSave = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemToEdit.id
          ? { ...item, name: editedName, price: parseFloat(editedPrice), description: editedDescription, category: editedCategory, image: editedImage }
          : item
      )
    );
    setIsEditModalVisible(false);
  };

  const filteredItems = items.filter((item) => item.category === selectedCategory);

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
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, selectedCategory === category && styles.selectedFilterButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.filterButtonText, selectedCategory === category && styles.selectedFilterButtonText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.container}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPress(item)}
              >
                <Ionicons name="pencil-outline" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePress(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
              <Switch
                value={item.isActive}
                onValueChange={() => handleToggleChange(item.id)}
                trackColor={{ true: 'orange', false: 'grey' }}
                thumbColor={item.isActive ? 'orange' : 'white'}
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
            <Picker
              selectedValue={editedCategory}
              style={styles.picker}
              onValueChange={(itemValue) => setEditedCategory(itemValue)}
            >
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Subir imagen</Text>
            </TouchableOpacity>
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
  picker: {
    width: '100%',
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

export default MenuRestaurant;
