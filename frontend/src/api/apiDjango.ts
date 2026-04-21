import axios from 'axios';

const apiDjango =  axios.create({
    baseURL: 'http://localhost:8000',
});

apiDjango.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiDjango