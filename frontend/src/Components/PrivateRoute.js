import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Header from './Header';

const PrivateRoute = ({component: Component, ...rest}) => {
	const login = useSelector(state => state.login)
    return (
        <Route {...rest} render={props => {
			return login.loggedIn ?
			(
				<>
					<Header />
					<Component {...props} />
				</>
			)
		: <Redirect to="/logger" /> 
		}} />
    );
};

export default PrivateRoute;