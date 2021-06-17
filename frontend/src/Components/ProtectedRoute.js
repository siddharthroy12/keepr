import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = ({component: Component, ...rest}) => {
	const login = useSelector(state => state.login)
    return (
        <Route {...rest} render={props => {
			return (!login.loggedIn) ?
			<Component {...props} />
		: <Redirect to="/" /> 
		}} />
    );
};

export default ProtectedRoute;