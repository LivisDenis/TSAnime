import axios from "axios";

export const apiUrl = import.meta.env.VITE_APP_API_URL
// export const apiUrl = process.env.REACT_APP_API_URL

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

instance.interceptors.request.use((config) => {
    config.headers!.Authorization = localStorage.getItem('token')
    return config
})

export default instance