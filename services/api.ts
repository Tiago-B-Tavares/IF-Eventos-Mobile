import axios, { AxiosError } from 'axios';



export function setupApiClient() {


  const apiConfig = axios.create({
    baseURL: 'http://192.168.18.60:3333',
  });

  return apiConfig; 
}
