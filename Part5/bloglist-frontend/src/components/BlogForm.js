import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [ newBlog, setNewBlog ] = useState({ title: '', author: '', url: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    //console.log(event.target)
    setNewBlog({ ...newBlog, [name]:value })
  }
  const handleCreate = (event) => {
    event.preventDefault()
    createBlog(newBlog.title, newBlog.author, newBlog.url)
    setNewBlog({ title: '', author: '', url: '' })
  }
  return(
    <div>
      <form onSubmit={ handleCreate }>
      title: <input type="text" name="title" onChange={handleInputChange} value={newBlog.title} />
      author: <input type="text" name="author" onChange={handleInputChange} value={newBlog.author} />
      url: <input type="text" name="url" onChange={handleInputChange} value={newBlog.url} />
        <button id="create-blog" type="submit">add blog</button>
      </form>
    </div>
  )
}

export default BlogForm