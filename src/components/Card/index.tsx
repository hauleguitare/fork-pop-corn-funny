import FallBackCard from '@src/asserts/images/fallback_card300x450.png';
import * as React from 'react';
import { BiPlayCircle } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from '../Skeleton';

interface ICardProps {
  className?: string;
  title: string;
  id: number;
  img?: string;
  widthImageEndpoint?: string;
  url?: string;
  widthSkeleton?: string;
  heightSkeleton?: string;
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const { title, id, img, widthImageEndpoint, url, className, widthSkeleton, heightSkeleton } = props;
  const navigate = useNavigate();

  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (url) {
      navigate(url, {
        replace: true,
      });
    }
  };

  return (
    <a onClick={handleRedirect} className="relative cursor-pointer">
      <div className={`group relative ${className}`}>
        <div className="relative">
          <LazyLoadImage
            src={img ? `https://image.tmdb.org/t/p/${widthImageEndpoint}/${img}` : FallBackCard}
            effect={'opacity'}
            placeholder={
              <Skeleton
                className="bg-dark-smooth-on-surface"
                style={{
                  width: widthSkeleton,
                  height: heightSkeleton,
                }}
              />
            }
            className="rounded-md overflow-hidden group-hover:scale-105 transition-all duration-75 ease-linear group-hover:shadow-2xl"
          />
          <div className="absolute inset-0 max-w-[60px] max-h-[60px] mx-auto my-auto">
            <BiPlayCircle
              size={'60px'}
              className="group-hover:visible group-hover:scale-100 hover:opacity-100 invisible scale-125 fill-white opacity-50 transition duration-150 ease-in"
            />
          </div>
        </div>

        <p className="text-base text-white/50 group-hover:text-white font-roboto text-ellipsis overflow-hidden whitespace-nowrap pt-2">
          {title}
        </p>
      </div>
    </a>
  );
};

Card.defaultProps = {
  widthImageEndpoint: 'w300',
  className: '',
};

export default Card;
