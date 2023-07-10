import axios from "axios";

const baseUrl  = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res=>res.data)

export const createAnecdote = newAnecdote => axios.post(baseUrl, newAnecdote).then(res=>res.data)

export const updateAnecdote = async updatedAnecdote => {
    //console.log('request',updatedAnecdote)
    //console.log(axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res=>res.data))
    const result = await axios.put(`${baseUrl}/${updatedAnecdote.id}`,updatedAnecdote)
    return result.data
}