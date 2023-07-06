import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    //const anecdotes = useSelector((state) => state.anecdote)
    const anecdotes = useSelector(({anecdote, filter}) => {
        if(filter===''){
            return anecdote
        }else{
            return anecdote.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
        }

    })
    const dispatch = useDispatch()
    
    const vote = (id) => {
        dispatch(addVote(id))
    }
    
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
}

export default AnecdoteList