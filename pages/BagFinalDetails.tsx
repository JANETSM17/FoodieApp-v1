import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BagFinalDetails = () => {
  const [selectedOption, setSelectedOption] = useState('Foodie Box');
  const [comments, setComments] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [period, setPeriod] = useState('AM');
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleConfirm = () => {
    setModalVisible(true);
  };

  const handleGoHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

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
            selectedOption === 'Foodie Box' && styles.selectedOptionButton
          ]}
          onPress={() => setSelectedOption('Foodie Box')}
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
            selectedOption === 'Pick Up' && styles.selectedOptionButton
          ]}
          onPress={() => setSelectedOption('Pick Up')}
        >
          <Image
            source={require('../assets/images/recursosExtras/cafeteria.png')}
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Pick Up</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Comentarios/Indicaciones"
        placeholderTextColor="#888"
        value={comments}
        onChangeText={setComments}
      />

      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="HH"
          placeholderTextColor="#888"
          value={hour}
          onChangeText={setHour}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.timeInput}
          placeholder="MM"
          placeholderTextColor="#888"
          value={minute}
          onChangeText={setMinute}
          keyboardType="numeric"
          maxLength={2}
        />
        <TouchableOpacity
          style={styles.periodButton}
          onPress={() => setPeriod(period === 'AM' ? 'PM' : 'AM')}
        >
          <Text style={styles.periodButtonText}>{period}</Text>
        </TouchableOpacity>
      </View>

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
            <Image source={require('../assets/images/recursosExtras/Plato.png')} style={styles.successImage} />
            <Text style={styles.modalTitle}>Orden Confirmada</Text>
            <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
              <Ionicons name="home" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    width: 50,
    marginHorizontal: 5,
    color: '#000',
  },
  colon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  periodButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  periodButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 15,
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
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  successImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default BagFinalDetails;
