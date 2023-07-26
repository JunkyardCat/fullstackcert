import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  /*
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  */
  /*
  if (!token) {
    console.log('login form show', token)
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }
*/
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }
  const Content = () => {
    if (page === 'login') {
      return (
        <LoginForm
          show={page === 'loginl'}
          setToken={setToken}
          setError={setErrorMessage}
          setPage={setPage}
        />
      )
    } else if (page === 'authors') {
      return <Authors show={page === 'authors'} />
    } else if (page === 'books') {
      return <Books show={page === 'books'} />
    } else if (page === 'add') {
      return <NewBook show={page === 'add'} setError={setErrorMessage} />
    }
  }
  return (
    <div>
      <div>
        <button onClick={toPage('authors')}>authors</button>
        <button onClick={toPage('books')}>books</button>
        {token ? (
          <span>
            <button onClick={toPage('add')}>add book</button>

            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <span>
            <button onClick={toPage('login')}>login</button>
          </span>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Content />
    </div>
  )
}

export default App
