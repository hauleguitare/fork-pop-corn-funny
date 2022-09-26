import MotionChangePage from '@src/components/MotionChangePage';
import ReviewMovie from '@src/components/ReviewMovie';
import {
  AIRINGTODAY_SECTION,
  ONTV_SECTION,
  POPULAR_SECTION,
  TOPRATED_SECTION,
  UPCOMING_SECTION,
} from '@src/constants/';
import React from 'react';
import BannerSection from './components/Banner';
import ContentSection from './components/Content';

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  document.title = 'Home Page';
  return (
    <MotionChangePage>
      <div>
        <BannerSection className="container max-w-[1280px] shadow-[#1c1b1b] hover:shadow-lg transition-shadow duration-75" />
        <ContentSection sectionType={POPULAR_SECTION} title={`What's Popular`} />
        <ContentSection sectionType={TOPRATED_SECTION} title={`Let start with top rated`} />
        <ContentSection sectionType={UPCOMING_SECTION} title={`Are you missing Upcoming`} />
        <ContentSection sectionType={ONTV_SECTION} title={`On the Air`} />
        <ContentSection sectionType={AIRINGTODAY_SECTION} title={`Don't forget Aring Today`} />
        {/* <ContentLoading
        isLoading={isLoading}
        className="flex flex-start cursor-progress overflow-hidden relative flex-nowrap my-16 bg-dark-smooth-surface/30 container shadow-md rounded-lg"
      /> */}

        <ReviewMovie />
      </div>
    </MotionChangePage>
  );
};

export default HomePage;
