import { useNavigate } from 'react-router-dom'
import './header.scss'
import {
     faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CustomButton } from '../Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../slices/authSlice';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = () => {
        dispatch(logOut())
        navigate('/')
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