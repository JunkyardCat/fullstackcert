import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
//import axios from 'axios'
import { setNotification } from './reducers/notificationReducer'
import {
  createBlogFxn,
  deleteBlogFxn,
  initializeBlog,
  likeBlogFxn,
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import { userLogout, userLogin } from './reducers/userLoginReducer'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { Route, Routes } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import BlogDetail from './components/BlogDetail'
import { Link } from 'react-router-dom'
import { initializeComment } from './reducers/commentReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //console.log(errorMessage)
  const dispatch = useDispatch()
  const loggedInUser = useSelector(({ user }) => user)
  //console.log('App logged', loggedInUser)

  /*
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      dispatch(userLogin(user))
      //console.log('loggedUserJson')
      blogService.setToken(user.token)
    }
    //console.log('useEffect', loggedUserJSON)
    dispatch(initializeBlog())
    dispatch(initializeUsers())
    dispatch(initializeComment())
  }, [dispatch])

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
      //setErrorMessage('wrong username or password')
      /*
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */
    }
    //console.log('logging in with', username, password)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    //setUser(null)
    dispatch(userLogout())
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
      //const blog = await blogService.create({ title, author, url })
      //setBlogs(blogs.concat(blog))
      const content = { title, author, url }
      dispatch(createBlogFxn(content))

      //setErrorMessage(`a new blog ${title} by ${author} added`)
      /*
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */
      //showMessage()
      dispatch(setNotification(`a new blog ${title} by ${author} added`))
    } catch (exception) {
      setErrorMessage('error' + exception)
    }
  }

  const updateLikes = async (id, blogUpdate) => {
    try {
      //console.log('updateLikes before',id,blogUpdate)
      //const updatedBlog = await blogService.update(id, blogUpdate)
      //console.log('updateBlog',updatedBlog)
      //console.log('blogs content',blogs)
      /*
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      */
      dispatch(likeBlogFxn(id, blogUpdate))
      //console.log('newBlog',newBlogs)
      //console.log('blogs',blogs)
      //setBlogs(newBlogs)
      //console.log('end',newBlogs)
    } catch (exception) {
      setErrorMessage('error' + exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    //await blogService.deleteOneBlog(id)
    //const updatedBlog = blogs.filter((blog) => blog.id !== id)
    //setBlogs(updatedBlog)
    dispatch(deleteBlogFxn(id))
    dispatch(setNotification('blog removed'))
    //setErrorMessage('blog removed')
    /*
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    */
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
    //console.log('inside showblog')

    const blogStore = [
      { title: 'hello', author: 'governer', url: 'www.google.com', like: 0 },
    ]

    //const blogStore2 = useSelector((state) => state.blog)
    //console.log('after selector2')
    //console.log('inside showblog', blogStore)
    return (
      <div>
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogout}>
          <button id="logout-button" type="submit">
            log out
          </button>
        </form>
        <Toggleable buttonLabel="new blog">
          <BlogForm createBlog={createBlog} />
        </Toggleable>
        {blogStore
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

  /*
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? loginForm() : showBlog()}
    </div>
  )
  */

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(userLogout())
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blog
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <h2>blogs</h2>
      <Notification />

      {loggedInUser === null ? (
        <LoginForm />
      ) : (
        <>
          <p>{loggedInUser.username} logged in lol</p>
          <form onSubmit={handleLogOut}>
            <button id="logout-button2" type="submit">
              log out
            </button>
          </form>
          <Routes>
            <Route
              path="/"
              element={<Blogs username={loggedInUser.username} />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
