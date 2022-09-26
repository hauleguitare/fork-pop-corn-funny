import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ClientRoutes from './pages/routes';
import AuthProvider from './services/context/Auth';
import GenresProvider from './services/context/Genres';

function App() {
  return (
    <AuthProvider>
      <GenresProvider>
        <div className="App bg-dark-smooth-theme">
          <Header />
          <ClientRoutes />
          <Footer />
        </div>
      </GenresProvider>
    </AuthProvider>
  );
}

export default App;
