import React, { useState } from 'react'
import styles from "./auth.module.scss"
import { BiLogIn } from "react-icons/bi"
import Card from '../../components/Card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'



const initialState = {
    email: '',
    password: '',
}


const Login = () => {
    const dipatch = useDispatch()
    const navigate = useNavigate()
    //Is loading state
    const [isLoading, setIsLoading] = useState(false)

    //Creating States to store the user input
    const [formData, setFormData] = useState(initialState)

    //Form Data
    const { email, password } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }

    const login = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            alert('All fields are required')
            return
        }
        const userData = {
            email,
            password
        }
        setIsLoading(true)
        try {
            const data = await loginUser(userData)
            console.log(data)
            await dipatch(SET_LOGIN(true))
            await dipatch(SET_NAME(data.name))
            navigate('/dashboard')
            setIsLoading(false);

        }
        catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }
    return (
        <div className={`conatiner ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <BiLogIn size={25} color="#999" />
                    </div>
                    <h2>Login</h2>

                    <form onSubmit={login}>
                        <input type='email' id='email' placeholder='Email' name='email' required value={email} onChange={handleInputChange} />
                        <input type='password' id='password' name='password' required placeholder='Password' value={password} onChange={handleInputChange} />
                        <button className='--btn --btn-primary --btn-block' type='submit'>Login</button>
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

export default Login