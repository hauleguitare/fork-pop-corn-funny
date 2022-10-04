import { IDetailAbstractMovie } from '@src/@types/__movies__';
import * as React from 'react';

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
      <span className="flex flex-col py-4"></span>
    </div>
  );
};

export default FactSidebar;
