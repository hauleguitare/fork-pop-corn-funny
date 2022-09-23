import * as React from 'react';
import NotFoundResultImg from '@src/asserts/svg/notfound_result.svg';

interface INotFoundResultProps {
  title: string;
  className?: string;
}

const NotFoundResult: React.FunctionComponent<INotFoundResultProps> = (props) => {
  const { title, className } = props;
  return (
    <div className={className}>
      <p className="text-white/80 text-xl up-tablet:text-3xl font-roboto pb-4">{title}</p>
      <img src={NotFoundResultImg} />
    </div>
  );
};

export default NotFoundResult;
