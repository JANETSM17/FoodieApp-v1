import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Image, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { getUserInfo, getComedores } from '../services/demoService';
import useAuth from "../hooks/useAuth";

function HomePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [comedores, setComedores] = useState([]);
    const [cliente, setCliente] = useState(null);
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
            setCliente(clientInfo);

            const comedoresData = await getComedores();
            setComedores(comedoresData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestaurantPress = () => {
        navigation.navigate('Menu');
    };

    const handleProfilePress = () => {
        navigation.navigate('Bolsa');
    };

    const handleAccountPress = () => {
        navigation.navigate('ClientProfile');
    };

    const handlePedidosPress = () => {
        navigation.navigate('Pedidos');
    };

    const handleAddComedor = () => {
        // Logic to handle adding a comedor
        setModalVisible(false);
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
            </View>
        );
    }

    if (!cliente) {
        logout();
        return null;
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={24} color="#FFA500" />
                </TouchableOpacity>
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
                            onPress={() => handleRestaurantPress()}
                        >
                            <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.comedorImage} />
                            <View style={styles.comedorInfo}>
                                <Text style={styles.comedorTitle}>{comedor.nombre}</Text>
                                <Text style={styles.comedorRating}>
                                    Calificación: <Text style={styles.boldText}>{comedor.calif}</Text>
                                </Text>
                                <Text style={styles.comedorWait}>
                                    Tiempo de espera mínimo: <Text style={styles.boldText}>{comedor.min_espera} minutos</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
                <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButton} onPress={handleProfilePress}>
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="home" size={24} color="black" />
                    <Text style={styles.footerButtonText}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handlePedidosPress}>
                    <Ionicons name="clipboard-outline" size={24} color="black" />
                    <Text style={styles.footerButtonText}>Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleProfilePress}>
                    <Ionicons name="bag-outline" size={24} color="black" />
                    <Text style={styles.footerButtonText}>Bolsa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleAccountPress}>
                    <Ionicons name="person-outline" size={24} color="black" />
                    <Text style={styles.footerButtonText}>Perfil</Text>
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
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
        borderRadius: 10,
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
    footer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        backgroundColor: 'white',
    },
    footerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerButtonText: {
        fontSize: 12,
        color: 'black',
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
    addButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomePage;
