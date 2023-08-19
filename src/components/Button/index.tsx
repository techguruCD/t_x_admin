import './button.scss'

interface ButtonProps {
    style?: {
        width?: string,
        height?: string,
        color?: string
    },
    text: string
    onClick?: () => void
}

const Button = (props: ButtonProps) => {
    const { style} = props
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

export default Button