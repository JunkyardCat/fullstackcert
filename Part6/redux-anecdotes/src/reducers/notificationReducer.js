import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return state
        },
        hideNotification(state,action){
            state = initialState
            return state
            //return null
        }
    }
})

export const { setNotification, hideNotification } = notificationSlice.actions

export const settingNotification = (message, timer) => {
    return (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() => dispatch(hideNotification()), timer * 1000)
    }
}

export default notificationSlice.reducer