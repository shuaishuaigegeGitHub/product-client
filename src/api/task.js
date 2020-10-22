import request from '../utils/request';



//新系统
/**
 * 查询任务
 */
export const findTask = (data) => request({ url: '/projectApproval/findTask', method: 'post', data });

/**
 * 添加任务
 */
export const addTask = (data) => request({ url: '/projectApproval/addTask', method: 'post', data });

/**
 * 修改任务
 */
export const updateTask = (data) => request({ url: '/projectApproval/updateTask', method: 'post', data });

/**
 * 修改任务
 */
export const delTask = (data) => request({ url: '/projectApproval/delTask', method: 'post', data });