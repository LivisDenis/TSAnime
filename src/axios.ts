import axios from "axios";

export const baseUrl = 'http://localhost:5001'
//process.env.REACT_APP_API_URL
const instance = axios.create({
    baseURL: 'http://localhost:5001',
});

instance.interceptors.request.use((config) => {
    config.headers!.Authorization = localStorage.getItem('token')
    return config
})

export default instance