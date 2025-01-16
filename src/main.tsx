import './styles/globals.scss';
import './styles/tailwind.css';
import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <>
    <App />
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          right: '10px',
        },
      }}
    />
  </>,
);
