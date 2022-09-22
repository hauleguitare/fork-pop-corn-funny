import React, { Fragment } from 'react';
import { TbStarHalf, TbStar } from 'react-icons/tb';

interface IRatingStarProps {
  vote_average: number;
}

const setStar = (vote_average: number): JSX.Element[] => {
  const arrStar: JSX.Element[] = [];
  const calc = vote_average / 2;
  if (calc % 1 === 0) {
    for (let i = 0; i < calc; i++) {
      arrStar.push(<TbStar className="w-7 h-full fill-yellow-500" strokeWidth={0} />);
    }
  } else {
    for (let i = 0; i < Math.floor(calc); i++) {
      arrStar.push(<TbStar className="w-7 h-full fill-yellow-500" strokeWidth={0} />);
    }
    arrStar.push(<TbStarHalf className="w-7 fill-yellow-500 h-full" strokeWidth={0} />);
  }
  return arrStar;
};

const RatingStar: React.FunctionComponent<IRatingStarProps> = (props) => {
  const { vote_average } = props;

  const arr = setStar(vote_average);
  return (
    <span className="h-10 flex flex-row items-center text-xl text-dark-smooth-text-default font-roboto gap-2 py-2">
      <span>{vote_average.toString().padEnd(3, '.0')}</span>
      <div className="flex flex-row">
        {arr.map((star, idx) => (
          <Fragment key={idx}>{star}</Fragment>
        ))}
      </div>
    </span>
  );
};

export default RatingStar;
