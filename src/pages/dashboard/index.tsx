import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import './dashboard.scss'

function Dasboard() {
    return (
        <div className='dashboard_container'>
            <Sidebar  />
            <Header />
        </div>
    )
}

export default Dasboard