import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    //const anecdotes = useSelector((state) => state.anecdote)
    const anecdotes = useSelector(({anecdote, filter}) => {
        console.log('anecdote',anecdote)
        console.log('filter',filter)
        let sorted = [...anecdote]
        if(filter===''){
            //sorted = anecdote
            return sorted.sort((a,b)=>b.votes-a.votes)
        }else{
            return anecdote.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
        }

    })
    const dispatch = useDispatch()
    
    const vote = (id) => {
        dispatch(addVote(id))
        const anecdote = anecdotes.find((a) => a.id === id)
        console.log('vote',anecdote)
        dispatch(setNotification(`you have voted for ${anecdote.content}`))
        console.log('yey')
        setTimeout(() => dispatch(hideNotification()), 5000)
    }
    /*
    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
          </div>
    )
    */
   return (
    <div>
         {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
    </div>
   )
}

export default AnecdoteList