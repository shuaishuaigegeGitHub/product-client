import request from '../utils/request';

//获取部门列表
export const login = (data) => request({ url: '/api/login', method: 'post', data });