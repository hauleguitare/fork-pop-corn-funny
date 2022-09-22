import { IContentSection, ListResponse } from '@src/@types/__global__';
import { IAbstractMovie } from '@src/@types/__movies__';
import { fetchMovies } from '@src/api';
import ContentSlider from '@src/components/Slider/ContentSection';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface IContentSectionProps {
  sectionType: IContentSection;
  className?: string;
}

const ContentSection: React.FunctionComponent<IContentSectionProps> = (props) => {
  const { sectionType, className } = props;
  const [type, setType] = useState(sectionType.type[0]);
  const [category, setCategory] = useState(sectionType);
  const endpoint = `${category.id}`;
  const { data, isLoading, error } = useQuery<ListResponse<IAbstractMovie>, Error>(
    [`section-query${type.id}`, `${category.id}`],
    () => {
      return fetchMovies<IAbstractMovie>(type.id, endpoint);
    }
  );
  return <section className={className}>{data && <ContentSlider data={data.results} />}</section>;
};

ContentSection.defaultProps = {
  className: '',
};

export default ContentSection;
