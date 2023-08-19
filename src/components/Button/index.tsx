import './button.scss'

interface ButtonProps {
    style?: {
        width?: string,
        height?: string,
        color?: string
    },
    text: string
}

const Button = (props: ButtonProps) => {
    const { style } = props
    return (
        <button
            style={style}
            className="button">
            <p className="__text"> {props.text}</p>
        </button>
    )
}

export default Button