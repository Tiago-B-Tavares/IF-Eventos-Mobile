import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faEye } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Acesse a sua conta</Text>
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <FontAwesomeIcon icon={faEnvelope} size={20} color="#808080" style={styles.icon} />
                    <TextInput placeholder="Email" placeholderTextColor="#808080" style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesomeIcon icon={faLock} size={20} color="#808080" style={styles.icon} />
                    <TextInput placeholder="Senha" placeholderTextColor="#808080" style={styles.input} secureTextEntry />
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEye} size={20} color="#808080" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonPrimary}>
                    <Text style={styles.buttonTextPrimary}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.separatorText}>ou</Text>

            <View style={styles.socialButtonGroup}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '8%',
        gap: 50,
    },
    titleContainer: {
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'blue',
    },
    inputGroup: {
        width: '100%',
        gap: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#808080',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 18,
    },
    icon: {
        marginRight: 10,
    },
    buttonPrimary: {
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        height: 50,
    },
    buttonTextPrimary: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    separatorText: {
        marginVertical: 10,
        fontSize: 18,
        color: '#808080',
    },
    socialButtonGroup: {
        flexDirection: 'row',
        gap: 20, 
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#707070',
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
});
