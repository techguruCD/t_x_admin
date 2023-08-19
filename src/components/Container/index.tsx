import './container.scss'

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="container">
            <p> Button </p>
            {children}
        </div>
    )
}

export default Container;