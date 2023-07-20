import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const addComment = async (newComment) => {
  const response = await axios.post(baseUrl, newComment)
  console.log('inside service addComment', response, response.data)
  return response.data
}

export default { getAll, addComment }
