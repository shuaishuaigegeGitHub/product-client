import request from '../utils/request';

// 更改首次登录状态
export const changeLoginStatus = () => request({ url: '/permission/changeLoginStatus', method: 'post' });

// 获取当前登录用户信息
export const getUserinfo = () => request({ url: '/permission/userinfo', method: 'get' });

// 获取系统级别菜单
export const getSystemMenu = () => request({ url: '/permission/system', method: 'get' });

// 获取菜单
export const getMenu = () => request({ url: '/permission/menu', method: 'get' });
