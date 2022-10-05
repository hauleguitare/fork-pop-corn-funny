import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IDetailAbstractMovie, ISeasons } from '@src/@types/__movies__';
import { fetchSeason } from '@src/api/fetchSeasons';
import Dropdown from '@src/components/Dropdown';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import EpisodesSection from './EpisodesSection';

interface ISeasonSectionProps {
  movieId: number;
  seasonDetail: Pick<IDetailAbstractMovie, 'seasons'>;
}

const SeasonSection: React.FunctionComponent<ISeasonSectionProps> = (props) => {
  const { movieId, seasonDetail } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [seeAllSeason, setSeeAllSeason] = React.useState(false);
  const [seasonNumber, setSeasonNumber] = React.useState(Number(searchParams.get('season')) ?? 1);
  const { isLoading, isError, data, isFetching } = useQuery<ISeasons, Error>(
    [`query-seasons-tv-${movieId}-season-number-${seasonNumber}`],
    () => {
      return fetchSeason(movieId, seasonNumber);
    }
  );
  const [parentRef] = useAutoAnimate<HTMLUListElement>();

  React.useEffect(() => {
    const seasonCurrent = Number(searchParams.get('season'));
    if (!seasonCurrent) {
      return;
    }
    setSeasonNumber(seasonCurrent);
  }, [location.search]);

  return (
    <section className="font-roboto pt-4">
      <div className="flex">
        <span className="text-xl text-white/80">Seasons</span>
        <button
          onClick={() => setSeeAllSeason(!seeAllSeason)}
          className={`text-base  hover:text-blue-primary transition-colors duration-150 ease-linear pl-4 ${
            seeAllSeason ? 'text-blue-primary' : 'text-white/60'
          }`}
        >
          All seasons
        </button>
      </div>

      <ul ref={parentRef}>
        {seasonDetail.seasons?.map((item) => (
          <React.Fragment>
            {seeAllSeason ? (
              <li key={item.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    searchParams.set('season', item.season_number.toString());
                    searchParams.set('ep', '1');
                    setSearchParams(searchParams);
                  }}
                  className="my-4 cursor-pointer flex up-mobile:flex-row flex-col up-mobile:items-start items-center up-mobile:py-4 up-mobile:px-4 border-white/50"
                >
                  <div className="w-[92px] shrink-0 rounded-lg overflow-hidden">
                    <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.name} />
                  </div>
                  <div className="py-4 px-4 flex flex-col shrink up-mobile:text-start text-center">
                    <span
                      className={`text-xl ${
                        item.season_number === seasonNumber ? 'text-blue-primary' : 'text-white/60'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="text-white/50">
                      <span className="pr-2">{item.air_date.toString()}</span>
                      <span className="pl-2 border-l-[1px] border-white/50">{item.episode_count} Episode</span>
                    </span>
                    <div className="pt-4">
                      <p className="text-white/60">{item.overview ? item.overview : 'No overview'}</p>
                    </div>
                  </div>
                </a>
              </li>
            ) : (
              <React.Fragment>
                {item.season_number === seasonNumber && (
                  <li key={item.id}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        searchParams.set('season', item.season_number.toString());
                        setSearchParams(searchParams);
                      }}
                      className="my-4 cursor-pointer flex up-mobile:flex-row flex-col up-mobile:items-start items-center up-mobile:py-4 up-mobile:px-4 border-white/50"
                    >
                      <div className="w-[92px] shrink-0 rounded-lg overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.name} />
                      </div>
                      <div className="py-4 px-4 flex flex-col shrink up-mobile:text-start text-center">
                        <span
                          className={`text-xl ${
                            item.season_number === seasonNumber ? 'text-blue-primary' : 'text-white/80'
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-white/50">
                          <span className="pr-2">{item.air_date.toString()}</span>
                          <span className="pl-2 border-l-[1px] border-white/50">{item.episode_count} Episode</span>
                        </span>
                        <div className="pt-4">
                          <p className="text-white/60">{item.overview ? item.overview : 'No overview'}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </ul>
      {data && <EpisodesSection data={data} />}
    </section>
  );
};

export default SeasonSection;

/*


*/
