import axios from 'axios'
//const baseUrl = 'http://localhost:3001/anecdotes'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log('inside service',response)
    return response.data
}

export default { getAll }