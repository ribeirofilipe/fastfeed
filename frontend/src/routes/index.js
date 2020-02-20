import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={() => <h1>404 NOT FOUND</h1>} />
    </Switch>
  );
}
