import request from '../utils/request';



// 负责人日程管理列表
export const manageSearchTask = (data) => request({ url: "/projectApproval/manageSearchTask", method: "post", data: data });


// 查询当前人任务
export const userFimdTask = (data) => request({ url: "/projectApproval/userFimdTask", method: "post", data: data });

// 查询时间范围内有任务的产品
export const manageSearchProduct = (data) => request({ url: "/projectApproval/manageSearchProduct", method: "post", data: data });

// 查找负责人
export const searchManageUser = (data) => request({ url: "/projectApproval/searchManageUser", method: "post", data: data });

// 验收任务
export const checkTask = (data) => request({ url: "/projectApproval/checkTask", method: "post", data: data });
