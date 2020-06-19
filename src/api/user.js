import request from '../utils/request';

// 查询所有用户
export const queryUser = () => request({ url: '/user', method: 'GET' });