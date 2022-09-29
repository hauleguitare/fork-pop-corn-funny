import * as React from 'react';

interface IButtonFieldProps {
  title: string;
  hightlight: string;
  color: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  titleButton: string;
  classNameButton?: string;
}

const ButtonField: React.FunctionComponent<IButtonFieldProps> = (props) => {
  const { title, hightlight, color, onClick, className, classNameButton, titleButton } = props;
  return (
    <div
      className={`py-4 px-4 mx-4 mt-4 flex flex-col up-mobile:flex-row items-center gap-4 justify-between bg-dark-smooth-on-surface rounded-lg ${className}`}
    >
      <span>
        {title}{' '}
        <span
          style={{
            color: color,
          }}
        >
          {hightlight}
        </span>
      </span>
      <button className={classNameButton} onClick={onClick}>
        {titleButton}
      </button>
    </div>
  );
};

ButtonField.defaultProps = {
  className: '',
  classNameButton: '',
};

export default ButtonField;
