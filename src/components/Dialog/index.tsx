import * as React from 'react';

interface IDialogProps {
  children?: React.ReactNode;
}

const Dialog: React.FunctionComponent<IDialogProps> = (props) => {
  const { children } = props;
  return (
    <div className="fixed inset-0 z-50 bg-black/20">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{children}</div>
    </div>
  );
};

export default Dialog;
