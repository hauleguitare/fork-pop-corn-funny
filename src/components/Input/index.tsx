import * as React from 'react';
import FormGroup from '../FormGroup';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  background?: string;
}

const InputRenderFn: React.ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (props, ref) => {
  const { label, background, children, type, ...rest } = props;
  return (
    <FormGroup>
      <label className="pb-2">{label}</label>
      <div className="relative">
        <input
          ref={ref}
          {...rest}
          className={`${background} outline-none py-2 px-2 text-dark-smooth-text-default rounded-lg w-full`}
        />
        {children}
      </div>
    </FormGroup>
  );
};

const Input = React.forwardRef(InputRenderFn);

Input.defaultProps = {
  disabled: false,
};

export default Input;
