import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'

const SignIn = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleSignIn(formData)
    navigate('/')
  }

  return (
    <main className="signin-container">
  <div className="signin-card">
    <h1>Sign In</h1>
    {props.error && <p className="error-msg">{props.error}</p>}
    <form onSubmit={handleSubmit} className="signin-form">
      <label>Username</label>
      <input type="text" name="username" onChange={handleChange} value={formData.username} />

      <label>Password</label>
      <input type="password" name="password" onChange={handleChange} value={formData.password} />

      <button type="submit">Sign In</button>
    </form>
  </div>
</main>

  )
}

export default SignIn