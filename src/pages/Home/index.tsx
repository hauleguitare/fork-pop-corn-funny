import ModalMovies from '@src/components/ModalMovies';
import MotionChangePage from '@src/components/MotionChangePage';
import {
  AIRINGTODAY_SECTION,
  ONTV_SECTION,
  POPULAR_SECTION,
  TOPRATED_SECTION,
  UPCOMING_SECTION,
} from '@src/constants/';
import React, { useEffect } from 'react';
import BannerSection from './components/Banner';
import ContentSection from './components/Content';

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  document.title = 'Home Page';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MotionChangePage>
      <BannerSection />
      <ContentSection sectionType={POPULAR_SECTION} title={`What's Popular`} />
      <ContentSection sectionType={TOPRATED_SECTION} title={`Let start with top rated`} />
      <ContentSection sectionType={UPCOMING_SECTION} title={`Are you missing Upcoming`} />
      <ContentSection sectionType={ONTV_SECTION} title={`On the Air`} />
      <ContentSection sectionType={AIRINGTODAY_SECTION} title={`Don't forget Aring Today`} />
      <ModalMovies />
    </MotionChangePage>
  );
};

export default HomePage;
