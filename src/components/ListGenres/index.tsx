import { IGenre } from '@src/@types/__movies__';
import { IGenresContext } from '@src/services/context/Genres';
import React, { useEffect, useState } from 'react';

interface IListGenresProps {
  genreCtx: IGenresContext;
  type: string;
  genres_id: number[];
  className?: string;
}

const ListGenres: React.FunctionComponent<IListGenresProps> = (props) => {
  const { genres_id, genreCtx, type, className } = props;

  const [listGenres, setListGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const filterGenres = genreCtx[type].filter((val) => {
      return genres_id.includes(Number(val.id));
    });

    setListGenres(filterGenres);
  }, [genres_id]);

  return (
    <ul className={className}>
      {listGenres.map((item) => (
        <li
          className="px-1 py-2 font-oswald bg-gradient-to-bl shadow-[#212020] shadow-lg to-dark-smooth-secondary/60 from-dark-smooth-brand text-dark-smooth-text-secondary rounded-xl"
          key={item.id}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

ListGenres.defaultProps = {
  className: '',
};

export default ListGenres;
