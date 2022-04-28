import axios from 'axios'
import { local_base_URL } from '../constant.js';
import JWTApi from './jwtAPI.js';


const DatabaseClient = axios.create({
    baseURL: local_base_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

DatabaseClient.interceptors.request.use(
    async (config) => {
        let token = await localStorage.getItem('accessToken');
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

DatabaseClient.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        if (err.response) {
            const originalConfig = err.config;
            if (err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const refreshToken = await localStorage.getItem('refreshToken');
                        const rs = await JWTApi.RefreshToken(refreshToken);
                        console.log(rs.accessToken)
                        await localStorage.setItem('accessToken', rs.accessToken)
                        return DatabaseClient(originalConfig);
                    }
                    catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
        }
        return Promise.reject(err);
    }
)

export default DatabaseClient;