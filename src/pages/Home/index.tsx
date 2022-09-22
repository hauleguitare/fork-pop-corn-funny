import BannerSlider from '@src/components/Slider/BannerSection';
import ContentSlider from '@src/components/Slider/ContentSection';
import React, { Fragment } from 'react';
import BannerSection from './components/Banner';
import ContentSection from './components/Content';
import { AIRINGTODAY_SECTION, POPULAR_SECTION, TOPRATED_SECTION, UPCOMING_SECTION } from '@src/constants/';

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <Fragment>
      <BannerSection />
      <ContentSection sectionType={POPULAR_SECTION} className="mt-16 bg-dark-smooth-surface/30 container" />
      <ContentSection sectionType={TOPRATED_SECTION} className="mt-16 bg-dark-smooth-surface/30 container" />
      <ContentSection sectionType={AIRINGTODAY_SECTION} className="mt-16 bg-dark-smooth-surface/30 container" />
      <ContentSection sectionType={UPCOMING_SECTION} className="mt-16 bg-dark-smooth-surface/30 container" />
    </Fragment>
  );
};

export default HomePage;
