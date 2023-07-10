import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes } from './requests'

const App = () => {
  
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
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
  const result = useQuery('anecdotes',getAnecdotes)

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
