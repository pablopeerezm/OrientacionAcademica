import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppContextProvider } from './components/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createTheme, ThemeProvider } from '@mui/material'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#01579b',
      light: '#e0f2f1'
    },
    secondary: {
      main: '#e0f2f1',
      light: '#c6ff00'
    },
    
  },
});
root.render(
  <QueryClientProvider client={queryClient}>

    <React.StrictMode>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <App/> 
        </ThemeProvider>  
      </AppContextProvider>
    
    </React.StrictMode>
    </QueryClientProvider >

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
