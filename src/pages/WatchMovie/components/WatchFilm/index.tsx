import * as React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

interface IWatchFilmProps {
  movieId: number;
  type: string;
}

const WatchFilm: React.FunctionComponent<IWatchFilmProps> = (props) => {
  const { movieId, type } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = React.useState('');
  const location = useLocation();

  // Use Effect

  React.useEffect(() => {
    const season = Number(searchParams.get('season'));
    const ep = Number(searchParams.get('ep'));
    if (!season || !ep) {
      return;
    }
    const params = {
      s: season.toString(),
      e: ep.toString(),
    };
    const queryParams = new URLSearchParams(params).toString();
    setQueryParams(queryParams);
  }, [location.search]);

  return (
    <div className="flex justify-center min-w-full min-h-full">
      <div className="relative h-0 pb-[56.25%] max-w-[1280px] basis-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full  "
          src={`https://www.2embed.to/embed/tmdb/${type}?id=${movieId}${queryParams && `&${queryParams}`}`}
          frameBorder="0"
          allowFullScreen
          allowTransparency
          title="Film movies"
        ></iframe>
      </div>
    </div>
  );
};

export default WatchFilm;
