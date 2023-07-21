import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  //console.log('get all user', response.data)
  return response.data
}

const getUser = async (id) => {
  //console.log('getUser', id)
  const response = await axios.get(`${baseUrl}/${id}`)
  //console.log('hello', response.data)
  return response.data
}

export default { getUsers, getUser }
