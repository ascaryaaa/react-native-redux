import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "../helpers/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({navigation}) => {
    const auth=FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        AsyncStorage
        .getItem('token')
        .then(token => {
            if (token !== null) {
                navigation.navigate('Home')
            }
        })
    }, [])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password) //1. sign in user
        .then(response => response.user.getIdToken()) //2. call user id token
        .then(token => AsyncStorage.setItem('token', token) ) //3. store token
        .then(() => {
            Alert.alert('Login Succed', `Welcome!`, [
                {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home')
                }
            ])
        }) 
    }

    const handleRegister = async() => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
            Alert.alert('Register Succeed', error.message)
        } catch(error) {
            console.log(error)
            Alert.alert('Register Error', error.message)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput style={styles.input} 
                placeholder="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}    
            />
            <TouchableOpacity title='login' style={styles.button} onPress={handleLogin}>
                <Text style={{color:'white'}} >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity title='register' style={styles.button} onPress={handleRegister}>
                <Text style={{color:'white'}} >Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 16,
        fontSize: 16,
        color: '#333',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#4287f5',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
        margin: 5,
    }
});

export default Login;