import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/Card/Card'
import { Link, useParams } from 'react-router-dom'

import { AiOutlineMail } from "react-icons/ai"
import { resetPassword } from '../../services/authService'
import { toast } from 'react-toastify'

const initialState = {
  password2: '',
  password: '',
}


const Reset = () => {
  //Creating States to store the user input
  const [formData, setFormData] = useState(initialState)

  //params 
  const { resetToken } = useParams()
  //Form Data
  const { password2, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

  }

  const reset = async (e) => {
    e.preventDefault()
    if (!password || !password2) {
      alert('All fields are required')
      return
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    if (password !== password2) {
      alert('Passwords do not match')
      return
    }

    const userData = {
      password,
      password2
    }
    try {
      await resetPassword(userData, resetToken)
      toast.success('Password reset successful')
    }
    catch (error) {
      toast.error("Password reset failed")
    }
  }
  return (
    <div className={`conatiner ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={25} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input type='password' id='password' name='password' required onChange={handleInputChange} placeholder='Password' value={password} />
            <input type='password' id='password' onChange={handleInputChange} name='password2' required placeholder='Confirm Password' value={password2} />

            <button className='--btn --btn-primary --btn-block' type='submit'>Reset Password</button>
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

export default Reset