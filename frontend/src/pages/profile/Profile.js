import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import useRedirect from '../../customHook/useRedirect'
import { useDispatch } from 'react-redux'
import { getUserDetails } from '../../services/authService'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import { SpinnerImg } from '../../components/Loader/Loader'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
const Profile = () => {
    useRedirect("/login")
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUserDetails()
            console.log(data)

            setProfile(data)
            setIsLoading(false)

            await dispatch(SET_USER(data))
            dispatch(SET_NAME(data.name))

        }
        getUserData()
    }, [dispatch]);

    return (
        <div className='profile --my2'>
            {isLoading && <SpinnerImg />}
            <>
                {!isLoading && profile === null ? (
                    <p>Something went wrong, please reload</p>
                ) : (
                    <Card cardClass={"card --flex-dir-column"}>

                        <span className='profile-photo'>
                            <img src={profile?.photo} alt='profile'>
                            </img>

                        </span>
                        <span className='profile-data'>
                            <p>
                                <b>
                                    Name:

                                </b> {profile?.name}

                            </p>

                            <p>
                                <b>
                                    Email: {profile?.email}
                                </b>
                            </p>
                            <p>
                                <b>
                                    Bio:
                                </b> {profile?.bio}
                            </p>

                            <div>
                                <Link to='/profile-update'>
                                    <button className='--btn --btn-primary'>Edit Profile</button>

                                </Link>
                            </div>


                        </span>
                    </Card>
                )}
            </>

        </div>
    )
}

export default Profile