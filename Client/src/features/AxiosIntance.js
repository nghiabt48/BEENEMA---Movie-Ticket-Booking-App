import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const AxiosIntance = (contentType = 'application/json') => {
    // http://139.180.138.39:3000/api/
    const axiosInstance = axios.create({
        baseURL: 'http://149.28.159.68:3000/api/'
    });
    axiosInstance.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('token');
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    ); // callback
    return axiosInstance;
}

export default AxiosIntance;