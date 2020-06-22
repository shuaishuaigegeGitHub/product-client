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
// 更新任务列表顺序
export const updateListPos = (data) => request({ url: '/project-list/pos', method: 'post', data });
//任务列表项目查询
export const listSearch = (data) => request({ url: '/project-list/' + data, method: 'get', data });
//只查询任务列表没有项目信息
export const searchproject_list = (data) => request({ url: '/project-list/searchproject_list', method: 'post', data });

// 更新项目顺序
export const updatePos = (data) => request({ url: '/project/pos', method: 'post', data });
// 更新项目顺序和所属任务列表
export const updatePosList = (data) => request({ url: '/project/posList', method: 'post', data });
// 更新项目顺序
export const thoroughdle = (data) => request({ url: '/project/thoroughdle', method: 'post', data });
// 恢复项目
export const returnToProduct = (data) => request({ url: '/project/returnToProduct', method: 'post', data });
