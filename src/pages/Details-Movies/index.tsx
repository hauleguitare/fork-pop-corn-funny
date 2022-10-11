import * as React from 'react';
import { useParams } from 'react-router-dom';
import QueryMovies from './components/QueryMovies';

interface IDetailMovieProps {
  type: string;
}

const DetailMovie: React.FunctionComponent<IDetailMovieProps> = (props) => {
  const { type } = props;
  const { title_movie } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!title_movie) {
    return null;
  }
  const arrTitle = title_movie.split('-');
  const movieId = Number(arrTitle[arrTitle.length - 1]);

  return (
    <div>
      <QueryMovies type={type} movieId={movieId} />
    </div>
  );
};

export default DetailMovie;
