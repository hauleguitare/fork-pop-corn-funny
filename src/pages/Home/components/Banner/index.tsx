import { IBannerSection, ICategory, ListResponse } from '@src/@types/__global__';
import { ITrending } from '@src/@types/__movies__';
import { fetchMovies } from '@src/api';
import BannerSlider from '@src/components/Slider/BannerSection';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState } from 'react';

interface IBannerSectionProps {}

const BannerSection: React.FunctionComponent<IBannerSectionProps> = (props) => {
  const [type, setType] = useState('trending');
  const [category, setCategory] = useState<ICategory>({ id: 'all', name: 'all' });
  const [timeWindows, SetWindowTime] = useState('day');
  const endpoint = `${category.id}/${timeWindows}`;
  const { isLoading, data, error } = useQuery<ListResponse<ITrending>, Error>(
    [`section-query-${type}`, `${category.id}`],
    () => {
      return fetchMovies<ITrending>(type, endpoint);
    }
  );

  return (
    <section className="container max-w-[1280px] shadow-[#1c1b1b] hover:shadow-lg transition-shadow duration-75">
      {data && <BannerSlider data={data.results} />}
    </section>
  );
};

export default BannerSection;
