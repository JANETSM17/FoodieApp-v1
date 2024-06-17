import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import useAuth from "../hooks/useAuth";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading } = useAuth();

    const handleLogin = async () => {
        await login(username, password);
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <Image source={require('../assets/images/logos/FoodieNegro.png')} style={styles.fBlack} />
            <View>
                <View>
                    <Text style={styles.loginText}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setUsername}
                        placeholder="correo electrónico"
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
    loginContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: '90%',
        maxWidth: 400,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        alignItems: 'center', 
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
    }
});

export default LoginPage;
