import { useDispatch, useSelector } from 'react-redux'
//import Blog from './Blog'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
//import { userLogout } from '../reducers/userLoginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  try {
    //const blogStore = useSelector((state) => state.blog)
    /*
    const blogStore = useSelector(({ blog }) => {
      return blog.sort((a, b) => b.likes - a.likes)
    })
    */
    /*
    const handleLogOut = () => {
      window.localStorage.removeItem('loggedBlogappUser')
      dispatch(userLogout())
    }
    */

    const blogStore = useSelector((state) =>
      state.blog.map((b) => b).sort((a, b) => b.likes - a.likes)
    )
    //console.log('inside blogs', blogStore, typeof blogStore)
    /*
    return (
      <div>
        <p>{username} logged in</p>
        <form onSubmit={handleLogOut}>
          <button id="logout-button" type="submit">
            log out
          </button>
        </form>
        <Toggleable buttonLabel="new blog">
          <BlogForm />
        </Toggleable>
        {blogStore.map((blog) => (
          <Blog key={blog.id} blog={blog} username={username} />
        ))}
      </div>
    )
    */
    return (
      <div>
        <Toggleable buttonLabel="new blog">
          <BlogForm />
        </Toggleable>
        <table>
          <tbody>
            {blogStore.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} - {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } catch (e) {
    dispatch(setNotification(e))
  }
}

export default Blogs
