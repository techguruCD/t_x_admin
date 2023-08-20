import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import './dashboard.scss'
import DasboardPane from '../../components/Dashboard pane'

function Dasboard() {
    return (
        <div className='dashboard_container'>
            <Sidebar />
            <div className='dashboard_content'>
                <Header />

                <DasboardPane />
            </div>
        </div>
    )
}

export default Dasboard