import { IDetailAbstractMovie } from '@src/@types/__movies__';
import * as React from 'react';
import { AppendToResponse } from '../../QueryMovies';
import MediaSection from './Overview/MediaSection';
import SeasonDetails from './Seasons/SeasonsDetail';
import SimilarSection from './Overview/SimilarSection';

import VideoSection from './Overview/VideoSection';
import SeriesCastDetails from './SeriesCast';

interface ITabContentProps {
  tabName: string;
  data: IDetailAbstractMovie & AppendToResponse;
  className?: string;
  type: string;
}

const TabContent: React.FunctionComponent<ITabContentProps> = (props) => {
  const { tabName, data, className, type } = props;
  return (
    <div className={className}>
      {tabName === 'overview' && (
        <React.Fragment>
          <section className="px-4">
            <p className="text-xl text-white/80 inline-block">Overview</p>
            <p className="text-base text-white/80 pt-4 px-4">{data.overview}</p>
          </section>
          <VideoSection data={data} />
          <MediaSection data={data} />
          <SimilarSection data={data} type={type} />
        </React.Fragment>
      )}
      {tabName === 'seasons' && <SeasonDetails data={data} />}
      {tabName === 'seriescast' && <SeriesCastDetails data={data} />}
    </div>
  );
};

export default TabContent;
