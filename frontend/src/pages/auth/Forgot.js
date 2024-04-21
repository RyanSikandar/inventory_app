import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'

import { AiOutlineMail } from "react-icons/ai"
import { forgotPassword, validateEmail } from '../../services/authService'



const Forgot = () => {
  const [email, setEmail] = useState('')

  const forgot = async (e) => {
    e.preventDefault()
    if (!email) {
      alert('Email is required')
      return
    }
    if (!validateEmail(email)) {
      alert('Invalid email')
      return
    }
    const userData = {
      email
    }
    await forgotPassword(userData)
    setEmail('')

  }
  return (
    <div className={`conatiner ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={25} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input type='email' id='email' placeholder='Email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className='--btn --btn-primary --btn-block' type='submit'>Get Reset Email</button>
            <div className={styles.links}>
              <Link to="/">-Home </Link>
              <Link to="/login">-Login</Link>
            </div>
          </form>


        </div>
      </Card>

    </div>
  )
}

export default Forgot