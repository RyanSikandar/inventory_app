import React from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'

import { AiOutlineMail } from "react-icons/ai"
const Reset = () => {
  return (
    <div className={`conatiner ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={25} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form>
            <input type='password' id='password' name='password' required placeholder='Password' />
            <input type='password' id='password' name='Confirmpassword' required placeholder='Confirm Password' />

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