import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './services/Store';
import AuthProvider from './services/context/Auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'tw-elements';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </React.StrictMode>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </QueryClientProvider>
);
