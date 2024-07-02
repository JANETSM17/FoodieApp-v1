import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons
import { useNavigation } from '@react-navigation/native';
import useAuth from "../hooks/useAuth";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading } = useAuth();
    const navigation = useNavigation();

    const handleLogin = async () => {
        await login(email, password);
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require('../assets/images/logos/FoodieNegro.png')} style={styles.fBlack} />
            <View>
                <View>
                    <Text style={styles.loginText}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setEmail}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#A9A9A9"
                    />
                </View>
                <View>
                    <Text style={styles.loginText}>Contraseña</Text>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="contraseña"
                        placeholderTextColor="#A9A9A9"
                    />
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    loginText: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
        padding: 10,
        margin: 5,
    },
    loginInput: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        borderColor: 'orange',
        borderWidth: 1,
        width: '100%',
        fontSize: 16,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 25,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fBlack: {
        width: 100,
        height: 25,
        marginBottom: 20,
    },
});

export default LoginPage;
