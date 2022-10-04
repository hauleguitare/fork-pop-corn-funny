import Skeleton from '@src/components/Skeleton';
import * as React from 'react';
import './buttonActive.css';
interface IContentLoadingProps {}

const ContentLoading: React.FunctionComponent<IContentLoadingProps> = (props) => {
  return (
    <div className="relative">
      <div className="absolute top-0 -translate-y-1/2 py-2 w-full flex justify-center">
        <div className="up-mobile:px-4 py-4 bg-dark-smooth-on-surface rounded-lg shadow-lg">
          <div className="overflow-hidden rounded-full shadow-xl">
            <button
              id="btn_tab_overview"
              className={'tw-button-non-active cursor-wait transition-colors duration-150 ease-in'}
            >
              Overview
            </button>
            <button
              id="btn_tab_seriesCast"
              className={'tw-button-non-active cursor-wait transition-colors duration-150 ease-in'}
            >
              Series Cast
            </button>
            <button
              id="bt_tab_comments"
              className={'tw-button-non-active cursor-wait transition-colors duration-150 ease-in'}
            >
              Comments
            </button>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <div className="flex up-mobile:flex-row flex-col container justify-between bg-dark-smooth-surface font-roboto up-mobile:px-0 rounded-lg">
          <Skeleton className="min-h-[500px] w-full bg-dark-smooth-surface px-8">
            <Skeleton className="mt-8 w-1/4 h-6 rounded-full bg-dark-smooth-on-surface" />
            <Skeleton className="mt-4 w-3/4 h-6 rounded-full bg-dark-smooth-on-surface" />
            <Skeleton className="mt-4 w-2/4 h-6 rounded-full bg-dark-smooth-on-surface" />
            <Skeleton className="mt-4 w-1/4 h-6 rounded-full bg-dark-smooth-on-surface" />
          </Skeleton>
          <Skeleton className="min-w-[200px] bg-dark-smooth-surface">
            <Skeleton className="mt-8 w-2/4 h-6 rounded-full bg-dark-smooth-on-surface" />
            <Skeleton className="mt-4 w-3/4 h-6 rounded-full bg-dark-smooth-on-surface" />
            <Skeleton className="mt-4 w-2/4 h-6 rounded-full bg-dark-smooth-on-surface" />
            <Skeleton className="mt-4 w-1/4 h-6 rounded-full bg-dark-smooth-on-surface" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ContentLoading;
