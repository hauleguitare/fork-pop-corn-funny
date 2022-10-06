import { IDetailAbstractMovie } from '@src/@types/__movies__';
import { IExternal, Images, ISimilar, IVideos } from '@src/@types/__movies__/append_to_response';
import { fetchMovie } from '@src/api';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import BannerSection from './Banner';
import BannerLoading from './Banner/Loading';
import ContentSection from './Content';
import ContentLoading from './Content/Loading';

interface IQueryMoviesProps {
  type: string;
  movieId: number;
}
export type AppendToResponse = Pick<IExternal, 'external_ids'> &
  Pick<Images, 'images'> &
  Pick<IVideos, 'videos'> &
  Pick<ISimilar, 'similar'>;

const QueryMovies: React.FunctionComponent<IQueryMoviesProps> = (props) => {
  const { type, movieId } = props;

  // Declare type

  // Query data API
  const { data, isLoading, isError, error, isFetching } = useQuery<IDetailAbstractMovie & AppendToResponse, Error>(
    [`detail-movies-${type}-${movieId}`],
    () => {
      return fetchMovie<IDetailAbstractMovie & AppendToResponse>(type, movieId, [
        'external_ids',
        'videos',
        'images',
        'similar',
      ]);
    }
  );

  if (isError) {
    console.log(error);
  }

  if (isLoading) {
    return (
      <React.Fragment>
        <BannerLoading />
        <ContentLoading />
      </React.Fragment>
    );
  }

  return (
    <div>
      {data && (
        <React.Fragment>
          <BannerSection data={data} type={type} />
          <ContentSection data={data} type={type} />
        </React.Fragment>
      )}
    </div>
  );
};

export default QueryMovies;
