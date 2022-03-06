import React from 'react';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({ rest, component:Component }) => {
    return <Route {...rest} component={(props) => {
        const token = localStorage.getItem('token');
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={`/signin`} />
        }
    }} />
}