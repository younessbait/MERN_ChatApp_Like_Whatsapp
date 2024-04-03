import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AppRoute = ({component: Component, can = () => true, redirect, ...rest}) => {
    return (
        <Route {...rest} render = {(props) => (
            can() ? <Component {...props} /> : <Redirect to={redirect} />
        )} />
    )
};

export default AppRoute;