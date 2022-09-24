import { Route, Routes } from 'react-router';
import DiscoverPage from './Discover';
import HomePage from './Home';
import LoginPage from './Login';
import NotFoundPage from './NotFound';
import RegisterPage from './Register';
import SearchPage from './Search';

interface IClientRoutesProps {}
const ClientRoutes: React.FunctionComponent<IClientRoutesProps> = (props) => {
  return (
    <Routes>
      {/* This is routes for HomePage */}
      <Route path="/" element={<HomePage />} />
      {/* This is routes for SearchPage */}
      <Route path="/search" element={<SearchPage />} />

      {/* This is routes for DiscoverPage */}
      <Route path="/movie" element={<DiscoverPage type="movie" />}>
        <Route path="movie/:movie_id" element={<div>DETAIL MOVIE</div>} />
      </Route>

      <Route path="/tv" element={<DiscoverPage type="tv" />}>
        <Route path="tv/:movie_id" element={<div>DETAIL TV</div>} />
      </Route>

      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

      {/* This is routes for NotFoundPage */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ClientRoutes;
