import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const like = async (Blog, id) => {
  const updatedBlog = await axios.put(`${baseUrl}/${id}`, Blog)
  return updatedBlog.data
}

const removeBlog =  id => {
  const config = { headers: { Authorization: token } }
  const res = axios.delete(`${baseUrl}/${id}`, config)
    .then(res => res)
    .catch(err => err)
  return res
}

export default { getAll, create, setToken, like, removeBlog }