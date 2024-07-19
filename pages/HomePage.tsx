import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Image, Modal, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { getUserInfo, getComedores, addComedor, deleteComedor } from '../services/demoService';
import useAuth from "../hooks/useAuth";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [comedores, setComedores] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [comedorCode, setComedorCode] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        handleLoad();
    }, []);

    const handleLoad = async () => {
        setLoading(true);
        try {
            const clientInfo = await getUserInfo();
            if (!clientInfo) {
                logout();
                return;
            }

            await AsyncStorage.setItem('clientEmail', clientInfo.correo);

            const comedoresData = await getComedores();
            setComedores(comedoresData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestaurantPress = async (comedorId) => {
        try {
          await AsyncStorage.setItem('selectedComedorId', comedorId);
          navigation.navigate('Menu');
        } catch (error) {
          console.error('Error saving comedor ID:', error);
        }
      };

    const handleBagPress = () => {
        navigation.navigate('Bolsa');
    };

    const handleAccountPress = () => {
        navigation.navigate('ClientProfile');
    };

    const handlePedidosPress = () => {
        navigation.navigate('Pedidos');
    };

    const handleAddComedor = async () => {
        setLoading(true);
        const result = await addComedor(comedorCode);
        if (result) {
            setComedorCode('');
            handleLoad();
        }else{
            setComedorCode('');
            Alert.alert("Hubo un error, revisa que ingresaste el código correcto");
            setLoading(false);
        }
        setModalVisible(false);
    };

    const handleDeleteComedor = async (comedorId) => {
        setLoading(true);
        const result = await deleteComedor(comedorId);
        if (result) {
            handleLoad();
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
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {comedores.length === 0 ? (
                    <View style={styles.noComedoresContainer}>
                        <Text>No tienes ningún comedor guardado</Text>
                    </View>
                ) : (
                    comedores.map((comedor) => (
                        <TouchableOpacity
                            key={comedor._id}
                            style={styles.comedorContainer}
                            onPress={() => handleRestaurantPress(comedor._id)}
                        >
                            <TouchableOpacity onPress={() => handleDeleteComedor(comedor._id)}>
                                <Ionicons name="close" size={30} color="black" />
                            </TouchableOpacity>
                            <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.comedorImage} />
                            <View style={styles.comedorInfo}>
                                <Text style={styles.comedorTitle}>{comedor.nombre}</Text>
                                <Text style={styles.comedorRating}>
                                <Ionicons name="star-outline" size={12} color="black" /> Calificación: <Text style={styles.boldText}>{comedor.calif}</Text>
                                </Text>
                                <Text style={styles.comedorWait}>
                                <Ionicons name="time-outline" size={12} color="black" /> Tiempo de espera mínimo: <Text style={styles.boldText}>{comedor.min_espera} minutos</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.navButton}>
                    <Ionicons name="add-circle-outline" size={30} color="#F5B000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePedidosPress} style={styles.navButton}>
                    <Ionicons name="receipt-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBagPress} style={styles.navButton}>
                    <Ionicons name="bag-handle-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAccountPress} style={styles.navButton}>
                    <Ionicons name="person-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Código de comedor</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="[xxxxxx]"
                            value={comedorCode}
                            onChangeText={setComedorCode}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddComedor}>
                            <Text style={styles.addButtonText}>Agregar comedor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.addButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    containerActivityIndicator:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        padding: 20,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    headerContainer: {
        height: 80,
        width: '100%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 180,
        height: 45,
    },
    contentContainer: {
        padding: 10,
    },
    comedorContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
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
    comedorImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    comedorInfo: {
        alignItems: 'center',
    },
    comedorTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    comedorRating: {
        fontSize: 14,
        color: 'black',
        marginBottom: 3,
        textAlign: 'left',
    },
    comedorWait: {
        fontSize: 14,
        color: 'black',
        textAlign: 'left',
    },
    boldText: {
        fontWeight: 'bold',
    },
    roundButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noComedoresContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        width: '90%',
        alignSelf: 'center',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#000000',
        borderRadius: 25,
        height: 60,
        alignItems: 'center',
        margin: 10,
    },
    navButton: {
        alignItems: 'center',
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalCancelButton: {
        backgroundColor: '#B3B3B3',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
        width: '50%',
      },
    addButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomePage;
