import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ViewProvider } from './context/ViewContext';
import { FilterProvider } from './context/FilterContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterProvider>
      <ViewProvider>
        <App />
      </ViewProvider>
    </FilterProvider>
  </StrictMode>
);