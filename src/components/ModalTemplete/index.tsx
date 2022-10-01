import * as React from 'react';

interface IModalTempleteProps {
  children?: React.ReactNode;
  className?: string;
}

const ModalTemplete: React.FunctionComponent<IModalTempleteProps> = (props) => {
  const { children, className } = props;
  return (
    <div className="fixed inset-0 z-50 bg-black/20">
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${className}`}>{children}</div>
    </div>
  );
};

ModalTemplete.defaultProps = {
  className: '',
};
export default ModalTemplete;
