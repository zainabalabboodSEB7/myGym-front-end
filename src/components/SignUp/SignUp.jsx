import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css' 

const SignUp = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    email: '', 
    password: '',
    passwordConf: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)


  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  // made this function asynchronous
  const handleSubmit = async (evt) => {
    evt.preventDefault()  
    // saved the return as "result"
    const result = await props.handleSignUp(formData)
    // if sign up is succssful, navigate to home
    if (result.success){
      navigate('/')
    } else {
      // otherwise, set the error message state 
      setError(result.message)
    }
  }

  let formIsInvalid = true

  if (formData.username && formData.email && formData.password && formData.password === formData.passwordConf) {
    formIsInvalid = false
  }

  return (
    <main className="signup-container" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '3rem',
  }}>
      <div className="signup-card">
        <h1>Create an Account</h1>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="passwordConf"
            onChange={handleChange}
            value={formData.passwordConf}
          />

          <button type="submit" disabled={formIsInvalid}>
            Sign up
          </button>
        </form>
      </div>
    </main>
  )
}

export default SignUp