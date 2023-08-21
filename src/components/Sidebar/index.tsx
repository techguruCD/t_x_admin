import React, { useState } from 'react'
import './sidebar.scss'
import {
    faUsers, faBullhorn, faSignOutAlt,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, IconProp } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store';
import { SetPanePayload, setSelectedPane } from '../../slices/dashboardSlice';

interface SideBarItemProps {
    icon: IconDefinition;
    text: string;
}

const SideBarItem = ({ icon, text }: SideBarItemProps) => {
    const [sideBarItemHover, setSideBarItemHover] = useState(false)
    const [iconColor, setIconColor] = useState('bright')
    const dispatch = useDispatch<AppDispatch>()

    function toggleHoverEffect(light: boolean) {
        setSideBarItemHover(light)
        setIconColor(iconColor === 'bright' ? 'dark' : 'bright')
    }

    const onClick = () => {
        dispatch(setSelectedPane(text.toLowerCase() as SetPanePayload))
    }

    return (
        <div
            className='sidebar__content__item'
            onMouseEnter={() => toggleHoverEffect(true)}
            onMouseLeave={() => toggleHoverEffect(false)}
            onClick={onClick}
        >
            <FontAwesomeIcon
                className='icon'
                icon={icon}
                style={{
                    color: sideBarItemHover ? 'white' : 'black',
                }}
            />
            <p style={{ color: sideBarItemHover ? 'white' : 'black' }}>
                {text} </p>
        </div >
    )
}

const Sidebar = () => {
    return (
        <div className='sidebar dashboard_content_modal'>
            <div className='sidebar__header'>
                <img id='sidebar__close' src='https://img.icons8.com/?size=1x&id=I4wZrEpGYajn&format=png' alt='close' />
                <h1> Dashboard </h1>
            </div>

            <div className='sidebar__content'>
                <SideBarItem icon={faUsers} text='Users' />
                <SideBarItem icon={faBullhorn} text='Ads' />
            </div>


            <div className='sidebar__footer'>
                <div className='sidebar_admin_info'>
                    <img src='https://img.icons8.com/ios-glyphs/30/000000/user.png' alt='user' />
                    <h3 className='admin_name'> Admin </h3>
                    <p className='admin_email'> admin@genx.com</p>
                </div>
            </div>
        </div>
    )
}


export default Sidebar