import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BannerProvider } from './Context/BannerProvider';
import { AuthProvider } from './Context/AuthProvider'
import { OpenningProvider } from './Context/OpeningProvider';
import { AppliedApplicationProvider } from './Context/AppliedApplicationProvider';
import { ThemeProvider } from './Context/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider >
      <AuthProvider>
        <OpenningProvider>
          <BannerProvider>
            <AppliedApplicationProvider>
              <App />
            </AppliedApplicationProvider>
          </BannerProvider>
        </OpenningProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);