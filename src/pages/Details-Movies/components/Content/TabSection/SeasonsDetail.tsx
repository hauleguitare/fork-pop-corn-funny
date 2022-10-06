import { IDetailAbstractMovie, Season } from '@src/@types/__movies__';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface ISeasonDetailsProps {
  data: Pick<IDetailAbstractMovie, 'seasons'>;
}

const SeasonDetails: React.FunctionComponent<ISeasonDetailsProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  //Handle Event
  const handleOnClickSeason = (item: Season) => {
    navigate(`watch?season=${item.season_number}&ep=1`);
  };

  return (
    <div className="pt-4 mx-4">
      {data.seasons && (
        <React.Fragment>
          <p className="text-xl text-white/80 inline-block">Current Seasons</p>
          <ul className="py-4 flex flex-col max-h-[500px] overflow-auto">
            {data.seasons.map((item) => (
              <li key={item.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleOnClickSeason(item);
                  }}
                  className="cursor-pointer my-4 flex up-mobile:flex-row flex-col up-mobile:items-start items-center up-mobile:py-4 up-mobile:px-4 border-white/50"
                >
                  <div className="w-[185px] shrink-0 rounded-lg overflow-hidden">
                    <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} alt={item.name} />
                  </div>
                  <div className="py-4 px-4 flex flex-col shrink up-mobile:text-start text-center">
                    <span className="text-white/80 text-xl">{item.name}</span>
                    <span className="text-white/50">
                      <span className="pr-2">{item.air_date.toString()}</span>
                      <span className="pl-2 border-l-[1px] border-white/50">{item.episode_count} Episode</span>
                    </span>
                    <div className="pt-4">
                      <p className="text-white/80">{item.overview ? item.overview : 'No overview'}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default SeasonDetails;
