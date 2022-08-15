import {$authHost, $host} from "./index";

export const createBrand = async (brand) => {
  await $authHost.post('api/brand', brand)
}
export const fetchBrands = async () => {
  const {data} = await $host.get('api/brand')
  return data
}
//
// export const check = async () => {
//   const {data} = await $authHost.get('api/user/auth', )
//   localStorage.setItem('token', data.token)
//   return jwtDecode(data.token)
// }