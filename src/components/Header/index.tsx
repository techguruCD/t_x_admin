import React, { useState } from 'react'
import './header.scss'
import {
    faUsers, faBullhorn, faSignOutAlt,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, IconProp } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { CustomButton } from '../Button';

interface SideBarItemProps {
    icon: IconDefinition;
    text: string;
}

const SideBarItem = ({ icon, text }: SideBarItemProps) => {
    const [sideBarItemHover, setSideBarItemHover] = useState(false)
    const [iconColor, setIconColor] = useState('bright')

    function toggleHoverEffect(light: boolean) {
        setSideBarItemHover(light)
        setIconColor(iconColor === 'bright' ? 'dark' : 'bright')
    }
    return (
        <div
            className='header__content__item'
            onMouseEnter={() => toggleHoverEffect(true)}
            onMouseLeave={() => toggleHoverEffect(false)}
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

const Header = () => {
    return (
        <div className='header dashboard_content_modal'>
           <div className='header_section left'></div>
           <div className='header_section mid'></div>
           <div className='header_section right'>
                <CustomButton
                    icon={faSignOutAlt}
                    text='Logout'
                    style={{}}
                />
           </div>
        </div>
    )
}


export default Header