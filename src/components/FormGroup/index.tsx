import * as React from 'react';

interface IFormGroupProps {
  children?: React.ReactNode;
}

const FormGroupRenderFn: React.ForwardRefRenderFunction<HTMLDivElement, IFormGroupProps> = (props, ref) => {
  const { children } = props;
  return (
    <div ref={ref} className="flex flex-col py-2 px-2">
      {children}
    </div>
  );
};

const FormGroup = React.forwardRef(FormGroupRenderFn);

export default FormGroup;
