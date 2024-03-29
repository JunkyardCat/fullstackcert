import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useNotificationDispatch } from './NotificationContext'
import { useQueryClient, useQuery } from 'react-query'
import Blogs from './components/Blogs'
import { setToken } from './requests'
import { useUserDispatch, useUserValue } from './userContext'
//import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const userDispatch = useUserDispatch()
  const userValue = useUserValue()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      //blogService.setToken(user.token)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({ username, password })
      //blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      setToken(user.token)
      //setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'wrong username or password',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
    //console.log('logging in with', username, password)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    )
  }

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${title} by ${author} added`,
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
        })
      }, 5000)
    } catch (exception) {
      //setErrorMessage('error' + exception)
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `error ${exception}`,
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
        })
      }, 5000)
    }
  }

  const updateLikes = async (id, blogUpdate) => {
    try {
      //console.log('updateLikes before',id,blogUpdate)
      const updatedBlog = await blogService.update(id, blogUpdate)
      //console.log('updateBlog',updatedBlog)
      //console.log('blogs content',blogs)
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      //console.log('newBlog',newBlogs)
      //console.log('blogs',blogs)
      setBlogs(newBlogs)
      //console.log('end',newBlogs)
    } catch (exception) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `error ${exception}`,
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
        })
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    await blogService.deleteOneBlog(id)
    const updatedBlog = blogs.filter((blog) => blog.id !== id)
    setBlogs(updatedBlog)
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: 'blog removed',
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
      })
    }, 5000)
    //console.log('removed')
  }

  /*
  const blogForm = () => {
    <form onSubmit={ addBlog }>
      <input
        value={ newBlog }
        onChange={ handleBlogChange }
      />
      <button type='submit'>save</button>
    </form>
  }
  */

  const showBlog = () => {
    //changeme please change username to name as soon as more users are added to db with name
    return (
      <div>
        <p>{user.username} logged in</p>
        <form onSubmit={handleLogout}>
          <button id="logout-button" type="submit">
            log out
          </button>
        </form>
        <Toggleable buttonLabel="new blog">
          <BlogForm createBlog={createBlog} />
        </Toggleable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              username={user.username}
            />
          ))}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {userValue === null ? (
        loginForm()
      ) : (
        <Blogs username={userValue.username} />
      )}
    </div>
  )
}

export default App
