import {Route, Redirect} from 'react-router-dom';
import React, {FC} from 'react';
import {TProtectedRoute} from "../../types/data-types";
import {useSelector} from '../../utils/hooks';
import {PUBLIC_URL} from "../../constants";

const pUrl = PUBLIC_URL;

const ProtectedRoute:FC<TProtectedRoute> = ({children, ...rest}) => {
    const user = useSelector(store => store.userReducer.user)
    return (
        <Route
            {...rest}
            render={({location}) =>
                user.email !== '' ? (
                    children
                ) : (
                    <Redirect to={{pathname: `${pUrl}/login`, state: {from: location}}}/>
                )
            }
        />
    );
};

export default ProtectedRoute;
