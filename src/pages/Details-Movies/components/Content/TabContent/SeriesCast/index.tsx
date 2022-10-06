import { ICredits } from '@src/@types/__movies__/append_to_response';
import * as React from 'react';

interface ISeriesCastDetailsProps {
  data: Pick<ICredits, 'credits'>;
}

const SeriesCastDetails: React.FunctionComponent<ISeriesCastDetailsProps> = (props) => {
  const { data } = props;
  return (
    <div className="pt-4 mx-4">
      <ul className="py-4 flex flex-col up-mobile:flex-row up-mobile:flex-wrap max-h-[500px] overflow-auto">
        {data.credits.cast.map((item) => (
          <li key={item.id} className="up-mobile:min-w-[490px]">
            <a className="cursor-pointer my-4 flex up-mobile:flex-row flex-col up-mobile:items-start items-center up-mobile:py-4 up-mobile:px-4 border-white/50">
              <div className="w-[185px] shrink-0 rounded-lg overflow-hidden">
                <img src={`https://image.tmdb.org/t/p/w185${item.profile_path}`} />
              </div>
              <div className="py-4 px-4 flex flex-col shrink up-mobile:text-start text-center">
                <span className="text-white/80 text-xl">{item.name}</span>
                <span className="text-white/50 flex flex-col">
                  <span className="px-2 border-white/50">
                    <span className="text-white/80">Gender: </span>
                    {item.gender === 1 ? 'Female' : 'Male'}
                  </span>
                  <span className="px-2">
                    <span className="text-white/80">Character: </span>
                    {item.character}
                  </span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeriesCastDetails;
