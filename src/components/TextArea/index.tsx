import * as React from 'react';
import FormGroup from '../FormGroup';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  background?: string;
}

const TextAreaFn: React.ForwardRefRenderFunction<HTMLTextAreaElement, ITextAreaProps> = (props, ref) => {
  const { label, background, children, ...rest } = props;
  return (
    <FormGroup>
      <label className="pb-2">{label}</label>
      <div className="relative">
        <textarea
          ref={ref}
          {...rest}
          className={`${background} outline-none py-2 px-2 text-dark-smooth-text-default rounded-lg w-full`}
        />
        {children}
      </div>
    </FormGroup>
  );
};

const TextArea = React.forwardRef(TextAreaFn);
export default TextArea;
