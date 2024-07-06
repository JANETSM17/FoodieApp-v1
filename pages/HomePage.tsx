import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserInfo, getComedores } from '../services/demoService';
import useAuth from "../hooks/useAuth";
import Header from "../components/Header"; // Importa el componente Header

function HomePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [comedores, setComedores] = useState([]);
    const [cliente, setCliente] = useState(null);
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
        navigation.navigate('RestaurantProfile');
        console.log("si llega a bag");
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
            <View style={styles.topBar}>
                <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
            </View>
            <TouchableOpacity style={styles.comedoresBtn}>
                <Text style={styles.buttonText}>Comedores</Text>
            </TouchableOpacity>
            <View style={styles.contentContainer}>
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
                            <Text style={styles.comedorTitle}>{comedor.nombre}</Text>
                            <Text style={styles.comedorRating}>
                                Calificación: <Text style={styles.boldText}>{comedor.calif}</Text>
                            </Text>
                            <Text style={styles.comedorWait}>
                                Tiempo de espera mínimo: <Text style={styles.boldText}>{comedor.min_espera} minutos</Text>
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
                <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButton} onPress={handleProfilePress}>
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    topBar: {
        height: 80,
        width: '100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    logo: {
        width: 180,
        height: 45,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    comedorContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        width: '100%',
        alignItems: 'center',
    },
    comedorImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    comedorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'orange',
        textAlign: 'center',
    },
    comedorRating: {
        fontSize: 16,
        color: 'black',
        marginBottom: 3,
        textAlign: 'left',
    },
    comedorWait: {
        fontSize: 16,
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
    comedoresBtn: {
        backgroundColor: 'orange',
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
        width: '100%',
        alignItems: 'center',
    },
});

export default HomePage;
