import axios from 'axios';
import store from '../store';
import {
    getToken
} from '@/utils/auth';
import {
    Message
} from 'element-ui';
import config from '../config';

const service = axios.create({
    baseURL: config.baseUrl,
    timeout: 60000
});

service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['token'] = getToken();
    }
    return config;
}, error => {
    return Promise.reject(error);
});

service.interceptors.response.use(response => {
    const res = response.data;
    if (response.status === 200) {
        if (res.code === 1000 || res.code === 2000) {
            return res;
        } else if (res.code === 401) {
            Message({
                message: res.msg,
                type: 'warning',
                duration: 3 * 1000
            });
            if (!config.dev) {
                window.location.href = config.loginUrl;
            }
        } else {
            Message({
                message: res.msg,
                type: 'error'
            });
            return Promise.reject(res.message);
        }
    } else {
        return Promise.reject(res.message);
    }
}, error => {
    console.log(error);
    const status = error.response.status;
    if (status === 401) {
        Message({
            message: '请登录',
            type: 'warning',
            duration: 5 * 1000
        });
        if (!config.dev) {
            window.location.href = config.loginUrl;
        }
    } else {
        Message({
            message: error.response.data,
            type: 'error'
        });
    }
    return Promise.reject(error);
});

export default service;