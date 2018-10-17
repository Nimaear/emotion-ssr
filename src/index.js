//@flow
import React from 'react';
import { hydrate } from 'react-dom';
import theme from 'styles/theme';
import { ThemeProvider } from 'emotion-theming';

import App from './components/App';


const renderApp = (Application) =>
  hydrate(
    <Application />
    ,document.getElementById('root')
  );

if (process.env.NODE_ENV === 'development' && module.hot) {
  if (module.hot) {
    module.hot.accept();
  }
}

renderApp(App);
