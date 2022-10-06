import { IDetailAbstractMovie } from '@src/@types/__movies__';
import { IExternal } from '@src/@types/__movies__/append_to_response';
import * as React from 'react';
import { AppendToResponse } from '../QueryMovies';
import './buttonActive.css';
import FactSidebar from './Aside/FactSidebar';
import SocialMedia from './Aside/SocialMedia';
import TabContent from './TabContent';

interface IContentSectionProps {
  data: IDetailAbstractMovie & AppendToResponse;
  type: string;
}

const ContentSection: React.FunctionComponent<IContentSectionProps> = (props) => {
  const { data, type } = props;
  const [tabDetail, setTabDetail] = React.useState('btn_tab_overview');

  const handleOnClickSwitchTab = (e: React.MouseEvent) => {
    setTabDetail(e.currentTarget.id);
  };

  return (
    <div className="relative container">
      <div className="absolute top-0 -translate-y-1/2 py-2 w-full flex justify-center">
        <div className="up-mobile:px-4 py-4 bg-dark-smooth-on-surface rounded-lg shadow-lg">
          <div className="overflow-hidden rounded-full shadow-xl">
            <button
              id="btn_tab_overview"
              onClick={handleOnClickSwitchTab}
              className={`${
                tabDetail === 'btn_tab_overview' ? 'tw-button-active' : 'tw-button-non-active'
              } transition-colors duration-150 ease-in`}
            >
              Overview
            </button>
            <button
              id="btn_tab_seriesCast"
              onClick={handleOnClickSwitchTab}
              className={`${
                tabDetail === 'btn_tab_seriesCast' ? 'tw-button-active' : 'tw-button-non-active'
              } transition-colors duration-150 ease-in`}
            >
              Series Cast
            </button>
            <button
              id="btn_tab_comments"
              onClick={handleOnClickSwitchTab}
              className={`${
                tabDetail === 'btn_tab_comments' ? 'tw-button-active' : 'tw-button-non-active'
              } transition-colors duration-150 ease-in`}
            >
              Comments
            </button>
            {type === 'tv' && (
              <button
                id="btn_tab_seasons"
                onClick={handleOnClickSwitchTab}
                className={`${
                  tabDetail === 'btn_tab_seasons' ? 'tw-button-active' : 'tw-button-non-active'
                } transition-colors duration-150 ease-in`}
              >
                Seasons
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="pt-16">
        <div className="flex up-mobile:flex-row flex-col justify-between bg-dark-smooth-surface font-roboto up-mobile:px-0 rounded-lg">
          <TabContent
            tabName={tabDetail.replace('btn_tab_', '').toLowerCase()}
            data={data}
            type={type}
            className="py-4 px-4 max-w-[1306px] grow up-mobile:w-[calc(100vw_-_230px-_32px)]"
          />
          <aside className="w-[230px] px-4 up-mobile:px-0 text-white pt-4 grow-0">
            <SocialMedia data={data} urlHomePage={data.homepage} />
            <FactSidebar data={data} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
