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

export default filterReducer