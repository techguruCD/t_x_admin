import React, { MouseEventHandler, HTMLAttributes, useState } from 'react'
import {
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    style?: Record<string, string>,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CustomButton = ({ icon, text, style, onClick }: CustomButtonProps) => {
    const [customButtonItemHover, setSideBarItemHover] = useState(false)

    function toggleHoverEffect(light: boolean) {
        setSideBarItemHover(light)
    }
    return (
        <div
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={onClick as any}
            className='custombutton__content__item'
            style={style}
            onMouseEnter={() => toggleHoverEffect(true)}
            onMouseLeave={() => toggleHoverEffect(false)}
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