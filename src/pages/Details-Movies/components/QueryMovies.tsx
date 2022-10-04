import { IDetailAbstractMovie } from '@src/@types/__movies__';
import { IExternal, Images } from '@src/@types/__movies__/append_to_response';
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
type AppendToResponse = Pick<IExternal, 'external_ids'> & Pick<Images, 'images'>;

const QueryMovies: React.FunctionComponent<IQueryMoviesProps> = (props) => {
  const { type, movieId } = props;

  // Declare type

  // Query data API
  const { data, isLoading, isError, error, isFetching } = useQuery<IDetailAbstractMovie & AppendToResponse, Error>(
    [`detail-movies-${type}-${movieId}`],
    () => {
      return fetchMovie<IDetailAbstractMovie & AppendToResponse>(type, movieId, ['external_ids']);
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
    <div className="min-h-screen">
      {data && (
        <React.Fragment>
          <BannerSection data={data} />
          <ContentSection data={data} socialMedia={data} type={type} />
        </React.Fragment>
      )}
    </div>
  );
};

export default QueryMovies;
