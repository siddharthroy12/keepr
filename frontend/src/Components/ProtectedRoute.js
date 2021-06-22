import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import queryString from 'query-string'

const ProtectedRoute = ({component: Component, ...rest}) => {
	const login = useSelector(state => state.login)
	const location = useLocation()
	const redirect = queryString.parse(location.search).redirect
	
    return (
        <Route {...rest} render={props => {
			return (!login.loggedIn) ?
			<Component {...props} />
		: <Redirect to={redirect} /> 
		}} />
    );
};

export default ProtectedRoute;