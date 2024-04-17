import React from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/Card/Card'
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
                        <input type='text' id='name' placeholder='Name' name='name' required />
                        <input type='email' id='email' placeholder='Email' name='email' required />
                        <input type='password' id='password' name='password' required placeholder='Password' />
                        <input type='password' id='password' name='Confirmpassword' required placeholder='Confirm Password' />
                        <button className='--btn --btn-primary --btn-block' type='submit'>Register</button>
                    </form>
                    <Link to="/forgot">Forgot Password</Link>
                    <span className={styles.register}>
                        <Link to="/">Home </Link>
                        &nbsp; Already have an account? &nbsp;
                        <Link to="/login">Login</Link>
                    </span>

                </div>
            </Card>

        </div>
    )
}

export default Register