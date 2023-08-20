import React, { useState } from 'react'
import './dashboardpane.scss'
import { UserTable } from '../Datatable/userTable'

const AdsPane = () => {
    return (
        <div className='dashboardpane'>
            <section className='__header'>
                <h1> Ads </h1>
                <h2> 200 total </h2>
            </section>
            <UserTable />
        </div>
    )
}

const UsersPane = () => {
    return (
        <div className='dashboardpane'>
            <section className='__header'>
                <h1> Users </h1>
                <h2> 200 total </h2>
            </section>
            <UserTable />
        </div>
    )
}

type PaneId = 'ads' | 'users'
const DasboardPane = () => {
    const [selectedPane, setSelectedPane] = useState<PaneId>('ads')

    return (
        <div className='dashboardpane_container'>
            {selectedPane === 'ads' ? <AdsPane /> : <UsersPane />}
        </div>
    )
}


export default DasboardPane