import * as React from 'react';

interface IFormGroupProps {
  children?: React.ReactNode;
  className?: string;
}

const FormGroupRenderFn: React.ForwardRefRenderFunction<HTMLDivElement, IFormGroupProps> = (props, ref) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const FormGroup = React.forwardRef(FormGroupRenderFn);
FormGroup.defaultProps = {
  className: 'flex flex-col py-2 px-2',
};

export default FormGroup;
