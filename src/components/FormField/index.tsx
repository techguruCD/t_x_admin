import './formfield.scss'
import { AUTH } from '../../constants';
interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
}
const FormField = (props: FormFieldProps) => {
    const {
        label,
        type,
        placeholder,
    } = props

    return (
        <div className="form_field">
            <label className="form_field_label" htmlFor={label}>{label}</label>
            <input
                type={type == 'authcode' ? 'password' : type}
                placeholder={placeholder}
                // set length of input field
                maxLength={type == 'authcode' ? AUTH.CODE_MAX_LENGTH: 100}
            />
        </div>
    );
}

export default FormField