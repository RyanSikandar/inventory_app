import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import { Loader, SpinnerImg } from '../../components/Loader/Loader'
import Card from '../../components/Card/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateProfile } from '../../services/authService'

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const { email } = user

    useEffect(() => {
        if (!email) {
            navigate('/profile')
        }
    }, [email, navigate])

    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,
    }
    const [profile, setProfile] = useState(initialState)
    const [profileImage, setProfileImage] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfile({ ...profile, [name]: value })
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    };

    const saveProfile = async (e) => {
        e.preventDefault();

        try {
            //handle image upload
            let imageUrl;
            if (profileImage &&
                (profileImage.type === 'image/jpeg' || profileImage.type === 'image/png' || profileImage.type === 'image/jpg')) {
                const image = new FormData();
                image.append('file', profileImage);
                image.append('upload_preset', 'lexve31c');
                image.append('cloud_name', 'dwupplpon');

                //first save the image to cloudinary
                const res = await fetch('https://api.cloudinary.com/v1_1/dwupplpon/image/upload', {
                    method: 'POST',
                    body: image
                })

                const data = await res.json();
                imageUrl = data.url.toString();
                toast.success('Image uploaded successfully')
            }

            //update the profile with the new image
            const formData = {
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                photo: profileImage ? imageUrl : profile.photo
            }

            const profile_updated = await updateProfile(formData);
            console.log(profile_updated)
            toast.success('Profile updated successfully')
            navigate('/profile')


        }
        catch (error) {
            setIsLoading(false)
            toast.error('Image upload failed')
        }
    };




    return (
        <div className='profile --my2'>
            {isLoading && <SpinnerImg />}
            <Card cardClass={"card --flex-dir-column"}>

                <span className='profile-photo'>
                    <img src={user?.photo} alt='profile'>
                    </img>

                </span>
                <form onSubmit={saveProfile} className='--form-control --m'>
                    <span className='profile-data'>
                        <p>
                            <label> Name:

                            </label>
                            <input type='text' name='name' value={profile?.name} onChange={handleInputChange} />
                        </p>

                        <p>
                            <label> Email:
                            </label>
                            <input type='email' name='email' value={profile?.email} disabled />
                        </p>
                        <code>Email cannot be changed</code>
                        <p>
                            <label> Phone:
                            </label>
                            <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label> Bio:
                            </label>
                            <textarea name='bio' value={profile?.bio} rows={"10"} cols={"30"} onChange={handleInputChange} />
                        </p>

                        <p>
                            <label> Photo:
                            </label>
                            <input type='file' name='photo' onChange={handleImageChange} />
                        </p>

                        <div>
                            <button className='--btn --btn-primary'>
                                Edit Profile
                            </button>
                        </div>


                    </span></form>
            </Card>


        </div>
    )
}

export default EditProfile