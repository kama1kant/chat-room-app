import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { isSignIn } from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    return (
        <Route
            {...rest}
            render={props =>
                isSignIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute