import * as React from 'react';
import { Link } from 'react-router-dom';

interface ILogoTextProps {
  title?: string;
  className?: string;
}

const LogoText: React.FunctionComponent<ILogoTextProps> = (props) => {
  const { title, className } = props;
  return (
    <a href={'/'} className={`${className} text-dark-smooth-brand font-merriweather font-bold`}>
      <p>{title}</p>
    </a>
  );
};

LogoText.defaultProps = {
  title: 'POPCORN',
  className: '',
};

export default LogoText;
