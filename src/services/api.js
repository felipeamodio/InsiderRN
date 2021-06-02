import axios from 'axios';

export const key = '8570eeb755d94922293e746818cef8f6d01ba14c';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
    }
})

export default api;