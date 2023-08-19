import './formfield.scss'
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
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}

export default FormField