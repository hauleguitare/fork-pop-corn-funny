import { IParams } from '@src/@types/__global__';
import MotionChangePage from '@src/components/MotionChangePage';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import GroupFilter from './components/Filter/GroupFilter';
import QueryResults from './components/Results/Query';

interface IDiscoverPageProps {
  type: string;
}

const DiscoverPage: React.FunctionComponent<IDiscoverPageProps> = (props) => {
  const { type } = props;
  const [currentParams, setCurrentParams] = useState<IParams>({});
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const ParseParams = (keyVal: string, val: string) => {
    if (val.length <= 0) {
      return;
    }
    setCurrentParams((params) => ({
      ...params,
      [keyVal]: val,
    }));
  };
  useEffect(() => {
    ParseParams('with_genres', searchParams.getAll('genre').toString());
    ParseParams('sort_by', searchParams.get('sort_by') || 'popularity.desc');
    ParseParams('with_runtime.lte', searchParams.get('maxRuntime')?.toString() || '200');
    ParseParams('with_runtime.gte', searchParams.get('minRuntime')?.toString() || '0');
    ParseParams('release_date.gte', searchParams.get('from') || '2018-01-01');
    ParseParams('release_date.lte', searchParams.get('to') || '2023-01-01');
  }, [location.search]);
  return (
    <MotionChangePage>
      <div className="container mt-4 max-w-[1280px] flex flex-col up-tablet:flex-row overflow-hidden">
        <GroupFilter type={type} />
        <QueryResults type={type} params={currentParams} />
      </div>
    </MotionChangePage>
  );
};

export default DiscoverPage;
