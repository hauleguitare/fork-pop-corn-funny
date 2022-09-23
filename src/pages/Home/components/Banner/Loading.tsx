import Skeleton from '@src/components/Skeleton';
import React, { Fragment } from 'react';

interface IBannerLoadingProps {
  isLoading: boolean;
}

const BannerLoading: React.FunctionComponent<IBannerLoadingProps> = (props) => {
  const { isLoading } = props;
  return (
    <Fragment>
      {isLoading && (
        <Skeleton className="relative container max-w-[1280px] shadow-[#1c1b1b] w-full h-[720px] shadow-lg bg-dark-smooth-surface rounded-lg cursor-wait">
          <Skeleton className="absolute top-0  px-4 py-4 up-tablet:px-8 flex flex-col gap-4 w-full">
            <Skeleton className="up-tablet:w-[500px] w-3/4 h-10 up-tablet:h-14 bg-dark-smooth-on-surface rounded-xl" />
            <Skeleton className="up-tablet:w-[300px] w-2/4 h-8 up-tablet:h-10 bg-dark-smooth-on-surface rounded-xl" />
            <Skeleton className="up-tablet:w-[200px] w-1/4 h-8 uptablet:h-10 bg-dark-smooth-on-surface rounded-xl" />
            <Skeleton className="up-tablet:w-[400px] w-full h-32 up-tablet:h-32 bg-dark-smooth-on-surface rounded-xl" />
          </Skeleton>
        </Skeleton>
      )}
    </Fragment>
  );
};

export default BannerLoading;
