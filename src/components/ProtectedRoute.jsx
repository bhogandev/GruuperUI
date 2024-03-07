import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../middleware/Auth';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route {...rest} render={
            props => {
                {/* Here is where authentication check will go. If (auth) pass component else pass redirect*/ }
                if (!isAuthenticated) {
                    return <Redirect exact to="/"/>
                } else {
                    return <Component {...props} />;
                }
            }
        }
        />
        )
}

export default ProtectedRoute;