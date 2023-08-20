import React from 'react'
import './dashboardpane.scss'
import { UserTable } from '../Datatable/userTable'

const UsersPane = () => {
}

const AdsPane = () => {
    return (
        <div className='dashboardpane'>
            <section className='__header'>
                <h1> Ads </h1>
                <h2> 200 total </h2>
            </section>
            <UserTable/>
        </div>
    )
}

const DasboardPane = () => {
    return (
        <div className='dashboardpane_container'>
            <AdsPane />
        </div>
    )
}


export default DasboardPane