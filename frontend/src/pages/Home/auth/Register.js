import React from 'react'
import styles from "./auth.module.scss"
import Card from '../../../components/Card/Card'
import { Link } from 'react-router-dom'
import { TiUserAddOutline } from "react-icons/ti"
const Register = () => {
  return (
    <div className={`conatiner ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <TiUserAddOutline size={25} color="#999" />
                    </div>
                    <h2>Register</h2>
                    <form>
                       
                        <input type='email' id='email' placeholder='Email' name='email' required />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required placeholder='Password' />
                        <button className='--btn --btn-primary' type='submit'>Login</button>
                    </form>
                    <Link to="/forgot">Forgot Password</Link>
                    <span className={styles.register}>
                        <Link to="/">Home </Link>
                        &nbsp; Don't have an account? &nbsp;
                        <Link to="/register">Register</Link>                        
                    </span>
                
                </div>
            </Card>

        </div>
  )
}

export default Register