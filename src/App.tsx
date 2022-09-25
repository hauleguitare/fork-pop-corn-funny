import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ClientRoutes from './pages/routes';
import GenresProvider from './services/context/GenresProvider';

function App() {
  return (
    <GenresProvider>
      <div className="App bg-dark-smooth-theme">
        <Header />
        <ClientRoutes />
        <Footer />
      </div>
    </GenresProvider>
  );
}

export default App;
