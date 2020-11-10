
import { httpGet } from './request'
// export const postCreatRoom: any = (parmas: any) => {

//   request('/roomInfo/save', {
//     // headers: { 'Content-Type': 'multipart/form-data' },
//     method: 'post',
//     data: parmas,
//   }).then(data => console.log(data)
//   )
// }
// export const getRoomList: any = (params: any): Promise<any> => {
//   request('/roomInfo/listPage', {
//     // headers: { 'Content-Type': 'multipart/form-data' },
//     method: 'get',
//     params: params
//   }).then(data => console.log(data))
//   // return httpGet('/roomInfo/listPage', params)
// }
// export const getRoomList = async (params: any) => {
//   return httpGet('/roomInfo/listPage', {
//     method: 'get',  // 如果是get方法可省
//     data: params, //  所有方法传参都通过body，没有省略即可
//   })
  // export async function Login(params) {
  //   // params 来自于effects中参数

  //    // 对应rest接口，/server/api/用的是config.js中proxy代理。详细配置在config.js中配置。
  //     return request('/server/api/web/rest/UserRest/login', { 
  //         // 请求方式
  //         method: 'POST',
  //        // 用data包裹参数是官方指定写法，如果data有参数umi-request会默认读取data里面参数。
  //         data: {
  //             cmd: 'login',
  //             type: 'request',
  //             request: {
  //                 username: 'admin',
  //                 password: 'admin'
  //             }
  //         }
  //     })
  // }

// }