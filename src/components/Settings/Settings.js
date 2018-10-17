// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import Card from 'components/Card';

const Settings = () => {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
      </Card>
    </div>
  );
};

export default Settings;
