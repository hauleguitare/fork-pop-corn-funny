import { ICallBackStatusProps, IParams, ListResponse } from '@src/@types/__global__';
import { ISearchResult } from '@src/@types/__movies__';
import { fetchSearch } from '@src/api';
import Card from '@src/components/Card';
import NotFoundResult from '@src/components/NotFoundResult';
import Pagination from '@src/components/Pagination';
import MultiSkeleton from '@src/components/Skeleton/MultiSkeleton';
import { QueryStatus, useQuery } from '@tanstack/react-query';
import React, { Fragment, useState } from 'react';

interface IQueryResultsProps {
  params: IParams;
  type: string;
}

const QueryResults: React.FunctionComponent<IQueryResultsProps> = (props) => {
  const { params, type } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, status, error } = useQuery<ListResponse<ISearchResult>, Error>(
    [`search-query-result-${type}`, params, currentPage],
    () => {
      return fetchSearch(type, params, currentPage);
    },
    {
      keepPreviousData: true,
    }
  );

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (data?.total_results === 0) {
    return (
      <div className="mt-8 grid grid-cols-2 up-tablet:grid-cols-5 up-mobile:grid-cols-3 gap-8 up-tablet:gap-8">
        <NotFoundResult
          title={`Sorry, no ${data.total_results} results were found. Please try again.`}
          className="col-span-full w-full flex flex-col items-center justify-center object-cover"
        />
      </div>
    );
  }

  return (
    <Fragment>
      <ul className="mt-8 grid grid-cols-2 up-tablet:grid-cols-5 up-mobile:grid-cols-3 gap-8 up-tablet:gap-8">
        {isFetching && <MultiSkeleton total={20} className="w-full h-72 bg-dark-smooth-on-surface rounded-lg pr-8" />}
        {isLoading && <MultiSkeleton total={20} className="w-full h-72 bg-dark-smooth-on-surface rounded-lg pr-8" />}
        {data &&
          data.results.map((item) => (
            <li key={item.id}>
              <Card id={item.id} title={item.title ?? item.name ?? ''} img={item.poster_path} />
            </li>
          ))}
      </ul>
      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={data?.total_pages || 0}
          siblingCount={2}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
          className="flex justify-center items-center gap-2 px-2 py-2 bg-stone-chocolate shadow-lg rounded-lg"
        />
      </div>
    </Fragment>
  );
};

export default QueryResults;
