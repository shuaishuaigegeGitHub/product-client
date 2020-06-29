import request from '../utils/request';

/**
 * 获取任务类型
 */
export const taskTypes = (data) => request({ url: '/task/taskTypes', method: 'post', data });
/**
 * 获取任务模块
 */
export const taskModule = (data) => request({ url: '/task/taskModule', method: 'post', data });
/**
 * 保存任务
 */
export const saveTask = (data) => request({ url: '/task/saveTask', method: 'post', data });
/**
 * 更新任务
 */
export const updateTask = (data) => request({ url: '/task/updateTask', method: 'post', data });
/**
 * 查询任务
 */
export const searchTask = (data) => request({ url: '/task/searchTask', method: 'post', data });
/**
 * 查询文件
 */
export const taskFile = (data) => request({ url: '/task/taskFile', method: 'post', data });
/**
 * 删除任务
 */
export const deleteTask = (data) => request({ url: '/task/deleteTask', method: 'post', data });
/**
 * 验收
 */
export const checkTask = (data) => request({ url: '/task/checkTask', method: 'post', data });