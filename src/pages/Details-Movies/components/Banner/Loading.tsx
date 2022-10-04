import Skeleton from '@src/components/Skeleton';
import * as React from 'react';

interface IBannerLoadingProps {}

const BannerLoading: React.FunctionComponent<IBannerLoadingProps> = (props) => {
  return (
    <Skeleton className="relative up-mobile:min-h-[500px] min-h-[300px] bg-dark-smooth-surface">
      <div className="absolute inset-0 bg-black/50">
        <div className="flex w-full translate-y-1/2 container px-4 up-mobile:px-0">
          <Skeleton className="bg-dark-smooth-on-surface rounded-lg up-mobile:w-[185px] up-mobile:h-[263px] w-[130px] h-[150px]"></Skeleton>
          <div className="pl-8 font-roboto w-full">
            <Skeleton className="w-full up-mobile:w-3/4 h-6 bg-dark-smooth-on-surface rounded-full mb-4"></Skeleton>
            <Skeleton className="w-3/4 up-mobile:w-2/4 h-6 bg-dark-smooth-on-surface rounded-full mb-4"></Skeleton>
            <Skeleton className="w/1/2 up-mobile:w-1/4 h-6 bg-dark-smooth-on-surface rounded-full"></Skeleton>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default BannerLoading;
