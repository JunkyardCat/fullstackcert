import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const FilterAnecdote = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
        //console.log('event target value',event.target.value)
    }

    return (
        <div>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default FilterAnecdote