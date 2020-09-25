import request from '../utils/request';




// 查询立项的产品数据
export const searchProduct = (data) => request({ url: "/projectApproval/searchProduct", method: "post", data: data });


// 保存人员配置
export const savePerson = (data) => request({ url: "/projectApproval/savePerson", method: "post", data: data });


// 更新立项流程状态
export const productStatus = (data) => request({ url: "/projectApproval/productStatus", method: "post", data: data });

// 更新立项流程状态
export const updateProduct = (data) => request({ url: "/projectApproval/updateProduct", method: "post", data: data });


// 保存里程
export const saveMileage = (data) => request({ url: "/projectApproval/saveMileage", method: "post", data: data });