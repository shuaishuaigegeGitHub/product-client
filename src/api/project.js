import request from '../utils/request';

// 创建项目
export const save = (data) => request({ url: '/project', method: 'post', data });

// 查询指定项目
export const query = (id) => request({ url: '/project/' + id, method: 'GET' });

// 查询指定项目
export const del = (id) => request({ url: '/project/' + id, method: 'DELETE' });

// 更新项目名称
export const updateProjectName = (data) => request({ url: '/project/project-name', method: 'PUT', data });

// 更新项目启动时间
export const updateBeginTime = (data) => request({ url: '/project/begin-time', method: 'PUT', data });

// 更新项目分组
export const updateGroup = (data) => request({ url: '/project/group', method: 'PUT', data });

// 更新项目优先级
export const updatePriority = (data) => request({ url: '/project/priority', method: 'PUT', data });

// 更新项目列表
export const updateList = (data) => request({ url: '/project/list', method: 'PUT', data });

// 新增标签
export const updateAddTag = (data) => request({ url: '/project/tag/add', method: 'PUT', data });

// 删除标签
export const updateDelTag = (data) => request({ url: '/project/tag/del', method: 'PUT', data });

// 更新备注
export const updateRemark = (data) => request({ url: '/project/remark', method: 'PUT', data });

// 添加新成员
export const addMember = (data) => request({ url: '/project-member', method: 'POST', data });

// 修改项目负责人
export const updatePrincipal = (data) => request({ url: '/project/principal', method: 'PUT', data });

// 获取项目动态
export const getLog = (id, params) => request({ url: '/project-log/' + id, method: 'GET', params: params });

// 查询回收的项目
export const searchRecover = (data) => request({ url: '/project/searchRecover', method: 'post', data });