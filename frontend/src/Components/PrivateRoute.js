import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './Header'
import SideBar from './SideBar'

const PrivateRoute = ({component: Component, ...rest}) => {
	const login = useSelector(state => state.login)
	const sideBar = useSelector(state => state.sideBar)

    return (
        <Route {...rest} render={props => {
			return login.loggedIn ?
			(
				<div style={{marginTop: '5rem', marginLeft: sideBar.expand ? '20rem' : '5rem'}}>
					<Header />
					<SideBar />
					<Component {...props} />
				</div>
			)
		: <Redirect to="/logger" /> 
		}} />
    );
};

export default PrivateRoute;