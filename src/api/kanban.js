import request from '../utils/request';

// 分组保存
export const groupSave = (data) => request({ url: '/project-group', method: 'post', data });
// 更新分组
export const groupUpdate = (data) => request({ url: '/project-group', method: 'put', data });
// 分组删除
export const groupdel = (data) => request({ url: '/project-group/' + data, method: 'delete', data });
// 分组查询
export const groupSearch = (data) => request({ url: '/project-group', method: 'get', data });

// 任务列表保存
export const listSave = (data) => request({ url: '/project-list', method: 'post', data });
// 更新任务列表
export const listUpdate = (data) => request({ url: '/project-list', method: 'put', data });
// 任务列表删除
export const listdel = (data) => request({ url: '/project-list/' + data, method: 'delete', data });
// 分组查询
export const listSearch = (data) => request({ url: '/project-list/' + data, method: 'get', data });

// 创建项目
export const projectSave = (data) => request({ url: '/project', method: 'post', data });