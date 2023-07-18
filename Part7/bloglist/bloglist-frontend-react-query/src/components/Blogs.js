import { useQuery } from 'react-query'
import { getBlogs } from '../requests'
import Blog from './Blog'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { useUserDispatch } from '../userContext'

const Blogs = ({ username }) => {
  const result = useQuery('blogs', getBlogs, {
    refetchOnWindowFocus: false,
  })
  const userDispatch = useUserDispatch()

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({
      type: 'RESET',
    })
  }
  //console.log('result map', result.data)
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
      {result.data
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={username} />
        ))}
    </div>
  )
}

export default Blogs
