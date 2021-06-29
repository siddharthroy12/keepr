import { Route, Redirect } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import Header from './Header'
import SideBar from './SideBar'

const PrivateRoute = ({component: Component, ...rest}) => {
	const login = useSelector(state => state.login)
	const sideBar = useSelector(state => state.sideBar)
	const location = useLocation()

	const redirect = encodeURIComponent(location.pathname + location.search)

  return (
      <Route {...rest} render={props => {
		return login.loggedIn ?
		(
			<div className={sideBar.expand ? 'body-sidebar-expand' : 'body'} style={{marginTop: '4rem'}}>
				<Header />
				<SideBar />
				<Component {...props} />
			</div>
		)
	: <Redirect to={`/logger?redirect=${redirect}`} /> 
	}} />
  );
};

export default PrivateRoute;