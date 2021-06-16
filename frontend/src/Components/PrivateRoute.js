import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
	const login = useSelector(state => state.login)
	console.log({ login })
    return (
        <Route {...rest} render={props => {
			return login.loggedIn ?
			<Component {...props} />
		: <Redirect to="/logger" /> 
		}} />
    );
};

export default PrivateRoute;