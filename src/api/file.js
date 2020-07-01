import request from '../utils/request';

/**
 * 获取任务类型
 */
export const fileList = (data) => request({ url: '/file/fileList', method: 'post', data });
