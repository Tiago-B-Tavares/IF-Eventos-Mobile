import { api } from "@/services/setupApiClient";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Modal, View, Text, Alert, Pressable, StyleSheet } from "react-native";
import checkIn from "../services/checkIn";
import checkOut from "../services/checkOut";
import { HandleUserLocation } from "@/services/HandleUserLocation";
import AuthenticationModal from "./handleBiometricAuth"; 

type ReadQrCodeProps = {
    title: string;
    type: string;
};

export default function ReadQrCode({ title, type }: ReadQrCodeProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const { userId } = useAuth();
    const qrCodeLock = useRef(false);
    const location = new HandleUserLocation();


    const handleAuthenticated = async () => {
        try {
        
            const { granted } = await requestPermission();
            if (!granted) {
                return Alert.alert("Precisamos de permissão para usar a câmera");
            }

     
            setModalVisible(true);
            qrCodeLock.current = false;
        } catch (error) {
            console.log(error);
        }
    };

    async function handleQrcodeRead(data: string) {
        try {
            const parsedData = JSON.parse(data);

            const atividade_id = parsedData.atividade_id;
            if (!atividade_id) {
                return Alert.alert("Erro", "ID da atividade não encontrado no QR Code.");
            }

       
            const distance = await location.sendLocationToServer();

            type === 'checkin'
                ? checkIn(userId as string, atividade_id as string, distance, setModalVisible)
                : checkOut(userId as string, atividade_id as string, distance, setModalVisible);
        } catch (error) {
            console.error("Erro ao processar QR Code:", error);
            Alert.alert("Erro", "Formato do QR Code inválido. Certifique-se de que o QR Code está correto.");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => setAuthModalVisible(true)} className="flex flex-col items-center justify-center">
                <Ionicons name={type === 'checkin' ? 'log-in' : 'log-out'} size={24} color="#fff" />
                <Text className="text-white font-bold">{title}</Text>
            </Pressable>

            {/* Modal de Autenticação */}
            <AuthenticationModal
                visible={authModalVisible}
                onClose={() => setAuthModalVisible(false)}
                onAuthenticated={handleAuthenticated}
            />

            {/* Modal da Câmera */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <CameraView
                        facing="back"
                        style={StyleSheet.absoluteFillObject}
                        onBarcodeScanned={({ data }) => {
                            if (data && !qrCodeLock.current) {
                                qrCodeLock.current = true;
                                setTimeout(() => handleQrcodeRead(data), 500);
                            }
                        }}
                    />
                    <View style={styles.overlay}>
                        <View style={styles.qrCodeFrame}></View>
                    </View>
                    <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Ionicons name="close" size={44} color="#fff" />
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    qrCodeFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        opacity: 0.5,
    },
    closeButton: {
        position: "absolute",
        top: 30,
        right: 20,
    },
});