import React from 'react'
import loaderImg from '../../assets/loaderImg.gif'
import ReactDOM from 'react-dom'
import './Loader.scss'

export const Loader = () => {
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='loader'>
                <img src={loaderImg} alt='Loading...' />

            </div>

        </div>,
        document.getElementById('loader')
    )
}

export const SpinnerImg = () => {
    return (
        <div className='--center-all'>
            <img src={loaderImg} alt='Loading...' />
        </div>
    )
}