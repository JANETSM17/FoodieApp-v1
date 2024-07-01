import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, CheckBox, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'; // Necesitarás instalar esta dependencia

const Bolsa = () => {
  const cartItems = [
    { name: 'Cafeteria BIS', quantity: 1, price: 25.00, image: require('../assets/images/comida/chilaquiles.png') },
    { name: 'Mix Food Mug', quantity: 1, price: 45.00, image: require('../assets/images/comida/chips.png') },
    { name: 'Thai Healthy Sto', quantity: 1, price: 35.00, image: require('../assets/images/comida/onion-rings.png') },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [comments, setComments] = useState('');

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || pickupTime;
    setShowTimePicker(false);
    setPickupTime(currentDate);
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; // Puedes añadir impuestos, envío, etc. aquí si es necesario

  const handlePay = () => {
    // Implementa la lógica de pago aquí
    alert('Pagar con los productos seleccionados');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order list</Text>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.cartItem}>
          <CheckBox value={selectedItems.includes(item)} onValueChange={() => handleSelectItem(item)} />
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.quantity} x ${item.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal:</Text>
          <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total:</Text>
          <Text style={styles.summaryText}>${total.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.pickupTimeContainer}>
        <Text style={styles.pickupTimeLabel}>Hora de Pick-up:</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.pickupTimeButton}>
          <Text style={styles.pickupTimeText}>{pickupTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={pickupTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
      <TextInput
        style={styles.commentsInput}
        placeholder="Específica alguna indicación especial"
        value={comments}
        onChangeText={setComments}
      />
      <TouchableOpacity style={styles.completeButton} onPress={handlePay}>
        <Text style={styles.completeButtonText}>Pagar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Bolsa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#ff0000',
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  pickupTimeLabel: {
    color: '#ffc107',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickupTimeButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 10,
  },
  pickupTimeText: {
    color: '#fff',
  },
  commentsInput: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    height: 100,
  },
  completeButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
