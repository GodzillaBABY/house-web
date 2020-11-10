import { extend } from 'umi-request';

const request = extend({
  prefix: 'http://www.m3brand.top/api',
  timeout: 2000,
  // headers: {
  //   'Content-Type': 'aplication/json',
  // },
  requestType: 'json',
  errorHandler: (error) => {
    console.log(error)
  }
});

export const postCreatRoom: any = (parmas: any) => {
  return request('/roomInfo/save', {
    // headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: parmas,
  })
}
export const getRoomList: any = (params: any) => {
  return request('/roomInfo/listPage', {
    // headers: { 'Content-Type': 'multipart/form-data' },
    method: 'get',
    params: params
  })
}
export const getRoomDetail: any = (params: any) => {
  return request('/roomInfo/getInfo', {
    // headers: { 'Content-Type': 'multipart/form-data' },
    method: 'get',
    params: params
  })
}
export const updateRoom: any = (parmas: any) => {
  return request('/roomInfo/update', {
    // headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: parmas,
  })
}
export default { getRoomList, postCreatRoom }