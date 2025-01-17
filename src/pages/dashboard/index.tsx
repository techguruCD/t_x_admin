import React, { useEffect} from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import './dashboard.scss'
import DasboardPane from '../../components/Dashboard pane'

function Dasboard() {
    return (
        <div className='dashboard_container'>
            <div className="dashboard_side_left">
                <Sidebar />
            </div>
            <div className='dashboard_content'>
                <Header />
                <DasboardPane />
            </div>
        </div>
    )
}

export default Dasboard