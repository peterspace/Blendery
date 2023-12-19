import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { wagmiClient } from './components/config/config';
import { WagmiConfig } from 'wagmi';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <App />
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
