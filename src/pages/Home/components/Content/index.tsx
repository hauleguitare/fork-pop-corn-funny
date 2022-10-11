import { IContentSection, ListResponse } from '@src/@types/__global__';
import { IAbstractMovie } from '@src/@types/__movies__';
import { fetchMovies } from '@src/api';
import ContentSlider from '@src/components/Slider/ContentSection';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ContentLoading from './Loading';

interface IContentSectionProps {
  sectionType: IContentSection;
  title: string;
}

const ContentSection: React.FunctionComponent<IContentSectionProps> = (props) => {
  const { sectionType, title } = props;
  const endpoint = `${sectionType.id}`;
  const { data, isLoading, error } = useQuery<ListResponse<IAbstractMovie>, Error>(
    [`section-query${sectionType.type[0].id}`, `${sectionType.id}`],
    () => {
      return fetchMovies<IAbstractMovie>(sectionType.type[0].id, endpoint);
    }
  );

  if (isLoading) {
    <div className="my-16 bg-dark-smooth-surface/30 container shadow-md rounded-lg">
      <ContentLoading isLoading={isLoading} />;
    </div>;
  }

  return (
    <section className="my-16 bg-dark-smooth-surface/30 container shadow-md rounded-lg">
      <h3 className="up-mobile:pl-0 pl-4 pt-2 inline-block text-xl text-dark-smooth-text-default/80 font-oswald pb-4 capitalize">
        {title}
      </h3>
      {data ? <ContentSlider data={data.results} type={sectionType.type[0]} /> : <ContentLoading isLoading={true} />}
    </section>
  );
};

export default ContentSection;
