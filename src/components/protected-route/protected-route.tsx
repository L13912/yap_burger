import {Route, Redirect} from 'react-router-dom';
import React, {FC, useEffect} from 'react';
import {TProtectedRoute} from "../../types/data-types";
import {getUser} from "../../services/actions/user-actions";
import {useDispatch, useSelector} from '../../utils/hooks';

const ProtectedRoute:FC<TProtectedRoute> = ({children, ...rest}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser())
    }, [])
    const user = useSelector(store => store.userReducer.user)
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
