import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import demoService from '../services/demoService';
import useAuth from "../hooks/useAuth";
import Header from "../components/Header"; // Importa el componente Header

function HomePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [comedores, setComedores] = useState([]);
    const navigation = useNavigation(); // Obtiene el objeto de navegación

    useEffect(() => {
        handleLoad();
    }, []);

    const handleLoad = async () => {
        setLoading(true);
        try {
            const data = await demoService();
            setComedores(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestaurantPress = () => {
        navigation.navigate('RestaurantScreen'); // Navega hacia DiningRoomScreen con los datos del comedor
    };

    const handleProfilePress = () => {
        navigation.navigate('HomeRestaurant'); // Navega hacia DiningRoomScreen con los datos del comedor
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
            </View>
        );
    }

    if (!comedores || comedores.length === 0) {
        logout();
        return null; // Retornar null porque la navegación ya se maneja
    }

    return (
        <View style={styles.mainContainer}>
            <Header /> {/* Implementa el componente Header */}
            <ScrollView style={styles.contentContainer}>
                {comedores.map((comedor) => (
                    <TouchableOpacity
                        key={comedor._id}
                        style={styles.comedorContainer}
                        onPress={() => handleRestaurantPress(comedor)} // Maneja la navegación al hacer clic
                    >
                        <Image source={require('../assets/images/restaurantes/utch_logo.png')} style={styles.comedorImage} />
                        <Text style={styles.comedorTitle}>{comedor.nombre}</Text>
                        <Text style={styles.comedorRating}>
                            {comedor.calif} <Image source={require('../assets/images/recursosExtras/estrella.png')} style={styles.starIcon} />
                        </Text>
                        <Text style={styles.comedorWait}>
                            <Image source={require('../assets/images/recursosExtras/reloj.png')} style={styles.clockIcon} /> {comedor.min_espera} min.
                        </Text>
                        <Text style={styles.comedorCode}>{comedor.codigo}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButton} onPress={handleProfilePress}>
                    <Text style={styles.buttonText}>Perfil</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f0f0f0', 
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    comedorContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#ddd', 
        borderWidth: 1, 
        padding: 20,
        marginBottom: 20,
        borderRadius: 20, 
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
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
        color: '#333',
        textAlign: 'center', 
    },
    comedorRating: {
        fontSize: 16,
        color: '#FFA500',
        marginBottom: 5,
        textAlign: 'center', 
    },
    starIcon: {
        width: 16,
        height: 16,
    },
    comedorWait: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        textAlign: 'center', 
    },
    clockIcon: {
        width: 16,
        height: 16,
    },
    comedorCode: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    roundButton: {
        backgroundColor: '#000', 
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
});

export default HomePage;
