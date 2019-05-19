import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Commits from '../pages/Commits'; // eslint-disable-line import/no-named-as-default
import RepositoryCommits from '../pages/RepositoryCommits'; // eslint-disable-line import/no-named-as-default
import NotFound from '../pages/NotFound';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/commits" exact component={Commits} />
      <Route path="/repository/:repo_name/commits" exact component={RepositoryCommits} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
