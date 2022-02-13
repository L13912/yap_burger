import {Route, Redirect} from 'react-router-dom';
import React, {FC} from 'react';
import {TProtectedRoute} from "../../types/data-types";
import {useSelector} from '../../utils/hooks';

const ProtectedRoute:FC<TProtectedRoute> = ({children, ...rest}) => {
    const user = useSelector(store => store.userReducer.user)
    return (
        <Route
            {...rest}
            render={({location}) =>
                user.email !== '' ? (
                    children
                ) : (
                    <Redirect to={{pathname: "/login", state: {from: location}}}/>
                )
            }
        />
    );
};

export default ProtectedRoute;
