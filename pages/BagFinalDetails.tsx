import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { confirmFoodieBox, confirmPedido, getProductos, confirmEspera, sendPedido } from '../services/demoService'; // Ajusta el path según corresponda

const BagFinalDetails = () => {
  const [loading, setLoading] = useState(true);
  const [pickUpOption, setPickUpOption] = useState('mostrador');
  const [comments, setComments] = useState('Pedido sin especificaciones especiales');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [email, setEmail] = useState('');
  const [carrito, setCarrito] = useState('');
  const [mensajeModal, setMensajeModal] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [foodieBoxAvailable, setFoodieBoxAvailable] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const carritoID = await AsyncStorage.getItem('carritoID');
      const correo = await AsyncStorage.getItem('clientEmail');
      if (carritoID && correo) {
        const result = await confirmFoodieBox(carritoID);
        setFoodieBoxAvailable(result.status);
        setEmail(correo);
        setCarrito(carritoID)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const productos = await getProductos(carrito);
      if (productos.length === 0) {
        Alert.alert('Error', 'No puedes hacer un pedido sin productos');
        setLoading(false);
        return;
      }
      const pedidosPendientes = await confirmPedido(email);
      if (pedidosPendientes.cuenta > 0) {
        Alert.alert('Error', 'Lo lamentamos, pero parece ser que tienes un pedido pendiente de recoger. No podrás hacer un pedido nuevo hasta que pagues y recojas tu pedido anterior');
        setLoading(false);
        return;
      }
  
      const result = await confirmEspera(carrito);
      if(result){
        if(hour && minute !== null){
          const minEspera = result[0].min_espera; 

          const fechaActual = new Date();
          const userTime = new Date(fechaActual);
          userTime.setHours(parseInt(hour, 10));
          userTime.setMinutes(parseInt(minute, 10));

          // Calcular la diferencia en minutos usando .getTime() para obtener milisegundos
          const diferenciaMilisegundos = userTime.getTime() - fechaActual.getTime();
          const diferenciaMinutos = Math.ceil(diferenciaMilisegundos / 60000); // Diferencia en minutos.

          console.log('Diferencia en minutos: ',diferenciaMinutos);

          let espera = diferenciaMinutos;
          if (diferenciaMinutos < minEspera) {
            setMensajeModal('El tiempo seleccionado era \nmenor al tiempo minimo de\nespera de su comedor, por lo\nque se le asignara el tiempo \nde espera minimo.')
            espera = minEspera;
          } else {
            setMensajeModal('Pasa a recoger tu pedido\na la hora indicada')
          }

          const sendResult = await sendPedido(carrito, espera, comments, pickUpOption, email);
          if (sendResult.status === 'error') {
            Alert.alert('Error', sendResult.message);
          } else {
            setModalVisible(true);
          }
        }else{
          Alert.alert('Ingresa la hora para recoger')
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoPedidos = () => {
    setModalVisible(false);
    navigation.navigate('Pedidos');
  };

  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i.toString().padStart(2, '0')
  }));
  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i.toString().padStart(2, '0')
  }));

  if (loading) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator size="large" color="#F5B000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalles</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.chooseText}>Selecciona como lo quieres!</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            pickUpOption === 'foodiebox' && styles.selectedOptionButton
          ]}
          onPress={() => foodieBoxAvailable ? setPickUpOption('foodiebox') : null}
          disabled={!foodieBoxAvailable}
        >
          <Image
            source={require('../assets/images/recursosExtras/Comprador.png')}
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Foodie Box</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            pickUpOption === 'mostrador' && styles.selectedOptionButton
          ]}
          onPress={() => setPickUpOption('mostrador')}
        >
          <Image
            source={require('../assets/images/recursosExtras/cafeteria.png')}
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Mostrador</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Comentarios/Indicaciones"
        placeholderTextColor="#888"
        value={comments}
        onChangeText={setComments}
      />

      <TouchableOpacity
        style={styles.selectTimeButton}
        onPress={() => setTimeModalVisible(true)}
      >
        <Text style={styles.selectTimeButtonText}>Seleccionar la hora</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../assets/images/logos/blacklogo.png')} style={styles.successImage} />
            <Text style={styles.modalTitle}>Orden Confirmada</Text>
            <Text style={styles.modalText}>{mensajeModal}</Text>
            <TouchableOpacity style={styles.homeButton} onPress={handleGoPedidos}>
              <Ionicons name="receipt-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isTimeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.timeModalContainer}>
          <View style={styles.timeModalContent}>
            <Text style={styles.modalTitle}>Selecciona la hora</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setHour(value)}
                items={hours}
                style={pickerSelectStyles}
                placeholder={{
                  label: 'HH',
                  value: null,
                  color: '#888',
                }}
                value={hour}
                useNativeAndroidPickerStyle={false}
              />
              <Text style={styles.colon}>:</Text>
              <RNPickerSelect
                onValueChange={(value) => setMinute(value)}
                items={minutes}
                style={pickerSelectStyles}
                placeholder={{
                  label: 'MM',
                  value: null,
                  color: '#888',
                }}
                value={minute}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setTimeModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  placeholder: {
    width: 40,
  },
  chooseText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 5,
  },
  selectedOptionButton: {
    backgroundColor: '#FFA500',
  },
  disabledOptionButton: {
    backgroundColor: '#ddd',
  },
  optionImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    height: 100,
    textAlignVertical: 'top',
    color: '#000',
    marginHorizontal: 15,
  },
  selectTimeButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: 'center',
  },
  selectTimeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#fff',
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 10,
  },
  timeModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  timeModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  colon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default BagFinalDetails;
