import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import './css/App.css';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import ConfirmEmail from './pages/ConfirmEmail';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import { store } from './app/store';
import Login from './pages/Login';

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/ConfirmEmail" component={ConfirmEmail}/>
        {/* Routes below should be authenticated routes only (involve some type of auth middleware)*/}
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/Messenger" component={Chat} />
        {/* Routes above should be authenticated routes only (involve some type of auth middleware)*/}
      </Switch>
    </Layout>
  );
}

export default App;
