import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import styles from './AuthPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Register } from '../../api/User'

function SignUpPage() {
  const navigate = useNavigate()
  const [error, setError] = useState({ username: '', password: '', email: '', confirmPassword: '' })
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function validate() {
    let err = false;
    setError({ username: '', password: '', email: '', confirmPassword: '' })
    if (username.trim().length === 0) {
      err = true
      setError((error) => {
        return {
          ...error,
          username: 'Username is required'
        }
      })
    }

    if (email.trim().length === 0) {
      err = true
      setError((error) => {
        return {
          ...error,
          email: 'Email is required'
        }
      })
    }
    if (password.trim().length === 0) {
      err = true
      setError((error) => {
        return {
          ...error,
          password: 'Password is required'
        }
      })
    }
    if (confirmPassword.trim().length === 0) {
      err = true
      setError((error) => {
        return {
          ...error,
          confirmPassword: 'Confirm Password is required'
        }
      })
      return 
    }
    if(confirmPassword !== password){
      err = true
      setError((error) => {
        return {
          ...error,
          confirmPassword: 'Password is Not Matched'
        }
      })
    }
    if (err) {
      return
    }
    handleRegisterUser()
  }
  const handleRegisterUser = async () => {
    try {
        const response = await Register(username , email , password);
        if (response.status == 201) {
            localStorage.setItem('userToken', response.data.userToken)
            // alert(response.data)
            navigate('/dashboard')
        }else{
            alert(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }

}

  const handleSubmit = (e) => {
    e.preventDefault();
    validate()
  };
  return (
    <div className={styles.page} >
      <GoArrowLeft className={styles.backButton} onClick={() => navigate('/')} />
      <div className={`${styles.shape} , ${styles.yellow}`}></div>
      <div className={`${styles.shape} , ${styles.pink}`}></div>


      <div className={styles.formPage} >
        <div className={styles.signupForm}>
          <form onSubmit={handleSubmit}>
            <div className={`${error.username ? styles.inputBoxError : styles.inputBox }`}>
              <label htmlFor="username" >Username</label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder='Enter a username'
                onChange={(e) => setUsername(e.target.value)}
              />
              {error.username && <p>{error.username}</p>}
            </div>

            <div className={`${error.email ? styles.inputBoxError : styles.inputBox }`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && <p>{error.email}</p>}
            </div>

            <div className={`${error.password ? styles.inputBoxError : styles.inputBox }`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder='Enter a password'
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && <p>{error.password}</p>}
            </div>

            <div className={`${error.confirmPassword ? styles.inputBoxError : styles.inputBox }`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder='Enter Same Password Again'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error.confirmPassword && <p>{error.confirmPassword}</p>}
            </div>

            <button type="submit">Sign Up</button>
          </form>
          <p className={styles.switch} onClick={() => navigate('/login')} >Already have an account? <span>Login</span></p>
        </div>
      </div >
    </div >
  )
}

export default SignUpPage
