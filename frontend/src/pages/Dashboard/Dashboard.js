import React from 'react'
import useRedirect from '../../customHook/useRedirect'

const Dashboard = () => {
    useRedirect('/login')
    return (
        <div id='loader'>
            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard