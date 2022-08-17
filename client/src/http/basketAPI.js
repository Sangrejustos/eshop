import {$authHost, $host} from "./index";

export const createBasketItem = async (amount, userId, deviceId) => {
  const {data} = await $authHost.post('/api/basket/', {amount, userId, deviceId})
  return data
}

export const fetchBasketDevices = async (userId) => {
  const {data} = await $authHost.get('/api/basket', {params: {userId}})
  return data
}