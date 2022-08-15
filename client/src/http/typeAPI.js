import {$authHost, $host} from "./index";

export const createType = async (type) => {
  await $authHost.post('api/type', type)
}
export const fetchTypes = async () => {
  const {data} = await $host.get('api/type')
  return data
}
//
// export const check = async () => {
//   const {data} = await $authHost.get('api/user/auth', )
//   localStorage.setItem('token', data.token)
//   return jwtDecode(data.token)
// }