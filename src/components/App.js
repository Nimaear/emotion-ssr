//@flow
import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from 'styles/theme';
import Card from 'components/Card';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
      </Card>
    </ThemeProvider>
  );
};

export default App;
