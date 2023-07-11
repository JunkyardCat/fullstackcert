import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      //queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Too short anecdote, must have length 5 or more`
      })
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000)
    }
  })
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      //console.log('updatedAnecdote1',updatedAnecdote)
      const anecdotes = queryClient.getQueryData('anecdotes')
      //console.log('update anecdote mutation',anecdotes)
      //queryClient.setQueryData('anecdotes', anecdotes.concat(updatedAnecdote))
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote:updatedAnecdote ))
      //queryClient.setQueryData('anecdotes',)
      //queryClient.invalidateQueries('anecdotes')
      
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1 })
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote ${anecdote.content} has been voted on`
    })
    setTimeout(() => {
      dispatch({type: 'RESET'})
    }, 5000)
    //console.log('vote',anecdote)
    //console.log('vote 2',updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes}))
    //console.log('vote 3',{...anecdote, votes:anecdote.votes+1})

  }
  /*
  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]
  */
  /*
  const result = useQuery(
    'anecdotes',
    () => axios.get('http://localhost:3001/anecdotes').then(res=>res.data),
    {
      retry:1
    }
  )
  */
  const result = useQuery('anecdotes',getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if(result.isLoading){
    return <div>loading data...</div>
  }
  
  if(result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data
  
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote ${content} has been added`
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
      })
    }, 5000)
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
