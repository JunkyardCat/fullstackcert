import { createSlice } from "@reduxjs/toolkit"
/*
export const setFilter = (filter) => {
    return {
        type: 'FILTER',
        data: filter
    }
}

const filterReducer = (state = '', action) => {
    switch(action.type){
        case 'FILTER':
            //console.log('inside filter', action.data)
            return action.data
        default:
            return state
    }
}
*/
const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterAnecdote(state,action) {
            console.log(action)
            return action.payload
        }
    }
})

export const {filterAnecdote} = filterSlice.actions
export default filterSlice.reducer