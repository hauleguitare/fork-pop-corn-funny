import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ISeasons } from '@src/@types/__movies__';
import * as React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

interface IEpisodesSectionProps {
  data: ISeasons;
}

const EpisodesSection: React.FunctionComponent<IEpisodesSectionProps> = (props) => {
  const { data } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [parentRef] = useAutoAnimate<HTMLUListElement>();
  const [seeAllEp, setSeeAllEp] = React.useState(false);
  const [episodeNumber, setEpisodeNumber] = React.useState(1);

  React.useEffect(() => {
    const epCurrent = Number(searchParams.get('ep'));
    if (!epCurrent) {
      return;
    }
    setEpisodeNumber(epCurrent);
  }, [location.search]);

  return (
    <section className=" pt-4 font-roboto">
      <div className="flex">
        <span className="text-xl text-white/80">Episodes</span>
        <button
          onClick={() => setSeeAllEp(!seeAllEp)}
          className={`text-base pl-4 ${
            seeAllEp ? 'text-blue-primary' : 'text-white/60'
          } transition-colors duration-150 ease-linear hover:text-blue-primary`}
        >
          All Episodes
        </button>
      </div>
      <ul ref={parentRef}>
        {data.episodes.map((ep) => (
          <React.Fragment>
            {seeAllEp ? (
              <li key={ep.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    searchParams.set('ep', ep.episode_number.toString());
                    setSearchParams(searchParams);
                  }}
                  className="my-4 cursor-pointer flex up-mobile:flex-row flex-col up-mobile:items-start items-center up-mobile:py-4 up-mobile:px-4 border-white/50"
                >
                  <div className="w-[300px] shrink-0 rounded-lg overflow-hidden">
                    <img src={`https://image.tmdb.org/t/p/w300${ep.still_path}`} alt={ep.name} />
                  </div>
                  <div className="py-4 px-4 flex flex-col shrink up-mobile:text-start text-center">
                    <span
                      className={`text-xl ${
                        ep.episode_number === episodeNumber ? 'text-blue-primary' : 'text-white/80'
                      }`}
                    >
                      {ep.name}
                    </span>
                    <span className="text-white/50">
                      <span className="pr-2">{ep.air_date.toString()}</span>
                      <span className="pl-2 border-l-[1px] border-white/50">Episode {ep.episode_number}</span>
                    </span>
                    <div className="pt-4">
                      <p className={`${ep.episode_number === episodeNumber ? 'text-white/80' : 'text-white/60'}`}>
                        {ep.overview ? ep.overview : 'No overview'}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ) : (
              <React.Fragment>
                {ep.episode_number === episodeNumber && (
                  <li key={ep.id}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        searchParams.set('ep', ep.episode_number.toString());
                        setSearchParams(searchParams);
                      }}
                      className="my-4 cursor-pointer flex up-mobile:flex-row flex-col up-mobile:items-start items-center up-mobile:py-4 up-mobile:px-4 border-white/50"
                    >
                      <div className="w-[300px] shrink-0 rounded-lg overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/w300${ep.still_path}`} alt={ep.name} />
                      </div>
                      <div className="py-4 px-4 flex flex-col shrink up-mobile:text-start text-center">
                        <span
                          className={`text-xl ${
                            ep.episode_number === episodeNumber ? 'text-blue-primary' : 'text-white/80'
                          }`}
                        >
                          {ep.name}
                        </span>
                        <span className="text-white/50">
                          <span className="pr-2">{ep.air_date.toString()}</span>
                          <span className="pl-2 border-l-[1px] border-white/50">Episode {ep.episode_number}</span>
                        </span>
                        <div className="pt-4">
                          <p className={`${ep.episode_number === episodeNumber ? 'text-white/80' : 'text-white/60'}`}>
                            {ep.overview ? ep.overview : 'No overview'}
                          </p>
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
    </section>
  );
};

export default EpisodesSection;

/*
{data.episodes.map((ep) => (
              
            ))}

*/
