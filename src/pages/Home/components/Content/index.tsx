import { IContentSection, ListResponse } from '@src/@types/__global__';
import { IAbstractMovie } from '@src/@types/__movies__';
import { fetchMovies } from '@src/api';
import ContentSlider from '@src/components/Slider/ContentSection';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface IContentSectionProps {
  sectionType: IContentSection;
  title: string;
}

const ContentSection: React.FunctionComponent<IContentSectionProps> = (props) => {
  const { sectionType, title } = props;
  const [type, setType] = useState(sectionType.type[0]);
  const [category, setCategory] = useState(sectionType);
  const endpoint = `${category.id}`;
  const { data, isLoading, error } = useQuery<ListResponse<IAbstractMovie>, Error>(
    [`section-query${type.id}`, `${category.id}`],
    () => {
      return fetchMovies<IAbstractMovie>(type.id, endpoint);
    }
  );
  return (
    <section className="my-16 bg-dark-smooth-surface/30 container shadow-lg">
      <h3 className="up-mobile:pl-0 pl-4 pt-2 inline-block text-xl text-dark-smooth-text-default/80 font-oswald pb-4 capitalize">
        {title}
      </h3>
      {data && <ContentSlider data={data.results} type={type} />}
    </section>
  );
};

export default ContentSection;
