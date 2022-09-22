import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import FallBackCard from '@src/asserts/images/fallback_card.png';
import { BiPlayCircle } from 'react-icons/bi';
import Skeleton from '../Skeleton';

interface ICardProps {
  className?: string;
  title: string;
  id: number;
  img: string | null;
  widthImageEndpoint?: string;
  url?: string;
  widthSkeleton?: string;
  heightSkeleton?: string;
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const { title, id, img, widthImageEndpoint, url, className, widthSkeleton, heightSkeleton } = props;
  return (
    <div className={className}>
      <a href="#" className="relative">
        <div className="group hover:scale-105 rounded-md overflow-hidden transition ease-in duration-150 relative object-cover">
          <LazyLoadImage
            src={img ? `https://image.tmdb.org/t/p/${widthImageEndpoint}/${img}` : FallBackCard}
            className="group-hover:shadow-2xl shadow-[#1c1b1b] transition-shadow duration-75 ease-linear"
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
          />

          <p className="text-base text-white/50 group-hover:text-white font-roboto text-ellipsis overflow-hidden whitespace-nowrap pt-2">
            {title}
          </p>
          <div className="absolute inset-0 max-w-[60px] max-h-[60px] mx-auto my-auto">
            <BiPlayCircle
              size={'60px'}
              className="group-hover:visible group-hover:scale-100 hover:opacity-100 invisible scale-125 fill-white opacity-50 transition duration-150 ease-in"
            />
          </div>
        </div>
      </a>
    </div>
  );
};

Card.defaultProps = {
  widthImageEndpoint: 'w300',
  className: '',
};

export default Card;
