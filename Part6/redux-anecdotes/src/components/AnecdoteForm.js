import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"
import anecdotes from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value=''
    //dispatch(addAnecdote(newAnecdote))
    //const newAnec = await anecdotes.createNew(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`New anecdote added named ${newAnecdote}`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }
  
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )

}

export default AnecdoteForm