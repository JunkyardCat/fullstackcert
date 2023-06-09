import axios from 'axios'
//const baseUrl = 'http://localhost:3001/anecdotes'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log('inside service',response)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (content) => {
    const { id } = content
    const vote = { votes: content.votes+1 }
    const response = await axios.patch(`${baseUrl}/${id}`, vote)
    return response.data
}

export default { getAll,createNew, update }