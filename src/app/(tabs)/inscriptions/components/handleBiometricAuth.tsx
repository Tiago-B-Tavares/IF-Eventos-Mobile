import React, { useState } from "react";
import { Modal, View, Text, Alert, Pressable, StyleSheet, TextInput } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

interface AuthenticationModalProps {
    visible: boolean;
    onClose: () => void;
    onAuthenticated: () => void;
}

export default function AuthenticationModal({ visible, onClose, onAuthenticated }: AuthenticationModalProps) {
    const [passwordModalVisible, setPasswordModalVisible] = useState(false); 
    const [password, setPassword] = useState(""); 


    async function handleBiometricAuth() {
        try {
          
            const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
            if (!isBiometricAvailable) {
                return Alert.alert("Erro", "Seu dispositivo não suporta autenticação biométrica.");
            }

        
            const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isBiometricEnrolled) {
                return Alert.alert(
                    "Atenção",
                    "Nenhuma credencial biométrica foi configurada no dispositivo.",
                    [
                        {
                            text: "Usar Senha",
                            onPress: () => setPasswordModalVisible(true), 
                        },
                        {
                            text: "Cancelar",
                            style: "cancel",
                        },
                    ]
                );
            }

         
            const authResult = await LocalAuthentication.authenticateAsync({
                promptMessage: "Autentique-se para continuar",
                fallbackLabel: "Use senha alternativa",
            });

            if (authResult.success) {
                onAuthenticated(); 
                onClose(); 
            } else {
                Alert.alert("Erro", "Autenticação biométrica falhou.");
            }
        } catch (error) {
            console.error("Erro durante a autenticação biométrica:", error);
            Alert.alert("Erro", "Ocorreu um erro durante a autenticação biométrica.");
        }
    }

 
    async function validatePassword() {
        try {
          
         
            if (password === "1234") { 
                setPasswordModalVisible(false); 
                onAuthenticated(); 
                onClose(); 
            } else {
                Alert.alert("Erro", "Senha incorreta. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao validar senha:", error);
            Alert.alert("Erro", "Ocorreu um erro ao validar a senha.");
        }
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                {!passwordModalVisible ? (
                    // Modal de Autenticação Biométrica
                    <View style={styles.content}>
                        <Text style={styles.title}>Autenticação Necessária</Text>
                        <Pressable style={styles.button} onPress={handleBiometricAuth}>
                            <Text style={styles.buttonText}>Usar Biometria</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => setPasswordModalVisible(true)}>
                            <Text style={styles.buttonText}>Usar Senha</Text>
                        </Pressable>
                        <Pressable style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                ) : (
                    // Modal de Senha
                    <View style={styles.content}>
                        <Text style={styles.title}>Digite sua Senha</Text>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Senha"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <View style={styles.buttonsContainer}>
                            <Pressable style={styles.button} onPress={validatePassword}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </Pressable>
                            <Pressable style={styles.cancelButton} onPress={() => setPasswordModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Voltar</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelButtonText: {
        color: "#007bff",
        fontWeight: "bold",
    },
    passwordInput: {
        width: "100%",
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});