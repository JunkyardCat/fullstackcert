import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { userLogin } from '../reducers/userLoginReducer'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(userLogin(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" id="login-button">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
