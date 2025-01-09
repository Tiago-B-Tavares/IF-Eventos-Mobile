import { api } from "@/services/setupApiClient";
import { Alert } from "react-native";

export default function checkIn(userId: string, atividade_id: string, distance: number, setModalVisible: (visible: boolean) => void) {
    
        api.post('/app/user/checkOut', { userId, atividade_id, distance })
            .then(() => {
                Alert.alert("Status", "Check-out realizado com sucesso!");
                setModalVisible(false);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || error.message || "Erro desconhecido";
                Alert.alert("Atencão", errorMessage);
                console.error("Erro da API:", errorMessage);
                setModalVisible(false);
            });
 

}
