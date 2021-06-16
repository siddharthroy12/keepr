import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { authenticate, logout } from '../Actions/loginActions'
import { useSelector, useDispatch } from 'react-redux'

import './LoggerScreen.css'

export default function LoggerScreen() {
	const userInfoFromStorage = localStorage.getItem('loginInfo')
	const login = useSelector(state => state.login)
	const dispatch = useDispatch()
	const history = useHistory()
	const [error, setError] = useState(null)

	useEffect(() => {
		if (userInfoFromStorage) {
			dispatch(authenticate())
		}
	}, [dispatch, userInfoFromStorage])

	const retry = () => {
		dispatch(authenticate())
	}

	useEffect(() => {
		if (login.loggedIn) {
			history.push('/')
		}

		if (login.error) {
			let error = login.error
			if (error.response) {
				// Request made and server responded (Failed to authenticate)
				dispatch(logout())
				history.push('/login')
			  } else if (error.request) {
				// The request was made but no response was received (Slow Internet)
				setError('Connection Failure')
			  } else {
				setError('Unknown Error')
			  }
		} else {
			setError(null)
		}
	}, [login, history, dispatch])

	return userInfoFromStorage === null ? <Redirect to='/login'/> : (
		<div className="container" id="logger">
			{error !== null ? (
				<>
					<div className="message error">{error}</div>
					<button className="btn-primary" style={{marginTop: '2rem'}} onClick={retry}>
						Retry
					</button>
				</>
			) : (
				<div className="message">
					Loading
				</div>
			)}
			
		</div>
	)
}
