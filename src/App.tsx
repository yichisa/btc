import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import theme from './styles/theme';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
