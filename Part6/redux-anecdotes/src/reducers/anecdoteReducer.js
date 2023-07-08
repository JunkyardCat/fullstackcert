import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)
/*
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':{
      const { id } = action.data
      const anecdoteUpdate = state.find((a) => a.id === id)
      const updateAnecdote = { ...anecdoteUpdate, votes: anecdoteUpdate.votes+1 }

      return state.map((anecdote) => anecdote.id !== id ? anecdote:updateAnecdote)
    }
    case 'CREATE':{
      return [...state, action.data]
    }
    default: return(state)
  }
}

export const addVote = (id) => {
  console.log('id',id)
  return{
    type: 'VOTE',
    data: { id },
  }
}

export const addAnecdote = (newAnecdote) => {
  return{
    type: 'CREATE',
    data: {
      content: newAnecdote,
      id: getId(),
      votes: 0,
    }
  }
}
*/

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const votedAnecdote = action.payload
      const {id} = action.payload
      return state.map((anecdote) => anecdote.id !== id ? anecdote:votedAnecdote)
      //const id = action.payload
      //const anecdoteUpdate = state.find((a) => a.id === id)
      //const updateAnecdote = {...anecdoteUpdate, votes: anecdoteUpdate.votes+1}
      //return state.map((anecdote) => anecdote.id !== id ? anecdote:updateAnecdote)
    },
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (content) => {
  return async dispatch => {
    const voted = await anecdoteService.update(content)
    dispatch(addVote(voted))
  }
}

export default anecdoteSlice.reducer