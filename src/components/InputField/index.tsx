import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ErrorMessage, FieldProps } from 'formik';
import * as React from 'react';
import FormGroup from '../FormGroup';

interface IInputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  background?: string;
  placeholder?: string;
  disabled: boolean;
}

const InputField: React.FunctionComponent<IInputFieldProps & FieldProps> = (props) => {
  const { type, label, placeholder, disabled, background, field, form } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [parentRef] = useAutoAnimate<HTMLDivElement>({
    duration: 150,
    easing: 'linear',
  });

  return (
    <FormGroup ref={parentRef}>
      <label className="pb-2 text-dark-smooth-text-default/80">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`py-2 pl-2 ${background ? background : 'bg-transparent'} rounded-md shadow-md outline-none`}
      />
      {showError ? <label className="text-sm text-red-400 italic">{errors[name]?.toString()}</label> : undefined}
    </FormGroup>
  );
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

export default InputField;
