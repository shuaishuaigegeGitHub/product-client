import request from '../utils/request';

// 分组保存
export const groupSave = (data) => request({ url: '/api/login', method: 'post', data });
// 更新分组
export const groupUpdate = (data) => request({ url: '/api/login', method: 'post', data });
// 分组删除
export const groupdel = (data) => request({ url: '/api/login', method: 'post', data });
// 任务列表保存
export const listSave = (data) => request({ url: '/api/login', method: 'post', data });
// 更新任务列表
export const listUpdate = (data) => request({ url: '/api/login', method: 'post', data });
// 任务列表删除
export const listdel = (data) => request({ url: '/api/login', method: 'post', data });

// 创建项目
export const projectSave = (data) => request({ url: '/project', method: 'post', data });