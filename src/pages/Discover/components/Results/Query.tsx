import { IParams, ListResponse } from '@src/@types/__global__';
import { IAbstractMovie } from '@src/@types/__movies__';
import { fetchDiscover } from '@src/api';
import NotFoundResult from '@src/components/NotFoundResult';
import MultiSkeleton from '@src/components/Skeleton/MultiSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import ListItemResults from './ListItem';

interface IQueryResultsProps {
  type: string;
  params: IParams;
}

const QueryResults: React.FunctionComponent<IQueryResultsProps> = (props) => {
  const { type, params } = props;
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    ListResponse<IAbstractMovie>,
    Error
  >([`get-data-${type}-filter`, params], ({ pageParam = 1 }) => fetchDiscover(pageParam, type, params), {
    getNextPageParam: (result) => (result.page + 1 <= result.total_pages ? result.page + 1 : undefined),
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-8 up-laptop:grid-cols-5 w-full px-4">
        <MultiSkeleton total={20} widthCard={'160px'} heightCard={'15rem'} />
      </div>
    );
  }

  if (isError) {
    return <div>ERROR...</div>;
  }

  if (data.pages[0].total_results <= 0) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-8 up-laptop:grid-cols-5 w-full px-4 min-h-[500px]">
        <NotFoundResult
          title="Sorry, don't have movie you results, please try again!"
          className="w-full h-full col-span-full flex flex-col items-center"
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-8 up-laptop:grid-cols-5 w-full px-4">
          <>
            {data ? (
              <ListItemResults pages={data.pages} />
            ) : (
              <MultiSkeleton total={20} widthCard={'227px'} heightCard={'15rem'} />
            )}
            {isFetching && <MultiSkeleton total={20} widthCard={'160px'} heightCard={'220px'} />}
          </>
        </div>
        {data.pages.reduce((acc, curr) => [...acc, ...curr.results], [] as Array<IAbstractMovie>).length >= 20 && (
          <div className="flex justify-center py-2 mx-4 mt-4 bg-blue-primary rounded-lg text-white">
            <button
              disabled={!hasNextPage}
              onClick={() => {
                fetchNextPage();
              }}
              className={`${!hasNextPage ? 'disabled:cursor-not-allowed opacity-50' : ''} w-full`}
            >
              <span className="text-base">{hasNextPage ? 'Load more' : 'No more movies to load'}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QueryResults;

/*

reduce((acc, curr) => [...acc, ...curr.results], [] as Array<IAbstractMovie>).length
*/
