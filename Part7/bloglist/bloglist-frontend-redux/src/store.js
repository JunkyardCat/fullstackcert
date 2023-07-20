import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userLoginReducer from './reducers/userLoginReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userLoginReducer,
    users: usersReducer,
    comments: commentReducer,
  },
})

export default store
