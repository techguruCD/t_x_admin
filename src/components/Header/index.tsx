import { useNavigate } from 'react-router-dom'
import './header.scss'
import {
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CustomButton } from '../Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../slices/authSlice';
import { useLogOutMutation } from '../../api/authApi';
import { handleError } from '../../utils/errorHandler';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogOutMutation()

    const onClick = async () => {
        try {
            await logout([]).unwrap()
            dispatch(logOut())
            navigate('/login')
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleError(error as any)
        }
    }

    return (
        <div className='header dashboard_content_modal'>
            <div className='header_section left'></div>
            <div className='header_section mid'></div>
            <div className='header_section right'>
                <CustomButton
                    icon={faSignOutAlt}
                    text='Logout'
                    onClick={onClick}
                />
            </div>
        </div>
    )
}


export default Header