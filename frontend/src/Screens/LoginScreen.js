import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { login } from '../Actions/loginActions'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router';
import queryString from 'query-string'

import './LoginScreen.css'

export default function LoginScreen() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const loginState = useSelector(state => state.login)
	const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
		if (loginState.error) {
			if (loginState.error.response) {
				setError(loginState.error.response.data.message)
			} else if (loginState.error.request) {
				setError('Slow Network, Failed to login')
			} else {
				setError('Unknown Error, Failed to login')
			}
		} else {
			setError(null)
		}

		if (loginState.loggedIn) {
			history.push(queryString.parse(location.search).redirect)
		}
	}, [loginState, location.search, history])

	const onSumbit = (e) => {
		e.preventDefault()
		
		setUsername(username.trim())
		setPassword(password.trim())


		if (username < 1 || username > 20) {
			setError('Username must be 1-20 characters')
			return
		} else if (/\W/.test(username)) {
			setError("Username can only have numbers and letters")
			return
		}

		if (password < 4) {
			setError('Password is too short')
			return
		} else if (/\W/.test(username)) {
			setError('Password can only have numbers and letters')
			return
		}

		dispatch(login(username, password))
	}

	return (
		<div id="login-screen">
			<div className="container" style={{marginTop: '5rem'}}>
				<div className="login-form-box">
					<div className="login-form-top">
						<h1 className="login-form-header">Sign In</h1>
						<p className="login-form-hint">Use your Keepr account</p>
					</div>
					{error && (
						<div className="message error">{error}</div>
					)}
					<form onSubmit={onSumbit}>
						<label htmlFor="username">Username</label>
						<input 
							type="text" 
							name="username" 
							placeholder="Username" 
							required
							value={username}
							onChange={(e) => setUsername(e.target.value.trim())}
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							autoComplete="on"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value.trim())}
						/>
						<div className="login-form-buttons">
							<a href="#" className="btn-secondary">Create Account</a>
							<button className="btn-primary" type="submit">Next</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
