import { useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdote, setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    //anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    dispatch(initializeAnecdote())
  }, [dispatch])
   
  return (
    <div>
    <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdote/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App