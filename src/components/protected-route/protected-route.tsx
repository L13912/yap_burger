import {Route, Redirect} from 'react-router-dom';
import React, {FC} from 'react';
import {useSelector} from '../../utils/hooks';
import {TProtectedRoute} from "../../types/data-types";

const ProtectedRoute:FC<TProtectedRoute> = ({children, ...rest}) => {
    const user = useSelector(store => store.userReducer.user);

    return (
        <Route
            {...rest}
            render={({location}) =>
                user ? (
                    children
                ) : (
                    <Redirect to={{pathname: "/login", state: {from: location}}}/>
                )
            }
        />
    );
};

export default ProtectedRoute;
