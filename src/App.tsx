import { useState } from 'react';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ClientRoutes from './pages/routes';
import AuthProvider from './services/context/Auth';
import GenresProvider from './services/context/Genres';
import UserDataProvider from './services/context/UserData';

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <GenresProvider>
          <div className="App bg-dark-smooth-theme">
            <Header />
            <ClientRoutes />
            <Footer />
          </div>
        </GenresProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
