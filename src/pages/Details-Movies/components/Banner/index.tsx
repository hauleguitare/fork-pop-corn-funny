import { IDetailAbstractMovie } from '@src/@types/__movies__';
import ProgressBarCircle from '@src/components/ProgressBarCircle';
import Skeleton from '@src/components/Skeleton';
import * as React from 'react';
import { BsBookmarksFill, BsShareFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import BannerLoading from './Loading';

interface IBannerSectionProps {
  data: IDetailAbstractMovie;
  type: string;
}

const BannerSection: React.FunctionComponent<IBannerSectionProps> = (props) => {
  const { data, type } = props;
  const navigate = useNavigate();

  const handleOnClickWatch = (e: React.MouseEvent) => {
    if (type === 'tv') {
      navigate('watch?season=1&ep=1');
    } else if (type === 'movie') {
      navigate('watch');
    } else {
      return;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="relative up-mobile:min-h-[500px] min-h-[300px]"
    >
      <div className="absolute inset-0 bg-black/50">
        <div className="flex w-full translate-y-1/2 container px-4 up-mobile:px-0">
          <div className="object-cover overflow-hidden rounded-lg up-mobile:max-w-[185px] up-mobile:max-h-[263px] max-w-[100px] max-h-[200px]">
            <a onClick={handleOnClickWatch} className="cursor-pointer group relative">
              <LazyLoadImage src={data.poster_path ? `https://image.tmdb.org/t/p/w185/${data.poster_path}` : ''} />
              <div className="group-hover:visible group-hover:bg-black/50 bg-transparent invisible transition-all duration-150 ease-linear absolute inset-0 flex items-center justify-center">
                <p className="font-roboto py-2 px-2 bg-blue-primary rounded-lg opacity-60 hover:opacity-100 text-xl text-white/60 hover:text-white/80 group-hover:visible transition-all invisible duration-150 ease-linear">
                  Watch
                </p>
              </div>
            </a>
          </div>
          <div className="pl-8 font-roboto">
            <p className="text-dark-smooth-primary up-mobile:text-4xl text-lg font-oswald">
              {data.title ?? data.name} <span className="text-dark-smooth-text-default">(2022)</span>
            </p>
            <ul className="flex flex-wrap pb-2">
              {data.genres.map((genre) => (
                <li
                  key={genre.id}
                  className="mr-2 rounded-full text-sm flex-wrap up-mobile:text-base text-dark-smooth-brand/90 font-abyssinicaSIL cursor-pointer"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            <div className="w-full flex items-center gap-4">
              <ProgressBarCircle
                value={data.vote_average}
                className={
                  'text-white w-12 font-bold font-roboto text-base hover:scale-125 duration-150 ease-in transition cursor-pointer'
                }
              />
              <button className="w-8 group">
                <BsShareFill className="fill-white opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
              </button>
              <button className="w-8 group">
                <BsBookmarksFill className="fill-white opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;

/*

*/
