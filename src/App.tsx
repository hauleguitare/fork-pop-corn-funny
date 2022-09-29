import { useEffect, useState } from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ClientRoutes from './pages/routes';
import { useAuth } from './services/context/Auth';
import GenresProvider from './services/context/Genres';

function App() {
  const auth = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('access_token') ? true : false);
  useEffect(() => {
    setLoggedIn(localStorage.getItem('access_token') ? true : false);
  }, [auth]);
  return (
    // <UserDataProvider>
    <GenresProvider>
      <div className="App bg-dark-smooth-theme">
        <Header />
        <ClientRoutes isLoggedIn={isLoggedIn} />
        <Footer />
      </div>
    </GenresProvider>
    // </UserDataProvider>
  );
}

export default App;
