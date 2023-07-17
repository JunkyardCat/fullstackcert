import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userLoginReducer from './reducers/userLoginReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userLoginReducer,
  },
})

export default store
