import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return null
    },
  },
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (content) => {
  return (dispatch) => {
    dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export default notificationSlice.reducer
