import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import {
    faUsers, faBullhorn, faSignOutAlt,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, IconProp } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import './button.scss'

interface ButtonProps {
    style?: {
        width?: string,
        height?: string,
        color?: string
    },
    text: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (props: ButtonProps) => {
    const { style } = props
    const onClick = props.onClick ? props.onClick : () => { }

    return (
        <button
            onClick={onClick}
            style={style}
            className="button">
            <p className="__text"> {props.text}</p>
        </button>
    )
}

interface CustomButtonProps {
    icon: IconDefinition,
    text: string,
    style: Record<string, string>,
    onClick?: (e: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => void
}

const CustomButton = ({ icon, text, style, onClick }: CustomButtonProps) => {
    const [customButtonItemHover, setSideBarItemHover] = useState(false)

    function toggleHoverEffect(light: boolean) {
        setSideBarItemHover(light)
    }
    return (
        <div
            className='custombutton__content__item'
            style={style}
            onMouseEnter={() => toggleHoverEffect(true)}
            onMouseLeave={() => toggleHoverEffect(false)}
            onClick={onClick}
        >
            <FontAwesomeIcon
                className='icon'
                icon={icon}
                style={{
                    color: customButtonItemHover ? 'white' : 'black',
                }}
            />
            <p style={{ color: customButtonItemHover ? 'white' : 'black' }}>
                {text} </p>
        </div >
    )
}

export {
    Button,
    CustomButton
}
export default Button