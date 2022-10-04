import { IDetailAbstractMovie } from '@src/@types/__movies__';
import * as React from 'react';
import SeasonDetails from './SeasonsDetail';

interface ITabContentProps {
  tabName: string;
  data: IDetailAbstractMovie;
}

const TabContent: React.FunctionComponent<ITabContentProps> = (props) => {
  const { tabName, data } = props;
  return (
    <div className="pt-4">
      {tabName === 'overview' && (
        <div className="px-4">
          <p className="text-xl text-white/80 inline-block">Overview</p>
          <p className="text-base text-white/80 pt-4 px-4">{data.overview}</p>
        </div>
      )}
      {tabName === 'seasons' && <SeasonDetails data={data} />}
    </div>
  );
};

export default TabContent;
