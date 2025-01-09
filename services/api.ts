import axios, { AxiosError } from 'axios';



export function setupApiClient() {


  const apiConfig = axios.create({
    baseURL: 'http://192.168.18.60:3333',
    // baseURL: 'https://9a24-138-36-248-68.ngrok-free.app',
  });

  return apiConfig; 
}
