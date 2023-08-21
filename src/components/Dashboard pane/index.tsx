import React, { useState, useEffect } from 'react'
import './dashboardpane.scss'
import { UserTable } from '../Datatable/UserTable'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

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
    const [userCount, setUserCount] = useState(0)

    return (
        <div className='dashboardpane'>
            <section className='__header'>
                <h1> Users </h1>
                <h2> {userCount} total </h2>
            </section>
            <UserTable setUserCount={setUserCount}/>
        </div>
    )
}

const DasboardPane = () => {
    const dashboard = useSelector((state: RootState) => state.dashboard)

    useEffect(() => {

    }, [dashboard])

    return (
        <div className='dashboardpane_container'>
            {dashboard.selectedPane === 'ads' ? <AdsPane /> : <UsersPane />}
        </div>
    )
}


export default DasboardPane