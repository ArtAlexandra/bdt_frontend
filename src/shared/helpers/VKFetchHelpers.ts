import axios, { AxiosInstance } from 'axios';

import { VK_API_URL } from '@bdt/shared/config/AppEnvironment';

// Создаем отдельный экземпляр для VK API
const vkApi: AxiosInstance = axios.create({
    baseURL: VK_API_URL,
    timeout: 10000,
    withCredentials: false, // Не отправляем куки
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем интерцептор для извлечения данных из ответа
vkApi.interceptors.response.use(
    (response) => {
        // Возвращаем только data, убираем headers и другие несериализуемые объекты
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default vkApi;
