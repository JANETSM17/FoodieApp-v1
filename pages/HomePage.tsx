import { useEffect, useState } from "react";
import { StyleSheet, Text, Button, View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import demoService from '../services/demoService';
import useAuth from "../hooks/useAuth";

function HomePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [comedores, setComedores] = useState([]);

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
            <View style={styles.topBar}>
                <Image source={require('../assets/images/logos/FoodieOriginal.png')} style={styles.logo} />
            </View>
            <TouchableOpacity style={styles.comedoresBtn}>
                <Text style={styles.buttonText}>Comedores</Text>
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                {comedores.map((comedor) => (
                    <View key={comedor._id} style={styles.comedorContainer}>
                        <Text style={styles.comedorTitle}>{comedor.nombre}</Text>
                        <Text style={styles.comedorRating}>
                            Calificación: 
                            <Text style={styles.boldText}> {comedor.calif}</Text>
                        </Text>
                        <Text style={styles.comedorWait}>
                            Tiempo de espera mínimo: 
                            <Text style={styles.boldText}> {comedor.min_espera} minutos</Text>
                        </Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.roundButton} onPress={logout}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    comedorContainer: {
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
        width: '100%', // 
        alignItems: 'center', 
    },
    comedorTitle: {
        fontSize: 20,
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
});

export default HomePage;
