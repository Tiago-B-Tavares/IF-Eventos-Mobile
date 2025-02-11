
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { getPreciseDistance } from 'geolib';





type LocationType = {
  latitude: number;
  longitude: number;

};

export class HandleUserLocation {



  async getPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {

        return true;
      }
      return false;
    } catch (error) {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua localização.');
      console.error(error);
      return false;
    }
  }

  //caso o usuario permita o acesso a localização, o metodo retorna a localização atual do usuário
  async getCurrentLocation() {
    let position: LocationType = { latitude: 0, longitude: 0 };
    try {
      if (await this.getPermission()) {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })
        position = location.coords
      } else {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua localização.');
      }
      return position;
    } catch (error) {
      throw new Error(`Erro ao obter localização atual: ${error}`);
    }
  }

  //envia pra o servidor a localização do usuário
  async sendLocationToServer() {

    const userLocation = await this.getCurrentLocation();

    const { latitude, longitude } = userLocation;

    const distancia = Number(getPreciseDistance({
      latitude, longitude
    },
   
      {
        latitude: -15.562167045745605,
        longitude: -47.32790687761094
      }, 10).toFixed(2))/1000;
  
      
    return distancia
  }
}

