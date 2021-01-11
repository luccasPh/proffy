import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '../pages/Forgot';
import Reset from '../pages/Reset';
import Concluded from '../pages/Concluded';
import Home from '../pages/Home';
import RegisterClass from '../pages/RegisterClass';
import Profile from '../pages/Profile';
import SearchClass from '../pages/SearchClass';
import Activation from '../pages/Activation';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot" component={Forgot} />
    <Route path="/reset" component={Reset} />
    <Route path="/activation" component={Activation} />

    <Route path="/" exact component={Home} isPublic />
    <Route path="/concluded" component={Concluded} isPublic />
    <Route path="/class/search" component={SearchClass} isPublic />

    <Route path="/class/register" component={RegisterClass} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
