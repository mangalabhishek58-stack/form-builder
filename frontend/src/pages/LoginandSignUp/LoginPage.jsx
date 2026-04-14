import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import styles from './AuthPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Login } from '../../api/User'

function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState({ email: '', password: ''})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validate() {
    let err = false;
    setError({ email: '', password: ''})
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
    if (err) {
      return
    }
    handleLogin()
  }
  const handleLogin = async () => {
    try {
        const response = await Login( email , password);
        if (response.status == 200) {
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
        <div className={styles.loginForm}>
          <form onSubmit={handleSubmit}>

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

            <button type="submit">Log In</button>
          </form>
          <p className={styles.switch} onClick={() => navigate('/signup')} >Don't have an account? <span>Register now</span></p>
        </div>
      </div >
    </div >
  )
}

export default LoginPage
