import { Route, Routes } from 'react-router';
import DiscoverPage from './Discover';
import HomePage from './Home';
import NotFoundPage from './NotFound';
import SearchPage from './Search';

interface IClientRoutesProps {}
const ClientRoutes: React.FunctionComponent<IClientRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie" element={<DiscoverPage type="movie" />}>
        <Route path="movie/:movie_id" element={<div>DETAIL MOVIE</div>} />
      </Route>

      <Route path="/tv" element={<DiscoverPage type="tv" />}>
        <Route path="tv/:movie_id" element={<div>DETAIL TV</div>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ClientRoutes;
