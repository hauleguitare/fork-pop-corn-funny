import { ListResponse } from '@src/@types/__global__';
import { IAbstractMovie } from '@src/@types/__movies__';
import { fetchMovies } from '@src/api';
import Card from '@src/components/Card';
import { ConvertBeautifulURL } from '@src/utils/ConvertBeautifulURL';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MultiSkeleton from '@src/components/Skeleton/MultiSkeleton';

interface IRecommendSectionProps {
  movieId: number;
  type: string;
}

const RecommendSection: React.FunctionComponent<IRecommendSectionProps> = (props) => {
  const { movieId, type } = props;
  const endpoint = `/${movieId}/recommendations`;
  const { isLoading, isError, data, isFetching } = useQuery<ListResponse<IAbstractMovie>, Error>(
    [`query-recommendations-movies-${type}-${movieId}`],
    () => {
      return fetchMovies<IAbstractMovie>(type, endpoint);
    }
  );
  const [totalCount, setTotalCount] = React.useState(5);

  if (isLoading) {
    return (
      <section className="mt-4 px-4">
        <span className="text-white/80 text-xl">Recommendations</span>
        <div className="flex min-w-full up-mobile:flex-col flex-row up-mobile:overflow-hidden overflow-x-auto overflow-y-hidden pt-4">
          <MultiSkeleton
            total={6}
            widthCard={'185px'}
            heightCard={'280px'}
            className={'bg-dark-smooth-on-surface pt-4 up-mobile:mx-0 mx-4 my-4 min-w-[185px]'}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-4 px-4">
      <span className="text-white/80 text-xl">Recommendations</span>
      {data && (
        <ul className="flex up-mobile:flex-col flex-row overflow-x-auto overflow-y-hidden">
          <AnimatePresence>
            {data.results.slice(0, totalCount).map((item) => (
              <motion.li
                initial={{
                  opacity: 0,
                  y: '-100%',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: '-100%',
                }}
                transition={{
                  type: 'spring',
                  duration: 0.3,
                }}
                key={item.id}
                className="py-4 up-mobile:mx-0 mx-4 max-w-[calc(185px_+32px)]"
              >
                <Card
                  img={item.poster_path}
                  widthImageEndpoint="w185"
                  id={item.id}
                  url={`/${type}/${ConvertBeautifulURL(item.id, item.title ?? item.name ?? '')}`}
                  title={item.title ?? item.name ?? 'Unknown name'}
                  className="w-[185px]"
                />
              </motion.li>
            ))}
          </AnimatePresence>
          <li className="up-mobile:pb-4 up-mobile:pl-0 pl-4">
            <button
              onClick={() => {
                if (totalCount <= 20) {
                  setTotalCount(totalCount + 5);
                } else {
                  setTotalCount(5);
                }
              }}
              className={`py-2 px-2 rounded-full bg-dark-smooth-button-default w-full h-full up-mobile:h-max`}
            >
              {totalCount <= 20 ? 'See more' : 'Hide item'}
            </button>
          </li>
        </ul>
      )}
    </section>
  );
};

export default RecommendSection;
