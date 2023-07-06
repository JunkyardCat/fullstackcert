import React from 'react'
import ReactDOM from 'react-dom/client'
//import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
//import anecdoteReducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'
/*
const reducer = combineReducers({
  anecdote: anecdoteReducer,
  filter: filterReducer
})
*/
//const store = createStore(reducer)
/*
const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer
  }
})
*/

//console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)