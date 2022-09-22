import { IGenre } from '@src/@types/__movies__';
import { fetchGenres } from '@src/api';
import React, { useEffect, useState } from 'react';

interface IGenresProviderProps {
  children?: React.ReactNode;
}

export interface IGenresContext {
  [key: string]: IGenre[];
}
export const GenreContext = React.createContext<IGenresContext>({});
const GenresProvider: React.FunctionComponent<IGenresProviderProps> = (props) => {
  const { children } = props;
  const [genres, setGenres] = useState<IGenresContext>({});

  useEffect(() => {
    const getGenres = async () => {
      const movie = await fetchGenres('movie');
      const tv = await fetchGenres('tv');
      // const all = [...movie.genres, ...tv.genres].filter((val, idx, arr) => {
      //   return arr.findIndex((v) => v.id === val.id && v.name === val.name) === idx;
      // });
      const all = [...movie.genres, ...tv.genres].filter((val, idx, arr) => {
        return arr.findIndex((v) => v.id === val.id && v.name === val.name) === idx;
      });
      const newState = {
        ...genres,
        movie: movie.genres,
        tv: tv.genres,
        all: all,
      };
      setGenres(newState);
    };
    getGenres();
  }, []);
  return <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>;
};

export default GenresProvider;
