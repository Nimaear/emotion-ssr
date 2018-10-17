//@flow
import React from 'react';
import { hydrate } from 'react-dom';
import { configureStore } from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import theme from 'styles/theme';
import { ThemeProvider } from 'emotion-theming';

import App from './components/App';

const initialData = window.__INITIAL_DATA__ ? window.__INITIAL_DATA__ : {};

const { store } = configureStore({
  initialState: initialData.state,
  middleware: [],
});

const renderApp = (Application) =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Application />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV === 'development' && module.hot) {
  if (module.hot) {
    module.hot.accept();
  }
}

renderApp(App);
