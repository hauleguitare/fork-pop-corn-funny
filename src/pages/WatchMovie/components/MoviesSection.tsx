import { IDetailAbstractMovie, ISeasons } from '@src/@types/__movies__';
import { fetchMovie } from '@src/api';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import RecommendSection from './RecommendSection';
import SeasonSection from './SeasonSection';
import WatchFilm from './WatchFilm';

interface IMoviesSectionProps {
  movieId: number;
  type: string;
}

const MoviesSection: React.FunctionComponent<IMoviesSectionProps> = (props) => {
  const { movieId, type } = props;
  const { isLoading, isError, data, isFetching } = useQuery<IDetailAbstractMovie, Error>(
    [`query-details-movies-${type}-${movieId}`],
    () => {
      return fetchMovie<IDetailAbstractMovie>(type, movieId, ['seasons']);
    }
  );

  if (isLoading) {
    return <div>Is loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="container flex flex-col font-roboto">
      {data && (
        <React.Fragment>
          <WatchFilm movieId={movieId} type={type} />
          <div className="mt-8 w-full flex up-mobile:flex-row flex-col bg-dark-smooth-surface">
            <div className="grow-0">
              <div className="py-4 px-4 max-w-[1306px] grow up-mobile:w-[calc(100vw_-_230px-_32px)]">
                <span className=" text-3xl text-dark-smooth-primary font-oswald">
                  {data.title ?? data.name ?? 'Unknown name'}
                </span>
                <div className="pt-4">
                  <span className="text-xl text-white/80">Overview</span>
                  <span className="px-2 text-dark-smooth-text-default/60 italic text-base">{data.tagline}</span>
                  <p className="px-4 pt-4 text-dark-smooth-text-default/60">{data.overview}</p>
                </div>
                {type === 'tv' && <SeasonSection movieId={movieId} seasonDetail={data} />}
              </div>
            </div>
            <aside className="up-mobile:w-[230px] w-full grow-0">
              <RecommendSection movieId={movieId} type={type} />
            </aside>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default MoviesSection;
