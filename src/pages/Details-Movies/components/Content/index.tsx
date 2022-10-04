import { IDetailAbstractMovie } from '@src/@types/__movies__';
import { IExternal } from '@src/@types/__movies__/append_to_response';
import * as React from 'react';
import './buttonActive.css';
import FactSidebar from './FactSidebar';
import SocialMedia from './SocialMedia';
import TabContent from './TabContent';

interface IContentSectionProps {
  data: IDetailAbstractMovie;
  type: string;
  socialMedia: Pick<IExternal, 'external_ids'>;
}

const ContentSection: React.FunctionComponent<IContentSectionProps> = (props) => {
  const { data, socialMedia, type } = props;
  const [tabDetail, setTabDetail] = React.useState('btn_tab_overview');

  const handleOnClickSwitchTab = (e: React.MouseEvent) => {
    setTabDetail(e.currentTarget.id);
  };

  return (
    <div className="relative">
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
              id="bt_tab_comments"
              onClick={handleOnClickSwitchTab}
              className={`${
                tabDetail === 'bt_tab_comments' ? 'tw-button-active' : 'tw-button-non-active'
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
        <div className="flex up-mobile:flex-row flex-col container justify-between bg-dark-smooth-surface font-roboto up-mobile:px-0 rounded-lg">
          <TabContent tabName={tabDetail.replace('btn_tab_', '').toLowerCase()} data={data} />
          <div className="up-mobile:min-w-[200px] text-white pt-4">
            <SocialMedia data={socialMedia} urlHomePage={data.homepage} />
            <FactSidebar data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
