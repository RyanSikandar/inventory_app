import { React, useState } from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/Card/Card'
import { TiUserAddOutline } from "react-icons/ti"
import { registerUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SET_NAME, SET_LOGIN } from '../../redux/features/auth/authSlice'
import { Loader } from '../../components/Loader/Loader'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''

}

const Register = () => {
    const dipatch = useDispatch()
    const navigate = useNavigate()
    //Is loading state
    const [isLoading, setIsLoading] = useState(false)

    //Creating States to store the user input
    const [formData, setFormData] = useState(initialState)

    //Form Data
    const { name, email, password, confirmPassword } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }
    const register = async (e) => {
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword) {
            alert('All fields are required')
            return
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters')
            return
        }

        if (!validateEmail(email)) {
            alert('Invalid email')
            return
        }

        const userData = {
            name,
            email,
            password
        }
        setIsLoading(true)
        try {
            const data = await registerUser(userData)
            await dipatch(SET_LOGIN(true))
            await dipatch(SET_NAME(data.name))
            navigate('/dashboard')
            setIsLoading(false);

        }
        catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    }

    return (
        <div className={`conatiner ${styles.auth}`} id="loader">
            {
                isLoading && <Loader />
            }
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <TiUserAddOutline size={25} color="#999" />
                    </div>
                    <h2>Register</h2>
                    <form onSubmit={register}>
                        <input type='text' id='name' placeholder='Name' name='name' required value={name} onChange={handleInputChange} />
                        <input type='email' id='email' placeholder='Email' name='email' required value={email} onChange={handleInputChange} />
                        <input type='password' id='password' name='password' required placeholder='Password' value={password} onChange={handleInputChange} />
                        <input type='password' id='confirmPassword' name='confirmPassword' required placeholder='Confirm Password' value={confirmPassword} onChange={handleInputChange} />
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