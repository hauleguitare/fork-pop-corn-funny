import React, { useState } from 'react';
import './App.css';
import GenresProvider from './services/context/GenresProvider';
import useCurrentViewPort from './hooks/useCurrentViewPort';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ClientRoutes from './pages/routes';

function App() {
  return (
    <GenresProvider>
      <div className="App bg-dark-smooth-theme">
        <Header />
        <ClientRoutes />
        {/* <Footer /> */}
      </div>
    </GenresProvider>
  );
}

export default App;
