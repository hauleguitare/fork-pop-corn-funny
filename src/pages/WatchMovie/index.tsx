import * as React from 'react';
import { useParams } from 'react-router-dom';
import MoviesSection from './components/MoviesSection';

interface IWatchMovieProps {
  type: string;
}

const WatchMovie: React.FunctionComponent<IWatchMovieProps> = (props) => {
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
  document.title = 'Watching';

  return (
    <div>
      <MoviesSection movieId={movieId} type={type} />
    </div>
  );
};

export default WatchMovie;
