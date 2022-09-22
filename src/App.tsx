import React, { useState } from 'react';
import './App.css';
import useCurrentViewPort from './hooks/useCurrentViewPort';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ClientRoutes from './pages/routes';

function App() {
  return (
    <div className="App bg-dark-smooth-theme">
      <Header />
      <ClientRoutes />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
