import React from 'react'
import { FaProductHunt } from "react-icons/fa";
import "./Home.scss"
import { Link } from 'react-router-dom';
import HeroImg from '../../assets/inv-img.png'
const Home = () => {
    return (
        <div className='home'>
            <nav className='container --flex-between'>
                <div className='logo'>
                    <FaProductHunt size={25} />
                </div>
                <ul className='home-links'>
                    <li><Link to='/register'>Register</Link></li>
                    <li>
                        <button className='--btn --btn-primary'><Link to='/login'>Login</Link></button>
                    </li>
                    <li>
                        <button className='--btn --btn-primary'><Link to='/dashboard'>Dashboard</Link></button>
                    </li>
                </ul>

            </nav>
            {/* Hero Section  */}
            <section className='container hero'>
                <div className='hero-text'>
                    <h2> Inventory and Stock Management Solution</h2>
                    <p>
                        A simple and easy to use inventory and stock management solution for small businesses.
                    </p>
                    <div className='hero-buttons'>
                        <button className='--btn --btn-secondary'>
                            <Link to='/register'>Free Trial One Month</Link>
                        </button>
                    </div>
                    <div className='--flex-start'>
                        <NumberText number='14K' text='Brand Owners' />
                        <NumberText number='2k' text='Add your products' />
                        <NumberText number='3k' text='Start selling' />
                    </div>


                </div>

                <div className='hero-image'>
                    <img src={HeroImg} alt='hero' />
                </div>
            </section>
        </div>
    )
};

const NumberText = ({ number, text }) => {
    return (
        <div className='--mr'>
            <h3 className='--color-white'>{number}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home