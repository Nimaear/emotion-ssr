//@flow
import * as React from 'react';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router';
import Settings from 'components/Settings';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'emotion-theming';
import theme from 'styles/theme';

library.add(faStroopwafel);

const Home = () => <div>Home</div>;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
};

export default compose(withRouter)(App);
