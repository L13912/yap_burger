import {Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({children, ...rest}) {
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
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
