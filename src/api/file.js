import request from '../utils/request';

/**
 * 获取文件列表
 */
export const fileList = (data) => request({ url: '/file/fileList', method: 'post', data });
/**
 * 保存文件
 */
export const saveFile = (data) => request({ url: '/file/saveFile', method: 'post', data });
/**
 * 删除文件
 */
export const deleteFile = (data) => request({ url: '/file/deleteFile', method: 'post', data });
