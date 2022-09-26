import { useAutoAnimate } from '@formkit/auto-animate/react';
import AuthProtected from '@src/components/AuthProtected';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import DiscoverPage from './Discover';
import HomePage from './Home';
import LoginPage from './Login';
import NotFoundPage from './NotFound';
import RegisterPage from './Register';
import SearchPage from './Search';
import TestPage from './Test';

interface IClientRoutesProps {}
const ClientRoutes: React.FunctionComponent<IClientRoutesProps> = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('access_token') ? true : false);
  return (
    <AnimatePresence>
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

        <Route
          path="/login"
          element={
            <AuthProtected hasLogin={!isLoggedIn} redirectTo={'/'}>
              <LoginPage />
            </AuthProtected>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthProtected hasLogin={!isLoggedIn} redirectTo={'/'}>
              <RegisterPage />
            </AuthProtected>
          }
        />
        {/* <Route path="/signup" element={<RegisterPage />}></Route> */}

        {/* This is Private routes */}
        <Route
          path="/profile"
          element={
            <AuthProtected hasLogin={isLoggedIn} redirectTo={'/login'}>
              <div>THIS IS PROFILE</div>
            </AuthProtected>
          }
        ></Route>

        {/* This is test page */}
        <Route path="/test" element={<TestPage />}></Route>
        {/* This is test page */}

        {/* This is routes for NotFoundPage */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default ClientRoutes;
