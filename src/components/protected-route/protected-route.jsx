import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({ children, ...rest }) {
    const user = useSelector(store => store.userReducer.user);

    return (
        <Route
            {...rest}
            render={() =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to='/login'
                    />
                )
            }
        />
    );
}
ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
