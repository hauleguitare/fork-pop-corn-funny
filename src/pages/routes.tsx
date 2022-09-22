import { Navigate, Route, Routes } from 'react-router';
import HomePage from './Home';

interface IClientRoutesProps {}
const ClientRoutes: React.FunctionComponent<IClientRoutesProps> = (props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<div>SEARCH PAGE</div>} />

        <Route path="/movie" element={<div>GENRES MOVIE</div>}>
          <Route path="movie/:movie_id" element={<div>DETAIL MOVIE</div>} />
        </Route>

        <Route path="/tv" element={<div>GENRES TV</div>}>
          <Route path="tv/:movie_id" element={<div>DETAIL TV</div>} />
        </Route>

        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </div>
  );
};

export default ClientRoutes;
