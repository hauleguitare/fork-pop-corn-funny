import { IDetailAbstractMovie } from '@src/@types/__movies__';
import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IFactSidebarProps {
  data: IDetailAbstractMovie;
}

const FactSidebar: React.FunctionComponent<IFactSidebarProps> = (props) => {
  const { data } = props;
  const formatCurrency = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <div>
      <span className="flex flex-col py-4">
        <strong className="text-lg text-white/80">Status</strong>
        <p>{data.status}</p>
      </span>
      <span className="flex flex-col py-4">
        <strong className="text-lg text-white/80">Budget</strong>
        <p>{formatCurrency.format(data.budget ?? 0)}</p>
      </span>
      <span className="flex flex-col py-4">
        <strong className="text-lg text-white/80">Language</strong>
        {data.spoken_languages.map((lang) => (
          <p key={lang.iso_639_1}>{lang.english_name}</p>
        ))}
      </span>
      {data.networks && (
        <span className="flex flex-col py-4">
          <strong className="text-lg text-white">Networks</strong>
          <div className="bg-white py-2 px-2 max-w-[100px]">
            {data.networks.map((network) => (
              <React.Fragment key={network.id}>
                {network.logo_path && <LazyLoadImage src={`https://image.tmdb.org/t/p/w92${network.logo_path}`} />}
              </React.Fragment>
            ))}
          </div>
        </span>
      )}
      <span className="flex flex-col py-4">
        <strong className="text-lg text-white">Production companies</strong>
        <ul className="pt-4">
          {data.production_companies.map((company) => (
            <li key={company.id}>
              <span className="text-base text-white/80">{company.name}</span>

              {company.logo_path && (
                <div className="bg-white py-2 px-2 mb-4 max-w-max">
                  <LazyLoadImage src={`https://image.tmdb.org/t/p/w45${company.logo_path}`} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default FactSidebar;

/*


*/
