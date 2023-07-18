import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getBlogs = () =>
  axios.get(baseUrl).then((res) => {
    //console.log('res.data', res.data)
    return res.data
  })

export const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log('token add', config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
  return blog.id
}

export const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log('updateBlog 01', blog, blog.id)
  const result = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  //console.log('updateBlog 02', result)
  return result.data
}
