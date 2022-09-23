import { IGenre } from '@src/@types/__movies__';
import ListItem from '@src/components/ListItem';
import useReadParams from '@src/hooks/useReadParams';
import { GenreContext } from '@src/services/context/GenresProvider';
import React, { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

interface IFilterByGenreProps {
  type: string;
}

const FilterByGenre: React.FunctionComponent<IFilterByGenreProps> = (props) => {
  const { type } = props;
  const [isOpenfilterGenres, setOpenfilterGenres] = useState(false);
  const [ReadParams] = useReadParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClickGenre = (genre: IGenre) => {
    const listGenres = searchParams.getAll('genre');
    if (listGenres.includes(genre.id.toString())) {
      const tempArr = listGenres.filter((genre_id) => genre_id !== genre.id.toString());
      setSearchParams({
        ...ReadParams,
        genre: tempArr,
      });
    } else {
      listGenres.push(genre.id.toString());
      setSearchParams({
        ...ReadParams,
        genre: listGenres,
      });
    }
  };

  return (
    <>
      <div
        className="flex justify-between"
        onClick={() => {
          setOpenfilterGenres(!isOpenfilterGenres);
        }}
      >
        <p className="text-xl py-2 text-white/80">Genres Filter</p>
        <span>
          <MdNavigateNext
            color="white"
            className={`${
              isOpenfilterGenres ? 'rotate-90' : 'rotate-0'
            } h-full w-full transition-transform duration-[200ms]`}
          />
        </span>
      </div>
      {isOpenfilterGenres && (
        <>
          <GenreContext.Consumer>
            {(val) => {
              return (
                <ListItem
                  items={val[type]}
                  className="flex flex-wrap"
                  renderItem={(item) => {
                    return (
                      <li
                        onClick={() => {
                          handleOnClickGenre(item);
                        }}
                        key={item.id}
                        className={`${
                          ReadParams['genre'].includes(item.id.toString())
                            ? 'bg-dark-smooth-primary/80'
                            : 'bg-dark-smooth-button-default'
                        } py-2 px-2 mx-2 my-2 ring-2 ring-black rounded-full transition-all duration-150`}
                      >
                        {item.name}
                      </li>
                    );
                  }}
                />
              );
            }}
          </GenreContext.Consumer>
        </>
      )}
    </>
  );
};

export default FilterByGenre;
