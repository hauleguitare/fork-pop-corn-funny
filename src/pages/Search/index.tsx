import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ICallBackStatusProps } from '@src/@types/__global__';
import ExplorerSeach from '@src/asserts/svg/explorer_search.svg';
import { SELECT_TYPE } from '@src/constants/seach-page';
import { motion } from 'framer-motion';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useLocation, useSearchParams } from 'react-router-dom';
import QueryResults from './components/QueryResults';
interface ISearchPageProps {}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [type, setType] = useState(searchParams.get('type') || 'multi');
  const [searchInput, setSearchInput] = useState(decodeURIComponent(searchParams.get('query') || ''));
  const [submitQuery, setSubmitQuery] = useState(searchParams.get('query') || '');

  const [parentRef] = useAutoAnimate<HTMLDivElement>({
    easing: 'ease-out',
    duration: 350,
  });

  useEffect(() => {
    setSubmitQuery(searchParams.get('query') || '');
  }, [location.search]);

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({
      type: type,
      query: encodeURIComponent(searchInput),
    });
  };

  return (
    <main ref={parentRef} className="container mt-4 max-w-[1280px] px-4 up-mobile:px-0  min-h-[500px]">
      {searchParams.get('query') === null && (
        <motion.div
          initial={{
            opacity: 0,
            y: '-100%',
          }}
          animate={{
            opacity: 1,
            y: '0',
          }}
          transition={{
            duration: 0.75,
          }}
          className="flex justify-center flex-col"
        >
          <p className="font-merriweather text-2xl up-mobile:text-4xl py-4 bg-gradient-to-bl to-dark-smooth-primary/40 via-dark-smooth-primary/75 from-dark-smooth-primary text-center text-dark-smooth-text-primary rounded-lg">
            Welcome to Search Page, enjoy the movies you excited. Cheer!
          </p>
          <img src={ExplorerSeach} alt="" className="mt-16 mb-4" />
        </motion.div>
      )}
      <div className="flex justify-center">
        <form
          onSubmit={handleOnSubmit}
          className="text-white h-14 relative bg-stone-chocolate flex items-center rounded-xl overflow-hidden w-full"
        >
          <button
            onSubmit={handleOnSubmit}
            className="absolute top-0 h-full px-2 bg-stone-light-chocolate text-white/50 z-0"
          >
            Search
          </button>
          <input
            onChange={handleOnChangeInput}
            value={decodeURIComponent(searchInput)}
            type={'text'}
            className="pl-20 pr-4 text-xl w-full outline-none bg-transparent"
          />
        </form>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-row justify-between gap-4 mt-2">
          {SELECT_TYPE.map((item) => (
            <button
              onClick={() => setType(item.id.toString())}
              key={item.id}
              className={`${
                item.id === type ? 'bg-stone-300' : 'bg-stone-600'
              } px-2 py-2 rounded-lg hover:bg-stone-400 transition-colors duration-150`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {submitQuery && <QueryResults type={type} params={{ query: decodeURIComponent(submitQuery) }} />}
    </main>
  );
};

export default SearchPage;
