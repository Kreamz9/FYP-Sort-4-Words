import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Dimensions, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react' 
import { FIREBASE_AUTH  } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const { width } = Dimensions.get('window'); 
const scale = width / 320;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
            <View>
                <KeyboardAvoidingView behavior='padding'>
                    
                    <View>
                        {/* Game Title Area */}
                        <View style={styles.game_title_container}>
                            <Text style={styles.title}>Sort-4-Words</Text>
                        </View>
                        <TextInput style={styles.input} placeholder="Email" value={email} autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

                        { loading ? <ActivityIndicator size="large" color="#0000ff" />
                        : <>
                            <TouchableOpacity style={styles.buttons} onPress={signIn}>
                                <Text style={styles.button_label}>LOGIN</Text>
                            </TouchableOpacity>
                            <View style={styles.divider_line}>
                                <Text style={styles.divider_line_text}>OR</Text>
                            </View>
                            <TouchableOpacity style={styles.buttons} onPress={signUp}>
                                <Text style={styles.button_label}>CREATE ACCOUNT</Text>
                            </TouchableOpacity>
                        </>}
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },

    game_title_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scale * 40
    },

    title:{
        fontWeight: 'bold',
        fontSize: scale * 40
    },

    input: {
        marginVertical: scale * 4,
        borderWidth: 1,
        borderRadius: scale * 2,
        padding: scale * 5,
        backgroundColor: '#fff',
        fontSize: scale * 12,
    },

    divider_line: {
        borderBottomWidth: 1,
        marginVertical: scale * 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    divider_line_text: {
        position: 'absolute',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: scale * 10
    },

    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        marginVertical: scale * 4,
        borderRadius: scale * 2,
    },
    
    button_label: {
        fontSize: scale * 12,
        padding: scale * 5,
        color: 'white',
    },
})

export default Login;