import { useEffect, useState } from "react";
import { StyleSheet, Text, Button, View, ActivityIndicator } from "react-native";
import demoService from '../services/demoService';
import useAuth from "../hooks/useAuth";

function HomePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [comedores,  setComedores] = useState([]);

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
            <View style={styles.loginContainer}>
                {comedores.map((comedor) => (
                    <View key={comedor._id} style={styles.comedorContainer}>
                        <Text style={styles.comedorTitle}>{comedor.nombre}</Text>
                        <Text style={styles.comedorRating}>Calificación: {comedor.calif}</Text>
                        <Text style={styles.comedorWait}>Tiempo de espera mínimo: {comedor.min_espera} minutos</Text>
                    </View>
                ))}
                <Button title="Cerrar sesión" onPress={logout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
        padding: 20,
    },
    loginContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: 300,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    comedorContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: 10,
    },
    comedorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comedorRating: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 3,
    },
    comedorWait: {
        fontSize: 16,
        color: '#333333',
    }
});

export default HomePage;


//{data?.address?.address}