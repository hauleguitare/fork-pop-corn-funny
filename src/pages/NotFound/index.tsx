import * as React from 'react';
import { AiOutlineQuestion } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import NotFound from '@src/asserts/svg/notfound_page.svg';
import MotionChangePage from '@src/components/MotionChangePage';

interface INotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<INotFoundPageProps> = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionChangePage>
      <div className="flex flex-col max-w-7xl items-center mx-auto mt-8 container overflow-hidden">
        <div className="my-auto mx-auto flex flex-col items-center">
          <p className="text-white font-merriweather text-2xl up-tablet:text-6xl text-center">404</p>
          <p className="text-white font-oswald text-2xl up-tablet:text-5xl text-center">Oops! Page not found</p>
          <div className="relative object-cover overflow-x-hidden">
            <AiOutlineQuestion className="absolute top-0 left-0 w-10 up-mobie:w-20 h-10 up-mobie:h-20 -rotate-45 fill-white animate-ping" />
            <AiOutlineQuestion className="absolute top-0 right-0 w-10 up-mobie:w-20 h-10 up-mobie:h-20 rotate-45 fill-white animate-ping" />
            <img src={NotFound} className="pb-8" />
          </div>
          <Link
            to={'/'}
            className="px-2 py-4 bg-stone-500 text-white hover:bg-stone-200 hover:text-black transition-all duration-150 text-xl up-mobile:text-4xl rounded-lg font-oswald"
          >
            Return Home Page
          </Link>
        </div>
      </div>
    </MotionChangePage>
  );
};

export default NotFoundPage;
