import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ViewProps, ActivityIndicator } from "react-native";
import demoService from '../services/demoService'
import { User } from '../types/user.type'
// import useAuth from "../hooks/useAuth";


function LoginPage() {
    const [loading, setLoading] = useState(true);
    const [data,  setData] = useState<User | undefined>(undefined);

    useEffect(() => {
        handleLoad()
    }, [])

    useEffect(() => {
        console.log({data})

    }, [data])

    const handleLoad = async () => {
        setLoading(true)
        const _data = await demoService()
        setData(_data)
        setLoading(false)
    };

    if(loading || !data){
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator/>
            </View>
        );
    }
    

    return (
        <View style={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>{data?.address?.address}</Text>
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
    loginInnerContainer: {
        marginVertical: 10,
        width: '100%',
    },
    loginTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginText: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 5,
    },
    loginInput: {
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        padding: 10,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        width: '100%',
        fontSize: 16,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default LoginPage