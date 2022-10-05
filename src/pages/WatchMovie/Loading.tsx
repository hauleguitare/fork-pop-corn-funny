import Skeleton from '@src/components/Skeleton';
import * as React from 'react';

interface ILoadingWatchMovieProps {}

const LoadingWatchMovie: React.FunctionComponent<ILoadingWatchMovieProps> = (props) => {
  return (
    <div className="container flex flex-col font-roboto">
      <div className="flex justify-center min-w-full min-h-full">
        <Skeleton className="relative h-0 pb-[56.25%] max-w-[1280px] basis-full bg-dark-smooth-on-surface" />
      </div>
      <div className="mt-8 w-full flex up-mobile:flex-row flex-col bg-dark-smooth-surface">
        <div className="grow-0">
          <div className="py-4 px-4 max-w-[1306px] grow up-mobile:w-[calc(100vw_-_230px-_32px)]">
            <Skeleton className="h-6 w-3/4 bg-dark-smooth-on-surface rounded-full" />
            <div className="pt-4">
              <Skeleton className="h-6 w-2/4 bg-dark-smooth-on-surface rounded-full" />
              <Skeleton className="h-6 w-1/4 bg-dark-smooth-on-surface rounded-full mt-4" />
              <Skeleton className="up-mobile:h-10 h-16 w-4/4 bg-dark-smooth-on-surface rounded-full mt-4" />
            </div>
          </div>
        </div>
        <aside className="up-mobile:w-[230px] w-full grow-0 up-mobile:mx-0 mx-4">
          <Skeleton className="h-6 w-3/4 bg-dark-smooth-on-surface rounded-full mt-4" />
          <Skeleton className="h-6 w-1/4 bg-dark-smooth-on-surface rounded-full mt-4" />
          <Skeleton className="h-6 w-2/4 bg-dark-smooth-on-surface rounded-full mt-4" />
        </aside>
      </div>
    </div>
  );
};

export default LoadingWatchMovie;
