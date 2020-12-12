import React, { useState } from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({ handleUserLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      handleUserLogin({ username, password })
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>
      <form onSubmit = {handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            autoComplete="1113"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleUserLogin: PropTypes.func.isRequired,
}

export default LoginForm