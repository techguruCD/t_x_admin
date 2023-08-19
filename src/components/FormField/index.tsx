import './formfield.scss'
import { AUTH } from '../../constants';


interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    errorMessage?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormField = (props: FormFieldProps) => {
    const {
        label,
        type,
        name,
        placeholder,
        errorMessage,
        onChange
    } = props

    return (
        <div className="form_field">
            <label className="form_field_label" htmlFor={label}>{label}</label>
            <input
                type={type == 'authcode' ? 'password' : type}
                placeholder={placeholder ?? ''}
                name={name}
                maxLength={type == 'authcode' ? AUTH.CODE_MAX_LENGTH : 100}
                onChange={onChange}
            />
            <label className="form_field_error" htmlFor={label}>{errorMessage ?? ''}</label>
        </div>
    );
}

export default FormField